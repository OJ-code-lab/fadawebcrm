import LoginForm from "@/components/auth/LoginForm";
import { redirectIfUserHasBusiness } from "@/lib/auth";

export default async function Page() {
  await redirectIfUserHasBusiness();

  return <LoginForm />;
}
