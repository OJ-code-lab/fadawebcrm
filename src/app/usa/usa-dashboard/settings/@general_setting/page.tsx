import { Card, CardHeader } from "@/components/ui/card";
import UserProfile from "@/components/ui/UserProfile";
import { apiFetch } from "@/lib/api";
import { UsersRound } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
// import { Link } from "lucide-react";

async function generalSettingsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const { response, data } = await apiFetch("/auth/profile", {
    cache: "no-store",
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  const user = response.ok && data?.user ? data.user : null;
  const initialProfile = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    phoneNumber: user?.phone_number || "",
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className=" lg:flex-3/5">
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

          {!response.ok && (
            <p role="alert" className="text-sm text-red-600">
              {data?.message || "Unable to load your profile. Please try again."}
            </p>
          )}
          <UserProfile initialData={initialProfile} />
        </Card>
      </div>

      <div className=" lg:flex-2/5">
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
