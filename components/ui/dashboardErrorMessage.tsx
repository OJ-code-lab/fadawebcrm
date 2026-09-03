// import { Button } from "@/components/ui/button";
import GetStartedModal from "@/components/ui/getStartedModal";
import { TriangleAlert } from "lucide-react";

function DashboardErrorMessage() {
  return (
    <div className="bg-red-100/50 py-6 px-8 flex flex-col justify-between items-center gap-6  lg:gap-11.5 rounded-[16px] lg:flex-row ">
      <span className=" text-red-700 h-8 w-8 p-2">
        {" "}
        <TriangleAlert size={28} />{" "}
      </span>

      <p className=" text-sm lg:text-lg  font-normal lg:text-start">
        Please provide your company details to access our services seamlessly,
        whether forming a new company or adding existing information.
      </p>

      <div>
        <GetStartedModal>
          {/* <Button className="transition-all duration-700 ease hover:bg-primary hover:border-none bg-transparent border-black text-sm font-medium rounded-3xl">
            Get started
          </Button> */}
        </GetStartedModal>
      </div>
    </div>
  );
}

export default DashboardErrorMessage;
