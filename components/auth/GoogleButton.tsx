"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function GoogleButton({ label }: { label: string }) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  function handleClick() {
    if (isRedirecting) return;
    setIsRedirecting(true);
    window.location.href = "/api/auth/google";
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isRedirecting}
      className="w-full py-2.5 h-14 font-bold border-0 bg-gray-100 "
      onClick={handleClick}
    >
      {isRedirecting ? (
        <>
          <Loader2 className="animate-spin" />
          Redirecting...
        </>
      ) : (
        <>
          <span className="px-2 py-3 font-bold text-lg text-gray-800 tracking-wide">
            <Image
              src="/img/Symbol.svg.png"
              alt="google"
              width={20}
              height={20}
              loading="eager"
              className="h-auto max-w-full"
            />
          </span>
          {label}
        </>
      )}
    </Button>
  );
}

export default GoogleButton;
