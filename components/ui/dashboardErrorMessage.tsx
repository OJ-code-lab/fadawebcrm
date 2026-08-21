import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

function DashboardErrorMessage() {
  return (
    <div className="bg-red-100/50 py-6 px-8 flex flex-col justify-between items-center gap-6  lg:gap-11.5 rounded-[16px] lg:flex-row ">
      <span className=" text-red-700 h-8 w-8 p-2">
        {" "}
        <TriangleAlert size={28} />{" "}
      </span>

      <p className=" text-sm lg:text-lg  font-normal text-center lg:text-start">
        Please provide your company details to access our services seamlessly,
        whether forming a new company or adding existing information.
      </p>

      <div>
        <Button className=" transition-all duration-700 ease-in-out hover:bg-blue-card hover:text-white">
          {" "}
          Get started{" "}
        </Button>
      </div>
    </div>
  );
}

export default DashboardErrorMessage;
