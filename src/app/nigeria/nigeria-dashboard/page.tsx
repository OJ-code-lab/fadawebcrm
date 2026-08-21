import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardErrorMessage from "@/components/ui/dashboardErrorMessage";
import {
  BriefcaseBusinessIcon,
  ChevronRight,
  Dot,
  Download,
  ShieldCheck,
} from "lucide-react";

const documents = [
  { type: "Company Documents", date: "26 March, 2026" },
  { type: "Company Documents", date: "26 March, 2026" },
  { type: "Company Documents", date: "26 March, 2026" },
];

export default function dashboard() {
  return (
    <div className="flex flex-col gap-12 justify-between ">
      {/* erro message */}

      <DashboardErrorMessage />

      {/* user info */}
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-4 gap-8">
        <Card className="min-w-0 py-6 px-8">
          <span className="border rounded-full inline-flex items-center justify-center  mb-6 h-8 w-8">
            {" "}
            <BriefcaseBusinessIcon size={20} />{" "}
          </span>
          <div className="flex flex-col gap-2">
            <p className="text-light-black font-medium text-sm ">
              Business name
            </p>
            <p className="font-semibold text-xl  ">Febtem Business LTD </p>
          </div>
        </Card>
        <Card className="min-w-0 py-6 px-8">
          <span className="border rounded-full inline-flex items-center justify-center  mb-6 h-8 w-8">
            {" "}
            <BriefcaseBusinessIcon size={20} />{" "}
          </span>
          <div className="flex flex-col gap-2">
            <p className="text-light-black font-medium text-sm ">Business ID</p>
            <p className="font-semibold text-xl  ">81056473-10</p>
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
              <span className="text-green-500 mr-1">
                {" "}
                <Dot size={5} />{" "}
              </span>
              Active
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
          <Card className="h-full min-h-66.75">
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
                  <Button className="border-black bg-transparent text-sm font-medium transition-all duration-700 ease-in-out hover:bg-blue-card hover:text-white">
                    {" "}
                    <span>Check our service</span>{" "}
                    <span>
                      {" "}
                      <ChevronRight size={10} />
                    </span>
                  </Button>{" "}
                </div>
              </div>
              <div className="inline-flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-blue-card text-white shadow-inner">
                <ShieldCheck size={54} strokeWidth={1.5} />
              </div>
            </div>
          </Card>
        </div>
        <div className="min-w-0">
          <Card className="h-full min-h-66.75">
            <h6 className="mb-5 text-lg font-semibold text-black">Docs</h6>
            <div className="overflow-hidden text-black text-sm">
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
                  {documents.map((document, index) => (
                    <tr key={index}>
                      <td className="px-3 py-3.5 text-xs font-semibold text-light-black">
                        {document.type}
                      </td>

                      <td className="px-3 py-3.5 text-xs text-gray-400">
                        {document.date}
                      </td>

                      <td className="px-3 py-3.5 text-gray-400">
                        <button
                          type="button"
                          aria-label={`Download ${document.type}`}
                        >
                          <Download size={18} strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
