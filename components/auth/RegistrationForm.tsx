"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PasswordBotton from "../ui/passwordBotton";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { apiFetch } from "@/lib/api";
import { Field } from "../ui/field";

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
  terms_conditions: boolean;
}
interface RegisterErrors {
  [key: string]: string[];
}
function RegistrationForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    terms_conditions: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: [],
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.time("registration");

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.timeEnd("registration");

      if (!response.ok || !data.status) {
        setErrors(data.errors ?? {});
        return;
      }

      router.push(
        `/auth/verify-email?email=${encodeURIComponent(formData.email)}`,
      );
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className=" max-w-7xl mx-auto my-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="relative hidden lg:block bg-[url('/img/auth.jpg')] bg-cover bg-center h-screen rounded-4xl p-10 overflow-hidden">
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

      <div className="bg-transparent h-screen grid place-items-center p-4 ">
        <h2 className="font-medium text-base lg:text-3xl text-black">
          Your business starts here.
        </h2>
        <p className="bg-gray-200 p-2.5 text-center mt-3 w-full rounded-4xl">
          sign up with Google
        </p>
        <p className=" font-medium text-base text-center mt-3">Or</p>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-4 items-center my-2.5">
              <Field>
                <Input
                  name="first_name"
                  onChange={handleChange}
                  value={formData.first_name}
                  placeholder="First name"
                  className="border-light-black/50 rounded-lg"
                />
                {errors.first_name && (
                  <p className="text-sm text-red-500">{errors.first_name[0]}</p>
                )}
              </Field>
              <Field>
                <Input
                  name="last_name"
                  onChange={handleChange}
                  value={formData.last_name}
                  placeholder="Last name"
                  className="border-light-black/50 rounded-lg  "
                />
                {errors.last_name && (
                  <p className="text-sm text-red-500">{errors.last_name[0]}</p>
                )}
              </Field>
            </div>
            <div className="flex flex-col gap-2.5">
              <Field>
                <Input
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                  placeholder="Email"
                  className="border-light-black/50 rounded-lg "
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email[0]}</p>
                )}
              </Field>
              <Field>
                <Input
                  name="phone_number"
                  onChange={handleChange}
                  value={formData.phone_number}
                  type="tel"
                  placeholder="Phone number"
                  className="border-light-black/50 rounded-lg "
                />
                {errors.phone_number && (
                  <p className="text-sm text-red-500">
                    {errors.phone_number[0]}
                  </p>
                )}
              </Field>
              <Field>
                <PasswordBotton
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Password"
                  className="my-2.5"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password[0]}</p>
                )}
              </Field>
              <Field>
                <PasswordBotton
                  name="password_confirmation"
                  onChange={handleChange}
                  value={formData.password_confirmation}
                  placeholder="Confirm Password"
                />
                {errors.password_confirmation && (
                  <p className="text-sm text-red-500">
                    {errors.password_confirmation[0]}
                  </p>
                )}
              </Field>

              {/* <p className="text-red-500 text-sm  ">
                At least up to 8 characters
              </p> */}
            </div>
            <div className="flex items-center gap-4 my-2.5">
              <Field>
                <input
                  name="terms_conditions"
                  onChange={handleChange}
                  checked={formData.terms_conditions}
                  type="checkbox"
                  placeholder=""
                  className="mt-1 h-2.5 w-2.5 shrink-0"
                />
                <Label className="font-medium text-xs sm:text-base text-light-black">
                  By registering you agree with our{" "}
                  <Link href="" className="text-blue-600">
                    Terms and Conditions
                  </Link>{" "}
                </Label>
              </Field>
            </div>
            <div className="w-full my-5">
              <Button
                className="w-full rounded-4xl bg-gray-400  text-white hover:bg-blue-card"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : " Sign Up"}
              </Button>
            </div>
            <div className="font-normal text-base text-gray-500 text-center">
              <p>
                Already have an account?{" "}
                <span>
                  <Link href="/auth/sign-in" className="text-blue-600">
                    {" "}
                    Sign In
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

export default RegistrationForm;
