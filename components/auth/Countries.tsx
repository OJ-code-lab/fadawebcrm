"use client";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { ArrowRightFromLine } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Country = {
  id: string;
  country: string;
  code: string;
};

function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const router = useRouter();
  useEffect(() => {
    const countries = async () => {
      try {
        const response = await fetch("/api/auth/countries");

        if (!response.ok) {
          throw new Error("could not fetch resource");
        }
        const info = await response.json();

        setCountries(info.data);
      } catch (e) {
        console.log("countries error: ", e);
      }
    };
    countries();
  }, []);
  const handleNext = () => {
    if (!selectedCountry) return;

    const country = countries.find((country) => country.id === selectedCountry);

    if (!country) return;

    //  if (country.code === "NGN") {
    //   router.push(`/business_type?countryId=${country.id}`);
    // }

    if (["NG", "NGN"].includes(country.code)) {
      router.push(`/business_type?countryId=${country.id}`);
    }

    if (country.code === "US") {
      router.push(`/register-business?countryId=${country.id}`);
    }
  };
  return (
    <div className="grid place-items-center h-screen mx-6">
      <Card className="w-full max-w-2xl mx-4 px-6 py-8.5 bg-primary text-center sm:mx-6">
        <h4 className="font-medium text-4xl text-black">
          Where do you want to register your business
        </h4>
        <p className="font-light text-base text-light-black">
          {" "}
          Select the country where you want to establish your business.
        </p>

        <div>
          {countries.map((country) => (
            <div key={country.id} className="my-4">
              <label
                htmlFor={country.id}
                className={`flex justify-center   gap-3 w-full p-4 rounded-3xl cursor-pointer transition-all border ${
                  selectedCountry === country.id
                    ? "bg-blue-card text-white"
                    : ""
                }`}
              >
                <input
                  id={country.id}
                  name="country"
                  type="radio"
                  value={country.id}
                  checked={selectedCountry === country.id}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="sr-only"
                />

                <span className="mx-auto  flex w-35 sm:w-40 items-center gap-3 text-left">
                  {(["NG", "NGN"].includes(country.code) ||
                    country.code === "US") && (
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={
                          ["NG", "NGN"].includes(country.code)
                            ? "/img/Nigeria-flag.jpg"
                            : "/img/us-flag.jpg"
                        }
                        alt={`${country.country} flag`}
                        width={50}
                        height={50}
                        loading="eager"
                        className="h-full w-full object-cover"
                      />
                    </span>
                  )}
                  <span
                    className={`text-black ${
                      selectedCountry === country.id ? "text-white" : ""
                    }`}
                  >
                    {country.country}
                  </span>
                </span>
              </label>
            </div>
          ))}
        </div>

        <div>
          <Button
            onClick={handleNext}
            className="bg-blue-card w-full rounded-3xl py-6 text-white hover:bg-blue-900"
          >
            Next{" "}
            <span>
              <ArrowRightFromLine />
            </span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Countries;
