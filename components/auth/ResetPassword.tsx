"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import PasswordBotton from "../ui/passwordBotton";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{
    password?: string[];
    password_confirmation?: string[];
    token?: string[];
    email?: string[];
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }

        return;
      }

      // Password reset successful
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <Card className="w-full max-w-2xl mx-4 px-4 lg:px-6 py-8.5 bg-primary text-center sm:mx-2">
        <CardHeader>
          <CardTitle className="font-bold text-2xl lg:text-3xl">
            Reset Password
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <PasswordBotton
                  placeholder="New password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password?.[0] && (
                  <p className="text-red-500 text-sm text-left">
                    {errors.password[0]}
                  </p>
                )}
              </div>
              <div>
                <PasswordBotton
                  placeholder="Confirm password"
                  id="password_confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                {errors.password_confirmation?.[0] && (
                  <p className="text-red-500 text-sm text-left">
                    {errors.password_confirmation[0]}
                  </p>
                )}
              </div>
            </div>
            <p>
              Did&apos;t get a code?{" "}
              <span className="text-blue-600">Resend</span>
            </p>
            <div className="w-full my-1">
              <Button
                className="w-full rounded-4xl bg-gray-400  text-white hover:bg-blue-card "
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Reseting password" : " Continue"}
              </Button>
            </div>
          </form>
          <p>
            Don&apos;t have an account?
            <span>
              <Link href="/auth/sign-up" className="text-blue-600">
                Sign Up
              </Link>
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPassword;
