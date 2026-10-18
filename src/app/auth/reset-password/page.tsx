// import React from "react";

import ResetPassword from "@/components/auth/ResetPassword";
import { Suspense } from "react";

function createPasswordPage() {
  return (
    <div>
      <Suspense fallback={<div className="min-h-dvh grid place-items-center">Loading…</div>}>
        <ResetPassword />
      </Suspense>
    </div>
  );
}

export default createPasswordPage;
