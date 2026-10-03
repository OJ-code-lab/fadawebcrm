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

  // Fetch initial profile data on the server
  const { data } = await apiFetch("/auth/profile", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-API-KEY": process.env.API_KEY || "",
    },
  });
  const initialProfile = {
    firstName: data.user?.first_name || "",
    lastName: data.user?.last_name || "",
    email: data.user?.email || "",
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
