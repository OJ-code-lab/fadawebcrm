import { Card, CardHeader } from "@/components/ui/card";
import { UsersRound } from "lucide-react";
import Link from "next/link";
// import { Link } from "lucide-react";

function generalSettingsPage() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div>
        <Card className="py-6 px-8 border bg-transparent border-gray-100">
          <div>
            <CardHeader className="font-bold text-2xl text-gray-600">
              General settings
            </CardHeader>
            <p className="font-medium text-base text-light-black">
              Update your profile and how people can contact you generally
            </p>
          </div>
          <hr className="border-gray-200 my-4" />

          <div className=" space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-bold text-xl text-gray-600">
                Profile details
              </h5>
              <Link href="/" className="text-blue-600 text-base font-medium">
                Edit
              </Link>
            </div>
            <div>
              <form action="" className="space-y-4">
                <div className="flex gap-4">
                  <div>
                    <label
                      htmlFor=""
                      className="font-medium text-base text-gray-600 capitalize "
                    >
                      First name
                    </label>
                    <input type="text" placeholder="Keliven" />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="font-medium text-base text-gray-600 capitalize "
                    >
                      Last name
                    </label>
                    <input type="text" placeholder="Tech" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="font-medium text-base text-gray-600 capitalize "
                  >
                    Email Address
                  </label>
                  <input type="email" placeholder="example@example.com" />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="font-medium text-base text-gray-600 capitalize "
                  >
                    Date of birth
                  </label>
                  <input type="date" placeholder="12/27/1998" />
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>

      <div className=" lg:flex-1">
        <Card className="py-6 px-8 border bg-transparent border-gray-100">
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

export default generalSettingsPage;
