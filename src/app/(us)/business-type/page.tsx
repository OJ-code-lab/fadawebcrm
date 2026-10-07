import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface BusinessTypePageProps {
  searchParams: Promise<{ countryId?: string }>;
}

async function BusinessTypePage({ searchParams }: BusinessTypePageProps) {
  const { countryId } = await searchParams;
  const us = countryId
    ? `/register-business?${encodeURIComponent(countryId)}`
    : "/register-business";

  return (
    <div className=" grid place-items-center h-screen">
      <Card className=" border border-gray-200/60 w-full max-w-2xl mx-4 px-6 py-8.5 bg-transparent  text-center sm:mx-6">
        <h4 className="font-medium text-4xl text-black">
          Where do you want to register your business
        </h4>
        <p className="font-light text-base text-light-black">
          {" "}
          Select business type.
        </p>

        <div className="flex flex-col space-y-4 mt-6">
          <Link href={us}>
            <Button className="w-full bg-gray-200 text-black text-base font-normal rounded-4xl p-6 hover:bg-blue-900 hover:text-white  transition ">
              New business
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button className=" w-full bg-gray-200 text-black text-base font-normal rounded-4xl p-6 hover:bg-blue-900 hover:text-white  transition">
              Old business
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default BusinessTypePage;
