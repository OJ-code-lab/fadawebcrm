import VerifyEmail from "@/components/auth/VerifyEmail";
import Link from "next/link";
import React from "react";

function verifyEmailPage() {
  return (
    <div className=" min-h-dvh">
      <VerifyEmail />
      <Link href="/auth/createPassword" className=" text-blue-600">
        Create Password
      </Link>
    </div>
  );
}

export default verifyEmailPage;
