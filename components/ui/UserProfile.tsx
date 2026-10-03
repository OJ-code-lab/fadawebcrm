"use client";
import { updateUserProfile } from "@/src/actions/complete-companyReg";
import React, { useState, useTransition } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

function UserProfile({ initialData }: { initialData: UserProfile }) {
  const [formData, setFormData] = useState<UserProfile>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    startTransition(async () => {
      const res = await updateUserProfile(formData);
      if (res.success) {
        setIsEditing(false);
      } else {
        setErrorMsg(res.error || "Failed to save profile");
      }
    });
  };
  return (
    <div className=" space-y-4">
      <div className="flex justify-between items-center">
        <h5 className="font-bold text-xl text-gray-600">Profile details</h5>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-blue-600 text-base font-medium hover:underline cursor-pointer"
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="text-gray-500 text-sm font-medium hover:underline cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
      {errorMsg && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{errorMsg}</p>
      )}
      <div>
        <form action="" className="space-y-4">
          <div className="flex gap-4">
            <div>
              <label
                htmlFor="FirstName"
                className="font-medium text-base text-gray-600 capitalize "
              >
                First name
              </label>
              <input
                type="text"
                // placeholder="Keliven"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing || isPending}
                className="capitalize w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="font-medium text-base text-gray-600 capitalize "
              >
                Last name
              </label>
              <input
                type="text"
                // placeholder="Tech"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing || isPending}
                className=" capitalize w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="font-medium text-base text-gray-600 capitalize "
            >
              Email Address
            </label>
            <input
              type="email"
              // placeholder="example@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing || isPending}
              className=" capitalize w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed outline-none focus:border-blue-500"
            />
          </div>
          {isEditing && (
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                onClick={handleSubmit}
                className="bg-blue-card text-white px-5 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isPending ? "Saving..." : "Save changes"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
