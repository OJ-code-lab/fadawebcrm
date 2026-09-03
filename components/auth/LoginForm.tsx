// import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
// import { Field } from "../ui/field";
import { Input } from "../ui/input";
import PasswordBotton from "../ui/passwordBotton";
// import { Label } from "../ui/label";

function LoginForm() {
  return (
    <div className="  max-w-7xl mx-auto my-4 grid grid-cols-1 place-items-center lg:grid-cols-2 gap-8 w-full">
      <div className="w-full relative hidden lg:block bg-[url('/img/auth.jpg')] bg-cover bg-center  h-screen rounded-4xl p-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative z-10 flex flex-col top-80">
          <h1 className="font-bold text-5xl text-white">
            Create your account.
            <br /> Build your business.
          </h1>
          <p className="font-medium text-lg  text-white pt-4">
            Create an account to start your business registration, manage your
            application, upload documents, and track your progress from one
            place.
          </p>
        </div>
      </div>

      <div className=" h-screen w-full mx-auto bg-transparent flex flex-col justify-center items-center gap-2.5 p-4 lg:w-full lg:min-h-0">
        <h2 className="font-medium text-3xl lg:text-4xl text-black mb-2">
          Your business starts here.
        </h2>
        <p className="bg-gray-200 p-3 text-center w-full rounded-4xl ">
          sign up with Google
        </p>
        <p className=" font-medium text-base text-center ">Or</p>
        <div className="w-full">
          <form className="w-full">
            <div className="w-full flex flex-col gap-2.5">
              <Input
                type="email"
                placeholder="Email"
                className="border-light-black/50 rounded-lg"
              />

              <PasswordBotton placeholder="Password" />

              <p className="text-red-500 text-sm  my-2.5">
                At least up to 8 characters
              </p>
            </div>

            <div className="w-full my-5">
              <Button className="w-full rounded-4xl bg-gray-400  text-white hover:bg-blue-card hover:text-black">
                Sign Up
              </Button>
            </div>
            <div className="font-normal text-base text-gray-500 text-center">
              <p>
                Already have an account?{" "}
                <span>
                  <Link href="/auth/sign-up" className="text-blue-600">
                    {" "}
                    Sign Up
                  </Link>
                </span>
              </p>
              <p>
                <span>
                  <Link href="/auth/forgotPassword" className="text-blue-600">
                    {" "}
                    Forgot Password
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
