"use client";

import Image from "next/image";
import { Button } from "../ui/button";

function GoogleButton({ label }: { label: string }) {
  function handleClick() {
    window.location.href = "/api/auth/google";
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full py-2.5 h-14 font-bold border-0 bg-gray-100 "
      onClick={handleClick}
    >
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
    </Button>
  );
}

export default GoogleButton;
