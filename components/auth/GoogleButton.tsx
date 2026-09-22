"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function GoogleButton({ label }: { label: string }) {
  const router = useRouter();

  function handleClick() {
    router.push("/api/auth/google");
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full rounded-4xl"
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}

export default GoogleButton;
