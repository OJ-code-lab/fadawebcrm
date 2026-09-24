"use client";

import Link from "next/link";

import { Button } from "../ui/button";

// import { Field } from "../ui/field";

import { Input } from "../ui/input";

import PasswordBotton from "../ui/passwordBotton";

import { useState } from "react";

import { Field } from "../ui/field";

import { useRouter } from "next/navigation";

import GoogleButton from "./GoogleButton";

// import { Label } from "../ui/label";

function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string[];

    password?: string[];
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    setGeneralError("");

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,

          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setGeneralError(data.message || "Login failed.");
        }

        return;
      }

      const user = data.data.login.user;

      if (!user.email_verified) {
        router.push(
          `/auth/verify-email?email=${encodeURIComponent(user.email)}`,
        );

        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setGeneralError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="  max-w-350 mx-auto my-4 grid grid-cols-1 place-items-center lg:grid-cols-2 gap-16 w-full">
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

      <div className=" h-screen w-full mx-auto bg-transparent flex flex-col justify-center items-center gap-2.5 p-4 lg:w-full lg:min-h-0 space-y-4">
        <h2 className="font-medium text-3xl lg:text-4xl text-black">
          Your business starts here.
        </h2>

        <GoogleButton label="Sign in with Google" />

        <p className=" font-medium text-base text-center ">Or</p>

        <div className="w-full">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-2.5 space-y-3">
              <Field>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="border-light-black/50 rounded-lg"
                />

                {errors.email?.[0] && (
                  <p className="text-red-500">{errors.email[0]}</p>
                )}
              </Field>

              <Field>
                <PasswordBotton
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {errors.password?.[0] && (
                  <p className="text-red-500">{errors.password[0]}</p>
                )}
              </Field>

              {generalError && <p className="text-red-500">{generalError}</p>}
            </div>

            <div className="w-full my-5">
              <Button
                className="w-full rounded-4xl bg-gray-400  text-white hover:bg-blue-card"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>

            <div className="font-normal text-base text-gray-500 text-center">
              <p>
                Don&apos;t have an account?{" "}
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
