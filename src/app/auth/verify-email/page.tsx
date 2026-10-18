import VerifyEmail from "@/components/auth/VerifyEmail";
import Link from "next/link";
import React, { Suspense } from "react";

function verifyEmailPage() {
  return (
    <div className=" min-h-dvh">
      <Suspense fallback={<div className="min-h-dvh grid place-items-center">Loading…</div>}>
        <VerifyEmail />
      </Suspense>
      <Link href="/auth/reset-password" className=" text-blue-600">
        Create Password
      </Link>
    </div>
  );
}

export default verifyEmailPage;
