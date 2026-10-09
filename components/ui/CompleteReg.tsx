"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "./dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "./field";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Loader2,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { completeCompanyReg } from "@/src/actions/complete-companyReg";

const CITIZENSHIP = "NG";

type Role = "director" | "shareholder";

interface RoleConfig {
  listKey: "directors" | "shareholders"; // saved people (the summary cards)
  draftKey: "directorDraft" | "shareholderDraft"; // the form being typed
  label: string;
}

const ROLE_CONFIG: Record<Role, RoleConfig> = {
  director: {
    listKey: "directors",
    draftKey: "directorDraft",
    label: "Director",
  },
  shareholder: {
    listKey: "shareholders",
    draftKey: "shareholderDraft",
    label: "Shareholder",
  },
};

// Order of this array IS the order of the wizard.
const STEPS = [
  "company",
  "director-details",
  "director-address",
  "witness-details",
  "witness-address",
  "shareholder-details",
  "shareholder-address",
  "summary",
] as const;
type StepId = (typeof STEPS)[number];

// The progress bar counts SECTIONS, not screens.
const SECTIONS = [
  "company",
  "director",
  "witness",
  "shareholder",
  "summary",
] as const;
const STEP_SECTION: Record<StepId, number> = {
  company: 0,
  "director-details": 1,
  "director-address": 1,
  "witness-details": 2,
  "witness-address": 2,
  "shareholder-details": 3,
  "shareholder-address": 3,
  summary: 4,
};

// Which role does a details / address screen belong to? (witness has none)
const DETAILS_STEP_ROLE: Partial<Record<StepId, Role>> = {
  "director-details": "director",
  "shareholder-details": "shareholder",
};
const ADDRESS_STEP_ROLE: Partial<Record<StepId, Role>> = {
  "director-address": "director",
  "shareholder-address": "shareholder",
};
const DETAILS_STEP_OF: Record<Role, StepId> = {
  director: "director-details",
  shareholder: "shareholder-details",
};

// ============================================================================
// 2. FORM DATA
// ============================================================================

export interface Person {
  id: string; // "" while the person is still a draft
  firstName: string;
  lastName: string;
  occupation: string;
  phone: string; // what the user typed, WITHOUT the +234 prefix
  email: string;
  signature: File | null;
  isShareholder: boolean;
  isWitness: boolean;
  ownershipPercentage: string; // "" or "1".."100"
  address: string;
  houseNumber: string;
  streetName: string;
  state: string;
  lga: string;
  city: string;
  idType: string;
  idNumber: string;
}

const newPerson = (isShareholder = false, isWitness = false): Person => ({
  id: "",
  firstName: "",
  lastName: "",
  occupation: "",
  phone: "",
  email: "",
  signature: null,
  isShareholder,
  isWitness,
  ownershipPercentage: "",
  address: "",
  houseNumber: "",
  streetName: "",
  state: "",
  lga: "",
  city: "",
  idType: "",
  idNumber: "",
});

let idCounter = 0;
const makeId = () => `person-${Date.now()}-${idCounter++}`;

export interface BusinessDetailsInitial {
  companyName: string;
  entityType: string;
  industryName: string;
  industryId: string;
  businessCountryId: string;
  citizenship: string;
}
export interface WizardData {
  // step "company"
  companyName: string;
  entityType: string;
  industryName: string;
  industryId: string;
  businessCountryId: string;
  citizenship: string;
  companyAddress: string;
  state: string;
  companyLga: string;
  companyCity: string;
  companyHouseNumber: string;
  companyStreetName: string;
  // ein: string;
  // director section
  directors: Person[];
  directorDraft: Person; // draft.id !== "" means EDITING a saved director
  // witness section: ONE person, edited in place
  witness: Person;
  // shareholder section
  shareholders: Person[];
  shareholderDraft: Person;
  // summary
  termsAccepted: boolean;
}

const initialFormData = (
  currentDetails: BusinessDetailsInitial,
): WizardData => ({
  companyName: currentDetails.companyName,
  entityType: currentDetails.entityType,
  industryName: currentDetails.industryName,
  industryId: currentDetails.industryId,
  businessCountryId: currentDetails.businessCountryId,
  citizenship: currentDetails.citizenship,
  companyAddress: "",
  state: "",
  companyLga: "",
  companyCity: "",
  companyHouseNumber: "",
  companyStreetName: "",
  directors: [],
  directorDraft: newPerson(),
  witness: newPerson(false, true),
  shareholders: [],
  shareholderDraft: newPerson(true),
  termsAccepted: false,
});

type UpdateField = <K extends keyof WizardData>(
  key: K,
  value: WizardData[K],
) => void;

interface StepProps {
  data: WizardData;
  onChange: UpdateField;
}

// ============================================================================
// 3. DROPDOWN OPTIONS
// ============================================================================

interface Option {
  label: string;
  value: string | null; // null = the "nothing chosen yet" row
}

// TODO: replace with real data. `industry_id` must be a real UUID from the backend.
const PLACEHOLDER_OPTIONS: Option[] = [
  { label: "Select an option", value: null },
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

const OWNERSHIP_OPTIONS: Option[] = [
  { label: "Select %", value: null },
  ...Array.from({ length: 100 }, (_, i) => ({
    label: `${i + 1}%`,
    value: String(i + 1),
  })),
];

// TODO: my guess at Nigerian ID types. Change to match your backend.
const ID_TYPE_OPTIONS: Option[] = [
  { label: "Select ID type", value: null },
  { label: "National ID (NIN)", value: "nin" },
  { label: "International passport", value: "passport" },
  { label: "Driver's license", value: "drivers_license" },
  { label: "Voter's card", value: "voters_card" },
];

const labelOf = (items: Option[], value: string): string =>
  items.find((o) => o.value === value)?.label ?? value;

// ============================================================================
// 4. VALIDATION AND PEOPLE HELPERS (pure functions, no React)
// ============================================================================

const pct = (p: Person): number => Number(p.ownershipPercentage || 0);

// Used for directors, witness and shareholders
const isDetailsValid = (p: Person): boolean =>
  p.firstName.trim() !== "" &&
  p.lastName.trim() !== "" &&
  p.occupation.trim() !== "" &&
  /^\d{10,11}$/.test(p.phone.replace(/\s/g, "")) &&
  /^\S+@\S+\.\S+$/.test(p.email.trim()) &&
  // p.signature !== null &&
  (!p.isShareholder || p.ownershipPercentage !== "");

// Address and identification are checked separately.
const isAddressValid = (p: Person): boolean =>
  p.address.trim() !== "" &&
  p.houseNumber.trim() !== "" &&
  p.streetName.trim() !== "" &&
  p.state !== "" &&
  p.lga !== "" &&
  p.city.trim() !== "";

const isIdValid = (p: Person): boolean =>
  p.idType !== "" && p.idNumber.trim() !== "";

// "Nothing typed yet". `role` matters because a shareholder draft starts with
// isShareholder = true, while a director draft starts with false.
const isDraftBlank = (p: Person, role: Role): boolean =>
  [
    p.firstName,
    p.lastName,
    p.occupation,
    p.phone,
    p.email,
    p.address,
    p.houseNumber,
    p.streetName,
    p.state,
    p.lga,
    p.city,
    p.idType,
    p.idNumber,
  ].every((v) => v.trim() === "") &&
  p.signature === null &&
  !p.isWitness &&
  p.isShareholder === (role === "shareholder") &&
  p.ownershipPercentage === "";

// Total ownership across directors who ticked "owner" AND shareholders.
// A COMPLETE draft counts too, so the running total reacts as you type. If that
// draft is an edit of a saved person, the draft replaces the saved copy.
const ownershipTotal = (data: WizardData): number => {
  let total = 0;
  (["director", "shareholder"] as const).forEach((role) => {
    const { listKey, draftKey } = ROLE_CONFIG[role];
    const draft = data[draftKey];
    const draftCounts = draft.isShareholder && isDetailsValid(draft);
    data[listKey].forEach((p) => {
      const replacedByDraft =
        draftCounts && draft.id !== "" && p.id === draft.id;
      if (p.isShareholder && !replacedByDraft) total += pct(p);
    });
    if (draftCounts) total += pct(draft);
  });
  return total;
};

// Move a COMPLETE draft into its list and start a fresh draft.
// New draft (id "") gets an id and is appended. Existing id is replaced in place.
// An incomplete draft is left alone, so nothing half-finished is saved.
const saveDraft = (data: WizardData, role: Role): WizardData => {
  const { listKey, draftKey } = ROLE_CONFIG[role];
  const draft = data[draftKey];
  if (!isDetailsValid(draft) || !isAddressValid(draft) || !isIdValid(draft)) {
    return data;
  }

  const person = draft.id === "" ? { ...draft, id: makeId() } : draft;
  const list = data[listKey];
  const nextList = list.some((p) => p.id === person.id)
    ? list.map((p) => (p.id === person.id ? person : p))
    : [...list, person];

  return role === "director"
    ? { ...data, directors: nextList, directorDraft: newPerson() }
    : { ...data, shareholders: nextList, shareholderDraft: newPerson(true) };
};

const isStepValid = (step: StepId, data: WizardData): boolean => {
  switch (step) {
    case "company":
      return (
        data.companyName.trim() !== "" &&
        data.industryId !== "" &&
        data.businessCountryId !== "" &&
        data.companyAddress.trim() !== "" &&
        data.state.trim() !== "" &&
        data.companyLga.trim() !== "" &&
        data.companyCity.trim() !== "" &&
        data.companyHouseNumber.trim() !== "" &&
        data.companyStreetName.trim() !== ""
      );

    // a valid new person, OR nothing typed but at least one director saved
    case "director-details":
      return (
        isDetailsValid(data.directorDraft) ||
        (isDraftBlank(data.directorDraft, "director") &&
          data.directors.length > 0)
      );
    case "director-address":
      return (
        isAddressValid(data.directorDraft) &&
        isIdValid(data.directorDraft) &&
        ownershipTotal(data) <= 100
      );

    // the witness is one person, checked directly. No ID.
    case "witness-details":
      return isDetailsValid(data.witness);
    case "witness-address":
      return isAddressValid(data.witness) && isIdValid(data.witness);

    // Nothing typed: you may skip ahead only if ownership already totals 100%.
    // Something typed: go on to the address screen (the total is checked there).
    case "shareholder-details":
      return (
        isDetailsValid(data.shareholderDraft) ||
        (isDraftBlank(data.shareholderDraft, "shareholder") &&
          ownershipTotal(data) === 100)
      );
    // Leaving forward means "that's everyone", so the total must be exactly 100%.
    // ("Add other owners" is not gated by this.)
    case "shareholder-address":
      return (
        isAddressValid(data.shareholderDraft) &&
        isIdValid(data.shareholderDraft) &&
        ownershipTotal(data) === 100
      );

    case "summary":
      return data.termsAccepted && ownershipTotal(data) === 100;
  }
};

// Where Next and Back go. Not always index +/- 1.
const nextStepIndex = (index: number, data: WizardData): number => {
  const role = DETAILS_STEP_ROLE[STEPS[index]];
  if (role && isDraftBlank(data[ROLE_CONFIG[role].draftKey], role)) {
    return index + 2; // nothing typed: skip this role's address screen
  }
  return index + 1;
};

const prevStepIndex = (index: number): number => {
  // A director / shareholder address screen only exists for the draft. Going
  // back from the screen AFTER it lands on the details screen, not on it.
  const previous = STEPS[index - 1];
  if (previous && ADDRESS_STEP_ROLE[previous]) return index - 2;
  return Math.max(0, index - 1);
};

// ============================================================================
// 5. SUBMITTING: map to the backend shape -> multipart PUT
// ============================================================================

// -- the shape the backend expects ------------------------------------------
interface WireAddress {
  address: string;
  state: string;
  LGA: string;
  city: string;
  house_number: string;
  street_name: string;
  postal_code: string;
}
interface WireCompanyAddress extends WireAddress {
  type: string;
}
interface WireMemberAddress extends WireAddress {
  country: string;
}
interface WireMember {
  first_name: string;
  last_name: string;
  other_name: string;
  phone_number: string;
  email: string;
  occupation: string;
  nationality: string;
  gender: string;
  date_of_birth: string;
  is_director: boolean;
  is_shareholder: boolean;
  is_witness: boolean;
  ownership_percentage: number;
  address: WireMemberAddress;
  id_type: string;
  id_number: string;
  file_path: string;
  signature: File | null;
}
export interface CompanyReg {
  name: string;
  second_name?: string;
  business_country_id: string;
  industry_id: string;
  citizenship: string;
  addresses: WireCompanyAddress[];
  members: WireMember[];
}

// -- one Person -> one Member (pure, easy to test) --------------------------
interface MemberRoles {
  isDirector: boolean;
  isShareholder: boolean;
  isWitness: boolean;
}

// "8104051896" or "08104051896" -> "+2348104051896"
const toPhoneNumber = (phone: string): string =>
  "+234" + phone.replace(/\s/g, "").replace(/^0/, "");

const toMember = (p: Person, roles: MemberRoles): WireMember => ({
  first_name: p.firstName.trim(),
  last_name: p.lastName.trim(),
  other_name: "", // TODO: no field in the design
  phone_number: toPhoneNumber(p.phone),
  email: p.email.trim(),
  occupation: p.occupation?.trim() ?? "",
  nationality: "", // TODO: no field in the design
  gender: "", // TODO: no field in the design
  date_of_birth: "", // TODO: no field in the design
  is_director: roles.isDirector,
  is_shareholder: roles.isShareholder,
  is_witness: roles.isWitness,
  ownership_percentage: roles.isShareholder ? pct(p) : 0,
  address: {
    address: p.address.trim(),
    state: p.state,
    LGA: p.lga,
    city: p.city.trim(),
    house_number: p.houseNumber?.trim() ?? "",
    street_name: p.streetName?.trim() ?? "",
    postal_code: "", // TODO: no field in the design
    country: "Nigeria",
  },
  id_type: p.idType, // "" for the witness
  id_number: p.idNumber.trim(), // "" for the witness
  file_path: "", // TODO: the design has no ID-document upload
  signature: p.signature,
});

// -- the whole form -> the request body -------------------------------------
function buildCompanyPayload(data: WizardData): CompanyReg {
  const entries: { person: Person; roles: MemberRoles }[] = [
    ...data.directors.map((person) => ({
      person,
      // a director who ticked "owner" is ALSO a shareholder: one member, two flags
      roles: {
        isDirector: true,
        isShareholder: true,
        isWitness: person.isWitness,
      },
    })),
    {
      person: data.witness,
      roles: {
        isDirector: false,
        isShareholder: false,
        isWitness: data.witness.isWitness,
      },
    },
    ...data.shareholders.map((person) => ({
      person,
      roles: {
        isDirector: false,
        isShareholder: person.isShareholder,
        isWitness: person.isWitness,
      },
    })),
  ];

  const members = entries.map(({ person, roles }) => toMember(person, roles));

  return {
    name: data.companyName.trim(),
    business_country_id: data.businessCountryId,
    industry_id: data.industryId,
    citizenship: CITIZENSHIP,
    addresses: [
      {
        address: data.companyAddress?.trim() ?? "",
        state: data.state.trim(),
        LGA: data.companyLga?.trim() ?? "",
        city: data.companyCity?.trim() ?? "",
        house_number: data.companyHouseNumber?.trim() ?? "",
        street_name: data.companyStreetName?.trim() ?? "",
        postal_code: "",
        type: "registered",
      },
    ],
    members,
  };
}

function appendFormDataValue(formData: FormData, value: unknown, key: string) {
  if (value instanceof File) {
    formData.append(key, value);
    return;
  }

  if (typeof value === "boolean") {
    formData.append(key, value ? "1" : "0");
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      appendFormDataValue(formData, item, `${key}[${index}]`),
    );
    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([childKey, childValue]) =>
      appendFormDataValue(formData, childValue, `${key}[${childKey}]`),
    );
    return;
  }

  if (value !== null && value !== undefined) {
    formData.append(key, String(value));
  }
}

function toCompanyFormData(payload: CompanyReg): FormData {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) =>
    appendFormDataValue(formData, value, key),
  );
  return formData;
}

// ============================================================================
// 6. SMALL REUSABLE FIELDS
// ============================================================================

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: TextFieldProps) {
  return (
    <div className="space-y-4">
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  items: Option[];
  value: string; // "" means nothing chosen
  onChange: (value: string) => void;
  disabled?: boolean;
}

function SelectField({
  label,
  items,
  value,
  onChange,
  disabled,
}: SelectFieldProps) {
  return (
    <Field className="w-full">
      <Select
        items={items}
        value={value || null}
        disabled={disabled}
        onValueChange={(v) => typeof v === "string" && onChange(v)}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldLabel>{label}</FieldLabel>
    </Field>
  );
}

function PhoneField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="rounded-md border px-3 py-2 text-sm">+234</span>
        <Input
          id="phone"
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Phone number"
        />
      </div>
      <Label htmlFor="phone">Enter phone number</Label>
    </div>
  );
}

function SignatureUpload({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onChange(e.target.files?.[0] ?? null);
          e.target.value = ""; // 2. 🔧 make the input forget it, so picking the SAME file again still fires
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm"
      >
        <Plus className="h-4 w-4" />
        {file ? file.name : "Upload Signature"}
      </button>
    </>
  );
}

// "Total ownership: 60% of 100% (40% left)". Green at 100, red over 100.
function OwnershipNote({ total }: { total: number }) {
  if (total === 0) return null;
  const tone =
    total === 100
      ? "text-green-700"
      : total > 100
        ? "text-red-600"
        : "text-amber-700";
  return (
    <p className={`text-center text-sm ${tone}`}>
      Total ownership: {total}% of 100%
      {total < 100 && ` (${100 - total}% left)`}
      {total > 100 && " (over 100%, please fix)"}
    </p>
  );
}

// ============================================================================
// 7. SHARED PERSON FIELDS (used by director, witness AND shareholder screens)
// ============================================================================

interface PersonFieldsProps {
  person: Person;
  onPatch: (patch: Partial<Person>) => void;
}

// first name, last name, occupation, (optional ownership), phone, email, signature
function PersonDetailsFields({
  person,
  onPatch,
  withOwnership,
}: PersonFieldsProps & { withOwnership: boolean }) {
  return (
    <>
      <div
        className={`grid grid-cols-1 gap-4 ${
          withOwnership ? "sm:grid-cols-3" : "sm:grid-cols-2"
        }`}
      >
        <TextField
          id="firstName"
          label="First name"
          value={person.firstName}
          onChange={(v) => onPatch({ firstName: v })}
          placeholder="Enter first name"
        />
        <TextField
          id="lastName"
          label="Last name"
          value={person.lastName}
          onChange={(v) => onPatch({ lastName: v })}
          placeholder="Enter last name"
        />
        {/* disabled until the person is an owner (always enabled for shareholders) */}
        {withOwnership && (
          <SelectField
            label="Ownership percentage"
            items={OWNERSHIP_OPTIONS}
            value={person.ownershipPercentage}
            disabled={!person.isShareholder}
            onChange={(v) => onPatch({ ownershipPercentage: v })}
          />
        )}
      </div>

      <TextField
        id="occupation"
        label="Occupation"
        value={person.occupation}
        onChange={(v) => onPatch({ occupation: v })}
        placeholder="Enter occupation"
      />

      <PhoneField
        value={person.phone}
        onChange={(v) => onPatch({ phone: v })}
      />

      <TextField
        id="email"
        type="email"
        label="Email address"
        value={person.email}
        onChange={(v) => onPatch({ email: v })}
        placeholder="Enter email address"
      />

      <SignatureUpload
        file={person.signature}
        onChange={(file) => onPatch({ signature: file })}
      />
    </>
  );
}

// The "Means of identification" modal.
// It keeps a WORKING COPY of the two fields. Nothing reaches the person until
// "Done" is pressed, and "Back" (or Escape) throws the copy away.
// It is only mounted while open, so the copy always starts from the saved values.
interface IdDialogProps {
  initialType: string;
  initialNumber: string;
  onSave: (idType: string, idNumber: string) => void;
  onClose: () => void;
}

function IdDialog({
  initialType,
  initialNumber,
  onSave,
  onClose,
}: IdDialogProps) {
  const [idType, setIdType] = useState(initialType);
  const [idNumber, setIdNumber] = useState(initialNumber);
  const canSave = idType !== "" && idNumber.trim() !== "";

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose(); // Escape / outside click = Back
      }}
    >
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">
            Means of identification
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <SelectField
            label="ID type"
            items={ID_TYPE_OPTIONS}
            value={idType}
            onChange={setIdType}
          />
          <TextField
            id="idNumber"
            label="ID number"
            value={idNumber}
            onChange={setIdNumber}
            placeholder="Enter ID number"
          />
        </div>

        <div className="flex justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-4xl text-black bg-amber-500/20 hover:bg-amber-500/70"
          >
            <ArrowLeftFromLine />
            Back
          </Button>
          <Button
            type="button"
            onClick={() => onSave(idType, idNumber.trim())}
            disabled={!canSave}
            className={`rounded-4xl text-white border-0 ${
              canSave ? "bg-blue-card hover:bg-blue-900" : "bg-gray-400"
            }`}
          >
            Done
            <ArrowRightFromLine />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Address components and the "Add identification" button + its modal.
function PersonAddressFields({
  person,
  onPatch,
  withId,
}: PersonFieldsProps & { withId: boolean }) {
  // UI-only toggle: the user's own "open the modal" click
  const [idOpen, setIdOpen] = useState(false);

  return (
    <>
      <TextField
        id="address"
        label="Address"
        value={person.address}
        onChange={(v) => onPatch({ address: v })}
        placeholder="Enter address"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="houseNumber"
          label="House number"
          value={person.houseNumber}
          onChange={(v) => onPatch({ houseNumber: v })}
          placeholder="Enter house number"
        />
        <TextField
          id="streetName"
          label="Street name"
          value={person.streetName}
          onChange={(v) => onPatch({ streetName: v })}
          placeholder="Enter street name"
        />
        <TextField
          id="state"
          label="State"
          value={person.state}
          onChange={(v) => onPatch({ state: v })}
          placeholder="Enter state"
        />
        <TextField
          id="lga"
          label="LGA"
          value={person.lga}
          onChange={(v) => onPatch({ lga: v })}
          placeholder="Enter LGA"
        />
        <TextField
          id="city"
          label="City"
          value={person.city}
          onChange={(v) => onPatch({ city: v })}
          placeholder="Enter city"
        />
      </div>

      {withId && (
        <button
          type="button"
          onClick={() => setIdOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm"
        >
          {person.idType ? (
            <Pencil className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {person.idType
            ? `${labelOf(ID_TYPE_OPTIONS, person.idType)}: ${person.idNumber}`
            : "Add identification"}
        </button>
      )}

      {withId && idOpen && (
        <IdDialog
          initialType={person.idType}
          initialNumber={person.idNumber}
          onSave={(idType, idNumber) => {
            onPatch({ idType, idNumber });
            setIdOpen(false);
          }}
          onClose={() => setIdOpen(false)}
        />
      )}
    </>
  );
}

// ============================================================================
// 8. THE STEPS
// ============================================================================

function CompanyInfoStep({ data, onChange }: StepProps) {
  return (
    <div className="space-y-8">
      <h4 className="font-semibold text-2xl text-center">
        What is your company&apos;s information?
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField
          id="companyName"
          label="Company name"
          value={data.companyName}
          onChange={(v) => onChange("companyName", v)}
          placeholder="Enter company name"
        />
        <TextField
          id="entityType"
          label="Entity type"
          value={data.entityType}
          onChange={() => {}}
          disabled
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField
          id="industryName"
          label="Business category"
          value={data.industryName}
          onChange={() => {}}
          disabled
        />
        <TextField
          id="Citizenship"
          label="citizenship"
          value={data.citizenship}
          onChange={() => {}}
          disabled
        />
      </div>

      <h5 className="font-semibold">Registered company address</h5>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="companyAddress"
          label="Address"
          value={data.companyAddress}
          onChange={(v) => onChange("companyAddress", v)}
          placeholder="Enter registered address"
        />
        <TextField
          id="companyHouseNumber"
          label="House number"
          value={data.companyHouseNumber}
          onChange={(v) => onChange("companyHouseNumber", v)}
          placeholder="Enter house number"
        />
        <TextField
          id="companyStreetName"
          label="Street name"
          value={data.companyStreetName}
          onChange={(v) => onChange("companyStreetName", v)}
          placeholder="Enter street name"
        />
        <TextField
          id="companyState"
          label="State"
          value={data.state}
          onChange={(v) => onChange("state", v)}
          placeholder="Enter state"
        />
        <TextField
          id="companyLga"
          label="LGA"
          value={data.companyLga}
          onChange={(v) => onChange("companyLga", v)}
          placeholder="Enter LGA"
        />
        <TextField
          id="companyCity"
          label="City"
          value={data.companyCity}
          onChange={(v) => onChange("companyCity", v)}
          placeholder="Enter city"
        />
      </div>

      {/* <TextField
        id="ein"
        label="EIN"
        value={data.ein}
        onChange={(v) => onChange("ein", v)}
        placeholder="Enter EIN"
      /> */}
    </div>
  );
}

// The "<Role> Information [+]" bar. Closed = bar with "+".
// Open = the summary card(s) with an X that only collapses the panel.
function SavedPeople({
  label,
  people,
  editingId,
  canEdit,
  onEdit,
}: {
  label: string;
  people: Person[];
  editingId: string;
  canEdit: boolean; // false while a draft is half-typed, so it can't be lost
  onEdit: (person: Person) => void;
}) {
  const [open, setOpen] = useState(true);
  if (people.length === 0) return null;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-xl bg-gray-100 px-4 py-4 text-left font-semibold"
      >
        {label} Information
        <Plus className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="space-y-4 rounded-xl bg-gray-100 p-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{label} Information</span>
        <button
          type="button"
          aria-label={`Collapse ${label.toLowerCase()} information`}
          onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {people.map((p) => (
        <div
          key={p.id}
          className="space-y-1 border-t pt-4 text-sm first:border-t-0 first:pt-0"
        >
          <p>
            <strong>Name:</strong> {p.firstName} {p.lastName}
          </p>
          {p.isShareholder && (
            <p>
              <strong>Ownership:</strong> {p.ownershipPercentage}%
            </p>
          )}
          <p>
            <strong>Phone number:</strong> {p.phone}
          </p>
          <p>
            <strong>Email:</strong> {p.email}
          </p>
          {p.id === editingId ? (
            <p className="pt-2 text-center text-muted-foreground">
              Editing below
            </p>
          ) : (
            <Button
              type="button"
              variant="outline"
              disabled={!canEdit}
              onClick={() => onEdit(p)}
              className="mt-2 w-full rounded-4xl"
            >
              Edit
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

// Details screen for a role that can have MANY people (director, shareholder)
function PeopleDetailsStep({
  role,
  data,
  onChange,
}: StepProps & { role: Role }) {
  const { draftKey, listKey, label } = ROLE_CONFIG[role];
  const draft = data[draftKey];
  const patch = (p: Partial<Person>) => onChange(draftKey, { ...draft, ...p });
  const isEditing = draft.id !== "";

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-2xl text-center">
        {label} Information
      </h4>

      <SavedPeople
        label={label}
        people={data[listKey]}
        editingId={draft.id}
        canEdit={isDraftBlank(draft, role)}
        onEdit={(person) => onChange(draftKey, person)}
      />

      <OwnershipNote total={ownershipTotal(data)} />

      <div className="space-y-6 rounded-xl bg-gray-50 p-4">
        {isEditing && (
          <div className="flex items-center justify-between text-sm">
            <span>Editing {draft.firstName}</span>
            <button
              type="button"
              className="underline"
              onClick={() =>
                onChange(draftKey, newPerson(role === "shareholder"))
              }
            >
              Cancel edit
            </button>
          </div>
        )}

        <PersonDetailsFields person={draft} onPatch={patch} withOwnership />
      </div>

      {role === "director" && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isShareholder"
            checked={draft.isShareholder}
            onChange={(e) =>
              // unticking also clears the percentage
              patch({
                isShareholder: e.target.checked,
                ownershipPercentage: e.target.checked
                  ? draft.ownershipPercentage
                  : "",
              })
            }
            className="h-4 w-4 shrink-0"
          />
          <Label htmlFor="isShareholder">
            This is the owner of the company
          </Label>
        </div>
      )}
    </div>
  );
}

// Address + ID screen for director / shareholder, with "Add other owners"
function PeopleAddressStep({
  role,
  data,
  onChange,
  canAddAnother,
  onAddAnother,
}: StepProps & {
  role: Role;
  canAddAnother: boolean;
  onAddAnother: () => void;
}) {
  const { draftKey, label } = ROLE_CONFIG[role];
  const draft = data[draftKey];
  const patch = (p: Partial<Person>) => onChange(draftKey, { ...draft, ...p });

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-2xl text-center">
        {label} address and ID
      </h4>
      <p className="text-center text-sm text-muted-foreground">
        {draft.firstName} {draft.lastName}
      </p>

      <div className="space-y-6 rounded-xl bg-gray-50 p-4">
        <PersonAddressFields person={draft} onPatch={patch} withId />
      </div>

      <OwnershipNote total={ownershipTotal(data)} />

      <button
        type="button"
        disabled={!canAddAnother}
        onClick={onAddAnother}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm disabled:opacity-50"
      >
        <Plus className="h-4 w-4" />
        Add other owners
      </button>
    </div>
  );
}

// Witness: ONE person, edited directly in `data.witness`. No saved cards,
// no "Add other", no ownership, and (on the address screen) no ID.
function WitnessDetailsStep({ data, onChange }: StepProps) {
  const witness = data.witness;
  const patch = (p: Partial<Person>) =>
    onChange("witness", { ...witness, ...p });

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-2xl text-center">
        Witness Information
      </h4>
      <div className="space-y-6 rounded-xl bg-gray-50 p-4">
        <PersonDetailsFields
          person={witness}
          onPatch={patch}
          withOwnership={false}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isWitness"
            checked={witness.isWitness}
            onChange={(e) => patch({ isWitness: e.target.checked })}
            className="h-4 w-4 shrink-0"
          />
          <Label htmlFor="isWitness">This person is a witness</Label>
        </div>
      </div>
    </div>
  );
}

function WitnessAddressStep({ data, onChange }: StepProps) {
  const witness = data.witness;
  const patch = (p: Partial<Person>) =>
    onChange("witness", { ...witness, ...p });

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-2xl text-center">Witness address</h4>
      <p className="text-center text-sm text-muted-foreground">
        {witness.firstName} {witness.lastName}
      </p>
      <div className="space-y-6 rounded-xl bg-gray-50 p-4">
        <PersonAddressFields person={witness} onPatch={patch} withId />
      </div>
    </div>
  );
}

// -- summary ------------------------------------------------------------------

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <strong>{label}:</strong> {value || "-"}
    </p>
  );
}

function SummarySection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-xl bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold">{title}</h5>
        <Button
          type="button"
          variant="outline"
          onClick={onEdit}
          className="h-8 rounded-4xl px-3 text-xs"
        >
          Edit
          <Pencil className="h-3 w-3" />
        </Button>
      </div>
      <div className="space-y-3 text-sm">{children}</div>
    </div>
  );
}

function PersonSummaryBlock({
  person,
  showId,
  showOwnership,
}: {
  person: Person;
  showId: boolean;
  showOwnership: boolean;
}) {
  const address = [
    person.houseNumber,
    person.streetName,
    person.address,
    person.city,
    labelOf(PLACEHOLDER_OPTIONS, person.lga),
    labelOf(PLACEHOLDER_OPTIONS, person.state),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-1 border-t pt-3 first:border-t-0 first:pt-0">
      <SummaryLine
        label="Name"
        value={`${person.firstName} ${person.lastName}`}
      />
      <SummaryLine label="Phone" value={`+234 ${person.phone}`} />
      <SummaryLine label="Email" value={person.email} />
      <SummaryLine label="Occupation" value={person.occupation} />
      {showOwnership && (
        <SummaryLine
          label="Ownership"
          value={`${person.ownershipPercentage}%`}
        />
      )}
      <SummaryLine label="Signature" value={person.signature?.name ?? ""} />
      <SummaryLine label="Address" value={address} />
      {showId && (
        <SummaryLine
          label="ID"
          value={`${labelOf(ID_TYPE_OPTIONS, person.idType)}: ${person.idNumber}`}
        />
      )}
    </div>
  );
}

// Everything the user filled in, then the terms UNDER it. The Submit button
// lives in the navigation row of the modal (this is the last step).
function SummaryStep({
  data,
  onChange,
  onEditStep,
  error,
}: StepProps & { onEditStep: (step: StepId) => void; error: string | null }) {
  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-2xl text-center">
        Review your details
      </h4>

      <SummarySection title="Company" onEdit={() => onEditStep("company")}>
        <div className="space-y-1">
          <SummaryLine label="Company name" value={data.companyName} />
          <SummaryLine
            label="Document type"
            value={labelOf(PLACEHOLDER_OPTIONS, data.entityType)}
          />
          <SummaryLine
            label="Business category"
            value={labelOf(PLACEHOLDER_OPTIONS, data.industryName)}
          />
          <SummaryLine label="citizenship" value={data.citizenship} />
          <SummaryLine
            label="Registered address"
            value={`${data.companyHouseNumber} ${data.companyStreetName}, ${data.companyAddress}, ${data.companyCity}, ${data.companyLga}, ${data.state}`}
          />
        </div>
      </SummarySection>

      <SummarySection
        title="Directors"
        onEdit={() => onEditStep("director-details")}
      >
        {data.directors.map((p) => (
          <PersonSummaryBlock
            key={p.id}
            person={p}
            showId
            showOwnership={p.isShareholder}
          />
        ))}
      </SummarySection>

      <SummarySection
        title="Witness"
        onEdit={() => onEditStep("witness-details")}
      >
        <PersonSummaryBlock
          person={data.witness}
          showId
          showOwnership={false}
        />
      </SummarySection>

      <SummarySection
        title="Shareholders"
        onEdit={() => onEditStep("shareholder-details")}
      >
        {data.shareholders.length === 0 ? (
          <p className="text-muted-foreground">
            No separate shareholders. Ownership is held by the directors above.
          </p>
        ) : (
          data.shareholders.map((p) => (
            <PersonSummaryBlock
              key={p.id}
              person={p}
              showId
              showOwnership={p.isShareholder}
            />
          ))
        )}
      </SummarySection>

      <OwnershipNote total={ownershipTotal(data)} />

      {/* Terms sit under the summary */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          checked={data.termsAccepted}
          onChange={(e) => onChange("termsAccepted", e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0"
        />
        <Label htmlFor="terms">I accept the terms and conditions</Label>
      </div>

      {error && (
        <p role="alert" className="text-center text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// 9. PROGRESS BAR
// ============================================================================

function StepProgressBar({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) {
  return (
    <div className="mb-6 flex w-full items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors ${
            i < currentIndex
              ? "bg-green-600"
              : i === currentIndex
                ? "bg-blue-600"
                : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// ============================================================================
// 10. THE MODAL (owns all state)
// ============================================================================

export function GetStartedModal({
  businessId,
  initial,
}: {
  businessId: string;
  initial: BusinessDetailsInitial;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<WizardData>(() =>
    initialFormData(initial),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const stepId = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const canProceed = isStepValid(stepId, formData);

  const updateField: UpdateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (isLastStep || !canProceed) return;
    // leaving a director / shareholder address screen forward: save that person first
    const role = ADDRESS_STEP_ROLE[stepId];
    if (role) setFormData((prev) => saveDraft(prev, role));
    setStepIndex(nextStepIndex(stepIndex, formData));
  };

  const handleBack = () => {
    setSubmitError(null);
    setStepIndex(prevStepIndex(stepIndex));
  };

  // "Add other owners": save this person, then return to that role's details screen
  const handleAddAnother = (role: Role) => {
    setFormData((prev) => saveDraft(prev, role));
    setStepIndex(STEPS.indexOf(DETAILS_STEP_OF[role]));
  };

  // "Add other owners" is allowed once the person is complete and the total
  // has not gone over 100%
  const canAddAnother = (role: Role): boolean => {
    const draft = formData[ROLE_CONFIG[role].draftKey];
    return (
      isDetailsValid(draft) &&
      isAddressValid(draft) &&
      isIdValid(draft) &&
      ownershipTotal(formData) <= 100
    );
  };

  // used by the "Edit" buttons on the summary
  const goToStep = (step: StepId) => {
    setSubmitError(null);
    setStepIndex(STEPS.indexOf(step));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLastStep) {
      handleNext();
      return;
    }
    if (!canProceed) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const companyPayload = buildCompanyPayload(formData);
      const payload = toCompanyFormData(companyPayload);
      const result = await completeCompanyReg(businessId, payload);
      if (!result.success) {
        console.error(
          "Business registration response:",
          JSON.stringify({ status: result.status, body: result.body }, null, 2),
        );
        throw new Error(result.error);
      }

      // success: close, reset, leave
      setIsOpen(false);
      setStepIndex(0);
      setFormData(initialFormData(initial));
      router.refresh();
    } catch (err) {
      // failure: keep every answer, show the reason, let the user retry
      console.error("Business registration submission failed:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="bg-transparent border rounded-3xl text-nowrap px-4 py-2 hover:bg-primary">
          Get Started
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100dvh-1rem)] min-w-0 overflow-y-auto px-4 py-4 sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100dvh-2rem)]   lg:max-w-4xl lg:px-8">
          <DialogHeader>
            <DialogTitle className="sr-only">Get started</DialogTitle>
          </DialogHeader>

          <StepProgressBar
            currentIndex={STEP_SECTION[stepId]}
            total={SECTIONS.length}
          />

          <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
            {stepId === "company" && (
              <CompanyInfoStep data={formData} onChange={updateField} />
            )}

            {stepId === "director-details" && (
              <PeopleDetailsStep
                role="director"
                data={formData}
                onChange={updateField}
              />
            )}
            {stepId === "director-address" && (
              <PeopleAddressStep
                role="director"
                data={formData}
                onChange={updateField}
                canAddAnother={canAddAnother("director")}
                onAddAnother={() => handleAddAnother("director")}
              />
            )}

            {stepId === "witness-details" && (
              <WitnessDetailsStep data={formData} onChange={updateField} />
            )}
            {stepId === "witness-address" && (
              <WitnessAddressStep data={formData} onChange={updateField} />
            )}

            {stepId === "shareholder-details" && (
              <PeopleDetailsStep
                role="shareholder"
                data={formData}
                onChange={updateField}
              />
            )}
            {stepId === "shareholder-address" && (
              <PeopleAddressStep
                role="shareholder"
                data={formData}
                onChange={updateField}
                canAddAnother={canAddAnother("shareholder")}
                onAddAnother={() => handleAddAnother("shareholder")}
              />
            )}

            {stepId === "summary" && (
              <SummaryStep
                data={formData}
                onChange={updateField}
                onEditStep={goToStep}
                error={submitError}
              />
            )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={stepIndex === 0 || isSubmitting}
                className="rounded-4xl text-black bg-amber-500/20 hover:bg-amber-500/70"
              >
                <ArrowLeftFromLine />
                Back
              </Button>

              {isLastStep ? (
                <Button
                  type="submit"
                  disabled={!canProceed || isSubmitting}
                  className="rounded-4xl text-white bg-green-500 hover:bg-green-600"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`rounded-4xl text-white border-0 ${
                    canProceed
                      ? "bg-blue-card hover:bg-blue-900"
                      : "bg-gray-400"
                  }`}
                >
                  Next
                  <ArrowRightFromLine />
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSubmitting}>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Loader2 className="mb-4 h-10 w-10 animate-spin" />
            <h2 className="text-lg font-semibold">Submitting...</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Please wait while we process your information.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GetStartedModal;
