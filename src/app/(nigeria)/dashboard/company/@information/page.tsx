import { Card, CardHeader } from "@/components/ui/card";
import CopyButton from "@/components/ui/CopyButton";
import { getActiveBusinessId } from "@/lib/business";
import { getBusinessDetails } from "@/src/app/business-details/businessDetails";

export default async function InformationPage() {
  const businessId = await getActiveBusinessId();
  const business = await getBusinessDetails(businessId);
  return (
    <div className="grid grid-cols-1 gap-6 py-2 lg:grid-cols-2">
      <Card className="p-4">
        <CardHeader className="text-2xl font-semibold">
          Business Information
        </CardHeader>

        <div className="text-light-black space-y-4 mt-4 text-xs sm:text-base font-normal">
          <div className="flex justify-between gap-4">
            <span> Business Name</span>
            <div className="flex gap-2 items-center">
              {business?.name ?? "—"}
              <span>
                {business?.name && <CopyButton copyText={business.name} />}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> Entity</span>
            <div className="flex gap-2 items-center">
              {business?.entity_type ?? "—"}
              <span>
                {" "}
                {business?.entity_type && (
                  <CopyButton copyText={business.entity_type} />
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> Industry</span>
            <div className="flex gap-2 items-center">
              {business?.industry ?? "—"}
              <span>
                {" "}
                {business?.industry && (
                  <CopyButton copyText={business.industry} />
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> Country</span>
            <div className="flex gap-2 items-center">
              {business?.business_country ?? "—"}
              <span>
                {" "}
                {business?.business_country && (
                  <CopyButton copyText={business.business_country} />
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> State</span>
            <div className="flex gap-2 items-center">
              {business?.state ?? "—"}
              <span>
                {" "}
                {business?.state && <CopyButton copyText={business.state} />}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> Email Address</span>
            <div className="flex gap-2 items-center">
              {business?.email ?? "—"}
              <span>
                {" "}
                {business?.email && <CopyButton copyText={business.email} />}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> Phone Number</span>
            <div className="flex gap-2 items-center">
              {business?.phone_number ?? "—"}
              <span>
                {" "}
                {business?.phone_number && (
                  <CopyButton copyText={business.phone_number} />
                )}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {business?.members?.map((member, index) => {
        const memberData = member as Omit<typeof member, "address"> & {
          id?: string;
          director?: boolean | number;
          shareholder?: boolean | number;
          witness?: boolean | number;
          address:
            | typeof member.address
            | Array<Partial<typeof member.address>>;
        };
        const memberAddress = Array.isArray(memberData.address)
          ? memberData.address[0]
          : memberData.address;
        const position = [
          memberData.director === true || memberData.director === 1
            ? "director"
            : null,
          memberData.shareholder === true || memberData.shareholder === 1
            ? "shareholder"
            : null,
          memberData.witness === true || memberData.witness === 1
            ? "witness"
            : null,
        ]
          .filter((role) => role !== null)
          .join(" & ");

        return (
          <Card
            className="p-4"
            key={
              memberData.id ??
              `${memberData.first_name}-${memberData.last_name}-${index}`
            }
          >
            <CardHeader className="text-2xl font-semibold">
              Member information
            </CardHeader>

            <div className="text-light-black space-y-4 mt-4 text-xs sm:text-base font-normal">
              <div className="flex justify-between gap-4">
                <span>First name</span>
                <div className="flex gap-2 items-center text-wrap capitalize">
                  {memberData.first_name || "—"}
                  <span>
                    {" "}
                    {memberData.first_name && (
                      <CopyButton copyText={memberData.first_name} />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>Last name</span>
                <div className="flex gap-2 items-center text-wrap capitalize">
                  {memberData.last_name || "—"}
                  <span>
                    {" "}
                    {memberData.last_name && (
                      <CopyButton copyText={memberData.last_name} />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>Email</span>
                <div className="flex gap-2 items-center text-wrap capitalize">
                  {memberData.email || "—"}
                  <span>
                    {" "}
                    {memberData.email && (
                      <CopyButton copyText={memberData.email} />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>Tel</span>
                <div className="flex gap-2 items-center text-wrap capitalize">
                  {memberData.phone_number || "—"}
                  <span>
                    {" "}
                    {memberData.phone_number && (
                      <CopyButton copyText={memberData.phone_number} />
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between gap-7">
                <span>Position</span>
                <div className="flex gap-2 items-center text-wrap capitalize">
                  {position || "—"}
                  <span> {position && <CopyButton copyText={position} />}</span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>Ownership</span>
                <div className="flex gap-2 items-center text-wrap capitalize">
                  {memberData.ownership_percentage || "—"}
                  <span>
                    {" "}
                    {memberData.ownership_percentage && (
                      <CopyButton copyText={memberData.ownership_percentage} />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>State</span>
                <div className="flex gap-2 items-center text-wrap capitalize">
                  {memberAddress?.state || "—"}
                  <span>
                    {" "}
                    {memberAddress?.state && (
                      <CopyButton copyText={memberAddress?.state} />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>City</span>
                <div className="flex gap-2 items-center text-wrap capitalize">
                  {memberAddress?.city || "—"}
                  <span>
                    {" "}
                    {memberAddress?.city && (
                      <CopyButton copyText={memberAddress?.city} />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
