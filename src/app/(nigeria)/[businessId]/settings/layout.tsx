"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, use } from "react";

interface SettingsLayoutProps {
  general_setting: React.ReactNode;
  security_setting: React.ReactNode;
  params: Promise<{ businessId?: string }>;
}

function SettingsContent({
  general_setting,
  security_setting,
  params,
}: SettingsLayoutProps) {
  // Use React's `use()` hook to unwrap promises in Client Components
  const resolvedParams = use(params);
  const businessId = resolvedParams?.businessId;

  const searchParams = useSearchParams();
  const activeTab =
    searchParams.get("tab") === "security_setting"
      ? "security_setting"
      : "general_setting";

  return (
    <div className="lg:p-6">
      <nav className="mb-6 flex gap-6 pb-2 mt-8">
        <Link
          href={
            businessId
              ? `/${businessId}/settings?tab=general_setting`
              : "/settings?tab=general_setting"
          }
          className={`pb-1 ${
            activeTab === "general_setting"
              ? "border-b-2 border-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          General
        </Link>
        <Link
          href={
            businessId
              ? `/${businessId}/settings?tab=security_setting`
              : "/settings?tab=security_setting"
          }
          className={`pb-1 ${
            activeTab === "security_setting"
              ? "border-b-2 border-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Security
        </Link>
      </nav>

      <main>
        {activeTab === "security_setting" ? security_setting : general_setting}
      </main>
    </div>
  );
}

export default function SettingsLayout(props: SettingsLayoutProps) {
  return (
    <Suspense fallback={<main>{props.general_setting}</main>}>
      <SettingsContent {...props} />
    </Suspense>
  );
}
