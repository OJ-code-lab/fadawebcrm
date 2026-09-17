"use client";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { ArrowRightFromLine, Flag } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Country = {
  id: string;
  country: string;
  code: string;
  // base_price: {
  //   amount: string;
  //   currency: string;
  //   symbol: string;
  //   formatted: string;
  // };
  // price: {
  //   amount: number;
  //   currency: string;
  //   symbol: string;
  //   formatted: string;
  //   exchange_rate: number;
  // };
  // order_price: number;
  // order_currency: string;
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
        console.log(info);
        // console.log("Country API Info error:", info);
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

    if (country.code === "NGN") {
      router.push(`/nigeria?countryId=${country.id}`);
    }

    if (country.code === "US") {
      router.push(`/usa?countryId=${country.id}`);
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
                className={`flex items-center gap-3 w-full p-4 rounded-3xl cursor-pointer transition-all border-2 ${
                  selectedCountry === country.id ? "bg-green-500" : ""
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

                <span>
                  <Flag />
                </span>
                <span className="text-black">{country.country}</span>
              </label>
            </div>
          ))}
        </div>

        <div>
          <Button
            onClick={handleNext}
            className="bg-blue-card text-white hover:bg-blue-900"
          >
            Next{" "}
            <span>
              <ArrowRightFromLine />
              {/* <ArrowRightFromLine /> */}
            </span>
          </Button>
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

export default Countries;
