import { Card, CardHeader } from "@/components/ui/card";
import { getActiveBusinessId } from "@/lib/business";
import { getBusinessDetails } from "@/src/app/business-details/businessDetails";
import { Copy } from "lucide-react";

export default async function InformationPage() {
  const businessId = await getActiveBusinessId();
  const business = await getBusinessDetails(businessId);
  return (
    <div className="grid gris-col-1 lg:grid-cols-2 gap-6 ">
      <Card className="p-8">
        <CardHeader className="text-2xl font-semibold">
          Business Information
        </CardHeader>

        <div className="text-light-black space-y-4 mt-4 text-lg font-normal">
          <div className="flex justify-between">
            <span> Business Name</span>
            <div className="flex gap-2 items-center">
              {business?.name ?? "—"}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Entity</span>
            <div className="flex gap-2 items-center">
              {business?.entity_type ?? "—"}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Industry</span>
            <div className="flex gap-2 items-center">
              {business?.industry ?? "—"}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Country</span>
            <div className="flex gap-2 items-center">
              {business?.business_country ?? "—"}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> State</span>
            <div className="flex gap-2 items-center">
              {business?.state ?? "—"}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Email Address</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Phone Number</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <CardHeader className="text-2xl font-semibold">
          Witness information
        </CardHeader>

        <div className="text-light-black space-y-4 mt-4 text-lg font-normal">
          <div className="flex justify-between">
            <span> Surname</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>First Name</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Other Name </span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Email Address</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Phone Number</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Occupation </span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> State</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> LGA</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> City</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <CardHeader className="text-2xl font-semibold">
          Direction information
        </CardHeader>

        <div className="text-light-black space-y-4 mt-4 text-lg font-normal">
          <div className="flex justify-between">
            <span> Surname</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>First Name</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Other Name </span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Email Address</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Phone Number</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Means of ID </span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> State</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> LGA</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> City</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <CardHeader className="text-2xl font-semibold">
          Shareholdefr information
        </CardHeader>

        <div className="text-light-black space-y-4 mt-4 text-lg font-normal">
          <div className="flex justify-between">
            <span> Surname</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>First Name</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Other Name </span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Email Address</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Phone Number</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> Means of ID </span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> State</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> LGA</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span> City</span>
            <div className="flex gap-2 items-center">
              Null{" "}
              <span>
                {" "}
                <Copy size={15} />{" "}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
