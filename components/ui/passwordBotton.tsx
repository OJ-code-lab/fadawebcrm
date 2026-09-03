"use client";

import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

type PasswordBottonProps = Omit<
  React.ComponentProps<"input">,
  "type" | "className"
> & {
  className?: string;
};

function PasswordBotton({
  className,
  placeholder = "Current Password",
  ...props
}: PasswordBottonProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={cn(
          "mt-0 w-full bg-gray-100 focus:outline-none focus:border-none border-light-black/50 rounded-lg ",
          className,
        )}
      />
      <button
        type="button"
        aria-label={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 inset-y-0 flex items-center text-[#9CA3AF]"
      >
        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    </div>
  );
}

export default PasswordBotton;
