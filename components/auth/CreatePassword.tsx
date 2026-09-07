import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import PasswordBotton from "../ui/passwordBotton";

function CreatePassword() {
  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <Card className="w-full max-w-2xl mx-4 px-4 lg:px-6 py-8.5 bg-primary text-center sm:mx-2">
        <CardHeader>
          <CardTitle className="font-bold text-2xl lg:text-3xl">
            Create Password
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="space-y-4">
            <PasswordBotton placeholder="New password" />
            <PasswordBotton placeholder="Confirm password" />
          </div>
          <p>
            Did&apos;t get a code? <span className="text-blue-600">Resend</span>
          </p>
          <div className="w-full my-1">
            <Button className="w-full rounded-4xl bg-gray-400  text-white hover:bg-blue-card ">
              Continue
            </Button>
          </div>
          <p>
            Don&apos;t have an account?
            <span>
              <Link href="/auth/sign-up" className="text-blue-600">
                Sign Up
              </Link>
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePassword;
