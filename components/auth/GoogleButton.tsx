"use client";

import { Button } from "../ui/button";

function GoogleButton({ label }: { label: string }) {
  function handleClick() {
    window.location.href = "/api/auth/google";
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
