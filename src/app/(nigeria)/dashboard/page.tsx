// "use client";
// import { BusinessDetailTypes } from "@/components/types/BusinessDetailTypes";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ContinueBusinessReg from "@/components/ui/continueBusinessReg";
import { apiFetch } from "@/lib/api";
import { getActiveBusinessId } from "@/lib/business";
import { getBusinessDetails } from "@/src/app/business-details/businessDetails";
// import { getBusinessDetails } from "@/src/app/api/business-details/route";
import {
  BriefcaseBusinessIcon,
  ChevronRight,
  Dot,
  Download,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
// import { getBusinessDetails} from '@/lib/business-api';

type BusinessDocument = {
  id: string;
  name: string;
  type: string;
  date: string;
};

async function getBusinessDocuments(): Promise<BusinessDocument[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return [];
  }

  try {
    const { data } = await apiFetch("/business/business-documents", {
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.documents)
        ? data.documents
        : Array.isArray(data)
          ? data
          : [];

    return payload.map((item: Record<string, unknown>, index: number) => {
      const id =
        (item.id as string | undefined) ??
        (item.businessDocument as string | undefined) ??
        (item.business_document as string | undefined) ??
        (item.document_id as string | undefined) ??
        String(index + 1);

      const name =
        (item.name as string | undefined) ??
        (item.file_name as string | undefined) ??
        (item.document_name as string | undefined) ??
        (item.title as string | undefined) ??
        `Document ${index + 1}`;

      const type =
        (item.type as string | undefined) ??
        (item.category as string | undefined) ??
        (item.document_type as string | undefined) ??
        "Document";

      const date =
        (item.created_at as string | undefined) ??
        (item.createdAt as string | undefined) ??
        (item.uploaded_at as string | undefined) ??
        (item.date as string | undefined) ??
        "N/A";

      return {
        id: String(id),
        name: String(name),
        type: String(type),
        date: String(date),
      };
    });
  } catch (error) {
    console.error("Error fetching business documents:", error);
    return [];
  }
}

export async function DashboardPageContent({
  businessId,
}: {
  businessId: string;
}) {
  // Fetch business details and documents in parallel on the server
  const [business, documents] = await Promise.all([
    getBusinessDetails(businessId),
    getBusinessDocuments(),
  ]);

  if (!business) {
    notFound();
  }

  // Check if setup is complete (determines if warning banner shows)
  const isSetupIncomplete =
    business.members.length === 0 || !business.entity_type;
  return (
    <div className="h-full min-h-0 flex flex-col justify-between gap-12 overflow-y-auto lg:h-auto lg:overflow-visible">
      <Suspense>
        {isSetupIncomplete && <ContinueBusinessReg businessId={businessId} />}
      </Suspense>

      {/* user info */}
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-4 gap-8">
        <Card className="min-w-0 py-6 px-8">
          <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
            {/* <BriefcaseBusinessIcon size={20} /> */}
            {business.business_country === "united state" ? (
              <Image
                src="/img/us-flag.jpg"
                alt={`${business.business_country} flag`}
                width={50}
                height={50}
                loading="eager"
                className="h-full w-full object-cover border rounded-full"
              />
            ) : (
              <Image
                src="/img/Nigeria-flag.jpg"
                // alt="company logo"
                alt={`${business.business_country} flag`}
                width={50}
                height={50}
                loading="eager"
                className="h-full w-full object-cover border rounded-full"
              />
            )}
          </span>
          <div className="flex flex-col gap-2">
            <p className="text-light-black font-medium text-sm ">
              Business Name
            </p>
            <p className="font-semibold text-xl  ">
              {" "}
              {business.name ?? "Null"}{" "}
            </p>
          </div>
        </Card>
        <Card className="min-w-0 py-6 px-8">
          <span className="border rounded-full inline-flex items-center justify-center  mb-6 h-8 w-8">
            {" "}
            <BriefcaseBusinessIcon size={20} />{" "}
          </span>
          <div className="flex flex-col gap-2">
            <p className="text-light-black font-medium text-sm ">Business ID</p>
            <p className="font-semibold text-xl  ">
              {" "}
              {business.business_number ?? "Null"}{" "}
            </p>
          </div>
        </Card>
        <Card className="min-w-0 py-6 px-8">
          <span className="border rounded-full inline-flex items-center justify-center  mb-6 h-8 w-8">
            {" "}
            <BriefcaseBusinessIcon size={20} />{" "}
          </span>
          <div className="flex flex-col gap-2">
            <p className="text-light-black font-medium text-sm ">
              Service Status
            </p>
            <p className="font-semibold text-xl  ">
              {" "}
              <span className=" inline-flex items-center justify-center mr-1">
                {" "}
                <Dot
                  size={12}
                  className="text-green-500 bg-green-500 rounded-full"
                />{" "}
              </span>{" "}
              <span>{business.status ?? "Null"} </span>
            </p>
          </div>
        </Card>
        <Card className="min-w-0 py-6 px-8">
          <span className="border rounded-full inline-flex items-center justify-center  mb-6 h-8 w-8">
            {" "}
            <BriefcaseBusinessIcon size={20} />{" "}
          </span>
          <div className="flex flex-col gap-2">
            <p className="text-light-black font-medium text-sm ">
              Next Payment in
            </p>
            <p className="font-semibold text-xl  ">21 Mar 2025</p>
          </div>
        </Card>
      </div>

      {/* bottom */}

      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
        <div className="min-w-0">
          <Card className="h-full min-h-66.75 py-6 px-8">
            <span className="mb-8 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-light-black">
              {" "}
              <BriefcaseBusinessIcon size={20} />{" "}
            </span>

            <div className="flex flex-1 items-center justify-between gap-6">
              <div className="flex max-w-68.75 flex-col gap-4">
                <h5 className="text-2xl font-semibold text-black">
                  Have systems that work
                </h5>
                <p className="text-sm font-normal leading-5 text-light-black">
                  Keep expert-reviewed books year-round to track deductions,
                  keep your records organised, and avoid costly cleanup later.
                </p>
                <div>
                  {" "}
                  <Link href="/dashboard/services">
                    <Button className="border-black bg-transparent text-sm font-medium transition-all duration-700 ease-in-out hover:bg-blue-card hover:text-white">
                      <span>Check our service</span>
                      <span>
                        {" "}
                        <ChevronRight size={10} />
                      </span>
                    </Button>{" "}
                  </Link>
                </div>
              </div>

              <div className="hidden lg:inline-flex h-28 w-28 rounded-full ">
                <Image
                  src="/img/Rectangle 9521.png"
                  alt="shileld"
                  width={154}
                  height={156}
                />
              </div>
            </div>
          </Card>
        </div>
        <div className="min-w-0">
          <Card className="h-full min-h-66.75 px-8 py-6">
            <h6 className="mb-5 text-lg font-semibold text-black">Docs</h6>
            <div className="overflow-hidden text-black text-sm">
              {documents.length === 0 ? (
                <div className="mt-8">
                  <div>
                    <Image
                      src="/img/undraw_file-searching_yska.png"
                      alt="A person searching through a folder"
                      width={160}
                      height={120}
                      className="mx-auto h-auto max-w-full"
                    />
                  </div>
                  <div className="mt-4 space-y-4 text-center">
                    <p className="text-xl font-medium text-gray-700">
                      No documents available
                    </p>
                    <p className="text-base font-medium text-light-black">
                      There are no documents available in this category. As
                      documents are added to this section, they will appear
                      here.
                    </p>
                  </div>
                </div>
              ) : (
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-primary">
                      <th className="rounded-l-[8px] px-3 py-3 text-left text-xs font-normal">
                        Type
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-normal">
                        Date
                      </th>
                      <th className="rounded-r-[8px] px-3 py-3 text-left text-xs font-normal">
                        Download
                      </th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {documents.map((document) => (
                      <tr key={document.id}>
                        <td className="px-3 py-3.5 text-xs font-semibold text-light-black">
                          {document.name || document.type}
                        </td>

                        <td className="px-3 py-3.5 text-xs text-gray-400">
                          {document.date}
                        </td>

                        <td className="px-3 py-3.5 text-gray-400">
                          <a
                            href={`/api/v1/business/business-documents/${encodeURIComponent(document.id)}/download`}
                            download
                            aria-label={`Download ${document.name || document.type}`}
                            className="inline-flex"
                          >
                            <Download size={18} strokeWidth={1.5} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const businessId = await getActiveBusinessId();

  if (!businessId) {
    redirect("/business/new");
  }

  return <DashboardPageContent businessId={businessId} />;
}
