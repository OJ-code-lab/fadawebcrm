"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, UsersRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SecuritySettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="lg:flex-3/5">
        <Card className="py-6 px-2 lg:px-8 border bg-transparent border-gray-100">
          <div>
            <CardHeader className="font-bold text-2xl text-gray-600">
              My Password
            </CardHeader>
            <p className="font-medium text-base text-light-black">
              Keep your account safe by choosing a secure password.
            </p>
          </div>
          <hr className="border-gray-200 my-4" />
          <div>
            <form action="" className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  className="mt-0 bg-gray-100 focus:outline-none focus:border-none "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 inset-y-0 flex items-center text-[#9CA3AF]"
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="mt-0 bg-gray-100 focus:outline-none focus:border-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 inset-y-0 flex items-center text-[#9CA3AF]"
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  className="mt-0 bg-gray-100 focus:outline-none focus:border-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 inset-y-0 flex items-center text-[#9CA3AF]"
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              <p className="font-medium text-sm text-light-black">
                At least up to 8 characters
              </p>

              <Button className="bg-blue-card text-white font-medium text-sm w-full py-5 rounded-3xl hover:bg-blue-800 ">
                {" "}
                Update Password{" "}
              </Button>
            </form>
          </div>
        </Card>
      </div>
      <div className=" lg:flex-2/5">
        <Card className="py-6 lg:px-8 border bg-transparent border-gray-100">
          <CardHeader className="font-bold text-2xl text-gray-600">
            Help and support
          </CardHeader>
          <div>
            <p className="font-medium text-base text-light-black">
              Looking for info about us?
            </p>
            <Link href="/" className="text-blue-600 text-base font-medium">
              Learn more
            </Link>
          </div>
          <div>
            <h4 className="font-bold text-2xl text-gray-600">
              Need something else?
            </h4>
            <div className="flex gap-2 items-center">
              <span>
                {" "}
                <UsersRound size={15} />
              </span>
              <Link href="/" className="text-blue-600 text-base font-medium">
                Contact support
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
