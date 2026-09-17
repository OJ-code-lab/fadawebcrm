"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
function ForgotPasswordForm() {
  //   const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string[] }>({});
  // const [generalError, setGeneralError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();
      // console.log("Status:", response.status);
      // console.log("Forget password response:", data);

      if (!response.ok) {
        if (response.status === 400) {
          setErrors({
            email: [data.message],
          });
        } else if (data.errors) {
          setErrors(data.errors);
        }

        return;
      }

      setSuccessMessage(data.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Forget password error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid place-items-center h-screen mx-6">
      <Card className="w-full max-w-2xl mx-4 px-6 py-8.5 bg-primary text-center sm:mx-6">
        <h4 className="font-medium text-4xl text-black">Forgot Password</h4>

        {isSubmitted ? (
          <div className="text-green-500 text-base">
            <h2>Check your email</h2>

            <p>{successMessage}</p>
          </div>
        ) : (
          <div>
            <p className="font-normal text-base text-black">
              Rest your password
            </p>
            <form onSubmit={handleSubmit}>
              <div className="w-full ">
                {errors.email?.[0] && (
                  <p className="text-red-500">{errors.email[0]}</p>
                )}
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="border-light-black/50 rounded-lg my-2.5"
                />
              </div>
              <div className="w-full my-5">
                <Button
                  className="w-full rounded-4xl bg-gray-400  text-white hover:bg-blue-card"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </div>
              <div className="font-normal text-base text-gray-500 text-center">
                <p>
                  Already have an account?{" "}
                  <span>
                    <Link href="/auth/sign-in" className="text-blue-600">
                      {" "}
                      Sign In
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ForgotPasswordForm;
