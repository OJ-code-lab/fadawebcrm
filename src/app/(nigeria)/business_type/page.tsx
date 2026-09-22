import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface BusinessTypePageProps {
  searchParams: Promise<{ countryId?: string }>;
}

async function BusinessTypePage({ searchParams }: BusinessTypePageProps) {
  const { countryId } = await searchParams;
  const nigeriaHref = countryId
    ? `/nigeria?countryId=${encodeURIComponent(countryId)}`
    : "/nigeria";

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

        {/* <div>
          <div className="my-4">
            <label
              htmlFor="business"
              className="flex items-center gap-3 w-full p-4 rounded-3xl cursor-pointer transition-all border-2 ${
                 "
            >
              <input
                id="new business"
                name="country"
                type="radio"
                //   value={country.id}
                //   checked={businessType === country.id}
                //   onChange={(e) => setSelectedCountry(e.target.value)}
                className="sr-only"
              />
              <span>New Business</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="business"
              className="flex items-center gap-3 w-full p-4 rounded-3xl cursor-pointer transition-all border-2 ${
                  "
            >
              <input
                //   id={country.id}
                name="country"
                type="radio"
                //   value={country.id}
                //   checked={businessType === country.id}
                //   onChange={(e) => setSelectedCountry(e.target.value)}
                className="sr-only"
              />
              <span>Old Business</span>
            </label>
          </div>
        </div> */}

        <div className="flex flex-col space-y-4 mt-6">
          <Link href={nigeriaHref}>
            <Button className="w-full bg-gray-200 text-black text-base font-normal rounded-4xl p-6 hover:bg-blue-900 hover:text-white  transition ">
              New business
            </Button>
          </Link>
          <Link href={"/nigeria-dashboard"}>
            <Button className=" w-full bg-gray-200 text-black text-base font-normal rounded-4xl p-6 hover:bg-blue-900 hover:text-white  transition">
              Old business
            </Button>
          </Link>
        </div>

        {/* <div className="space-y-4">
          <label
            htmlFor="c1"
            className="flex items-center gap-3 w-full p-4 rounded-3xl cursor-pointer transition-all border-2 bg-green-500"
          >
            <input id="c1" name="count" type="radio" className=" "></input>
            <span>
              <Flag />
            </span>
          </label>
          <label
            htmlFor="c2"
            className="flex items-center gap-3 w-full p-4 rounded-3xl cursor-pointer transition-all border-2"
          >
            <input id="c2" name="count" type="radio" className=""></input>
            <span>
              <Flag />
            </span>
          </label>
        </div> */}
      </Card>
    </div>
  );
}

export default BusinessTypePage;
