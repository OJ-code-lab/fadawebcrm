// "use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
function ForgotPasswordForm() {
  //   const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="grid place-items-center h-screen mx-6">
      <Card className="w-full max-w-2xl mx-4 px-6 py-8.5 bg-primary text-center sm:mx-6">
        <h4 className="font-medium text-4xl text-black">Forgot Password</h4>
        <p className="font-normal text-base text-black">Rest your password</p>

        <div>
          <form action="">
            <div className="w-full ">
              <Input
                type="email"
                placeholder="Email"
                className="border-light-black/50 rounded-lg my-2.5"
              />
            </div>
            <div className="w-full my-5">
              <Button className="w-full rounded-4xl bg-gray-400  text-white hover:bg-blue-card">
                Sign In
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
      </Card>
    </div>
  );
}

export default ForgotPasswordForm;
