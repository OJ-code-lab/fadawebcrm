"use client";

import { changeUserPassword } from "@/src/actions/complete-companyReg";
import { Button } from "@base-ui/react";
import { Eye, EyeOff } from "lucide-react";

import { useState, useTransition } from "react";

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Client-side Validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("New password and confirm password do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("New password must be at least 6 characters long.");
      return;
    }
    startTransition(async () => {
      const res = await changeUserPassword(formData);

      if (res.success) {
        setSuccessMsg("Password changed successfully!");
        setFormData({
          currentPassword: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setErrorMsg(res.error || "Failed to change password.");
      }
    });
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {errorMsg}
            </p>
          )}

          {successMsg && (
            <p className="text-sm text-green-700 bg-green-50 p-3 rounded-md border border-green-200">
              {successMsg}
            </p>
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="mt-0 bg-gray-100 focus:outline-none focus:border-none "
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 inset-y-0 flex items-center text-[#9CA3AF]"
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="mt-0 bg-gray-100 focus:outline-none focus:border-none"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 inset-y-0 flex items-center text-[#9CA3AF]"
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-0 bg-gray-100 focus:outline-none focus:border-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 inset-y-0 flex items-center text-[#9CA3AF]"
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>

          <p className="font-medium text-sm text-light-black">
            At least up to 8 characters
          </p>

          <Button
            type="submit"
            className="bg-blue-card text-white font-medium text-sm w-full py-3 rounded-3xl hover:bg-blue-800 "
            disabled={isPending}
          >
            {" "}
            {isPending ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
