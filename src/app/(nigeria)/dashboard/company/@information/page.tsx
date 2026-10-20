import { Card, CardHeader } from "@/components/ui/card";
import { getActiveBusinessId } from "@/lib/business";
import { getBusinessDetails } from "@/src/app/business-details/businessDetails";
import { Copy } from "lucide-react";

export default async function InformationPage() {
  const businessId = await getActiveBusinessId();
  const business = await getBusinessDetails(businessId);
  return (
    <div className="grid grid-cols-1 gap-6 py-2 lg:grid-cols-2">
      <Card className="p-4">
        <CardHeader className="text-2xl font-semibold">
          Business Information
        </CardHeader>

        <div className="text-light-black space-y-4 mt-4 text-lg font-normal">
          <div className="flex justify-between gap-4">
            <span> Business Name</span>
            <div className="flex gap-1 ite1s-center">
              {business?.name ?? "—"}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> Entity</span>
            <div className="flex gap-1 items-center">
              {business?.entity_type ?? "—"}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> Industry</span>
            <div className="flex gap-1 items-center">
              {business?.industry ?? "—"}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> Country</span>
            <div className="flex gap-1 items-center">
              {business?.business_country ?? "—"}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> State</span>
            <div className="flex gap-1 items-center">
              {business?.state ?? "—"}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> Email Address</span>
            <div className="flex gap-1 ite1s-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span> Phone Number</span>
            <div className="flex gap-1 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
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

            <div className="text-light-black space-y-4 mt-4 text-lg font-normal">
              <div className="flex justify-between gap-4">
                <span>First name</span>
                <div className="flex gap-1 items-center text-wrap">
                  {memberData.first_name || "—"}
                  <span>
                    {" "}
                    <Copy size={15} />{" "}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>Last name</span>
                <div className="flex gap-1 items-center text-wrap">
                  {memberData.last_name || "—"}
                  <span>
                    {" "}
                    <Copy size={15} />{" "}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>Email</span>
                <div className="flex gap-1 items-center text-wrap">
                  {memberData.email || "—"}
                  <span>
                    {" "}
                    <Copy size={15} />{" "}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>Tel</span>
                <div className="flex gap-1 items-center text-wrap">
                  {memberData.phone_number || "—"}
                  <span>
                    {" "}
                    <Copy size={15} />{" "}
                  </span>
                </div>
              </div>

              <div className="flex justify-between gap-7">
                <span>Position</span>
                <div className="flex gap-1 items-center text-wrap">
                  {position || "—"}
                  <span>
                    {" "}
                    <Copy size={15} />{" "}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>Ownership</span>
                <div className="flex gap-1 items-center text-wrap">
                  {memberData.ownership_percentage || "—"}
                  <span>
                    {" "}
                    <Copy size={15} />{" "}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>State</span>
                <div className="flex gap-1 items-center text-wrap">
                  {memberAddress?.state || "—"}
                  <span>
                    {" "}
                    <Copy size={15} />{" "}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <span>City</span>
                <div className="flex gap-1 items-center text-wrap">
                  {memberAddress?.city || "—"}
                  <span>
                    {" "}
                    <Copy size={15} />{" "}
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
