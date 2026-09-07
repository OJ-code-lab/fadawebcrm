"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import { Field } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface verifyOTP {
  email: string;
  otp: string;
}

function VerifyEmail() {
  const route = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

  const [otpForm, setOtpForm] = useState<verifyOTP>({
    email,
    otp: "",
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const handleChange = (value: string) => {
    // const { name, value } = e.target;

    setOtpForm((prev) => ({
      ...prev,
      otp: value,
    }));

    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpForm),
      });

      const data = await res.json();

      if (!res.ok || !data.status) {
        setError(data.message || "invalid OTP.");
        return;
      }

      route.push("/auth/sign-in");
    } catch (error) {
      console.error("OTP verification error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setResendMessage("");

    try {
      const res = await fetch("/api/auth/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }
      setResendMessage("A new OTP has been sent to your email");
      setTimeLeft(300);
    } catch (error) {
      setResendMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <Card className="w-full max-w-2xl mx-4 px-4 lg:px-6 py-8.5 bg-primary text-center sm:mx-2">
        <CardHeader>
          <CardTitle className="font-bold text-2xl lg:text-3xl">
            Check your email
          </CardTitle>
          <CardDescription className="text-center text-sm lg:text-lg my-4">
            We just sent a code to <b>{email}</b> <br /> Enter the six digits
            code in the small box below.
          </CardDescription>
        </CardHeader>

        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <Field className="w-fit ">
              {/* <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel> */}
              <InputOTP
                id="digits-only"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                name="otp"
                value={otpForm.otp}
                onChange={handleChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              {error && <p className="text-sm text-red-500">{error}</p>}
            </Field>
            <p>
              Did&apos;t get a code?{" "}
              <Button
                className="text-blue-600 m-0 p-0"
                type="button"
                variant="link"
                onClick={handleResend}
                disabled={timeLeft > 0 || isResending}
              >
                {timeLeft > 0
                  ? `Resend code in ${formattedTime}`
                  : "Resend code"}
              </Button>
            </p>
            {resendMessage && (
              <p className="text-sm text-muted-foreground">{resendMessage}</p>
            )}
            <div className="w-full my-1">
              <Button
                className="w-full rounded-4xl bg-gray-400  text-white hover:bg-blue-card "
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "verifying..." : "Continue"}
              </Button>
            </div>
          </form>
        </div>

        <p>
          Don&apos;t have an account?{" "}
          <span>
            <Link href="/auth/sign-up" className="text-blue-600">
              {" "}
              Sign Up
            </Link>
          </span>
        </p>
      </Card>
    </div>
  );
}

export default VerifyEmail;
