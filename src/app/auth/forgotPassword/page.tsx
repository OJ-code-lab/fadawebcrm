import ForgotPasswordForm from "@/components/auth/ForgotPassword";
import Link from "next/link";
import React from "react";

function ForgotPassword() {
  return (
    <div>
      <ForgotPasswordForm />
      <Link href="/auth/verify-email">Verify Email</Link>
    </div>
  );
}

export default ForgotPassword;
