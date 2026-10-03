import { Card, CardHeader } from "@/components/ui/card";
import ChangePassword from "@/components/ui/ChangePassword";
import { UsersRound } from "lucide-react";
import Link from "next/link";

export default async function SecuritySettingsPage() {
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
          <ChangePassword />
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
