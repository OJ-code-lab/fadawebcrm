import React from "react";
import { Button } from "../ui/button";
// import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRightFromLine } from "lucide-react";

function BusinessCountry() {
  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <Card className="w-full max-w-2xl mx-4 px-4 lg:px-6 py-8.5 bg-primary text-center sm:mx-2">
        <CardHeader>
          <CardTitle className="font-bold text-2xl lg:text-3xl">
            Where do you want to register your business
          </CardTitle>
          <CardDescription className="text-center text-sm lg:text-lg my-4">
            Select the country where you want to establish your business.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="w-full my-1">
            <Button className="w-full rounded-4xl bg-gray-400  text-white hover:bg-blue-card ">
              NEXT{" "}
              <span>
                <ArrowRightFromLine />
              </span>
            </Button>
          </div>
          {/* <p>
            Don&apos;t have an account?{" "}
            <span>
              <Link href="/auth/sign-up" className="text-blue-600">
                {" "}
                Sign Up
              </Link>
            </span>
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default BusinessCountry;
