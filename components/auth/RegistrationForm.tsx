import Link from "next/link";
import { Button } from "../ui/button";
// import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PasswordBotton from "../ui/passwordBotton";

// export interface FormData{
//     firstName: "",
//     lastName: string;
//     email: string;
//     phoneNumber: string;
//     password: string;
//     confirmPassword: string;
//     termsConditions: boolean;
// }
// const initialFormData: FormData = {
//      firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     termsConditions: false,
// }
function RegistrationForm() {
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
          <form>
            <div className="flex justify-between gap-4 items-center my-2.5">
              <Input
                placeholder="First name"
                className="border-light-black/50 rounded-lg"
              />
              <Input
                placeholder="Last name"
                className="border-light-black/50 rounded-lg  "
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <Input
                type="email"
                placeholder="Email"
                className="border-light-black/50 rounded-lg "
              />
              <Input
                placeholder="Phone number"
                className="border-light-black/50 rounded-lg "
              />
              <PasswordBotton placeholder="Password" className="my-2.5" />
              <PasswordBotton placeholder="Confirm Password" />

              <p className="text-red-500 text-sm  ">
                At least up to 8 characters
              </p>
            </div>
            <div className="flex items-center gap-4 my-2.5">
              <input
                type="checkbox"
                placeholder=""
                className="mt-1 h-2.5 w-2.5 shrink-0"
              />
              <Label className="font-medium text-xs lg:text-base text-light-black">
                By registering you agree with our{" "}
                <Link href="" className="text-blue-600">
                  Terms and Conditions
                </Link>{" "}
              </Label>
            </div>
            <div className="w-full my-5">
              <Button className="w-full rounded-4xl bg-gray-400  text-white hover:bg-blue-card">
                Sign Up
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
