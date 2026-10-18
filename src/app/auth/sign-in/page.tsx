import LoginForm from "@/components/auth/LoginForm";
import React from "react";

interface SignInPageProps {
  searchParams: Promise<{ error?: string }>;
}

const googleErrorMessages: Record<string, string> = {
  google_failed: "Google sign-in could not be started. Please try again.",
  google_auth_failed: "Google sign-in failed. Please try again.",
  missing_access_token: "Google sign-in did not return an access token.",
  missing_user_data: "Google sign-in did not return your account details.",
  business_lookup_failed:
    "We could not check your business registration. Please try signing in again.",
  server_error: "Something went wrong during Google sign-in. Please try again.",
};

async function SignIn({ searchParams }: SignInPageProps) {
  const { error } = await searchParams;

  return (
    <div>
      <LoginForm googleError={error ? googleErrorMessages[error] : undefined} />
    </div>
  );
}

export default SignIn;
