"use server";

import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";
// import type { CompanyReg } from "@/components/ui/CompleteReg";

export async function completeCompanyReg(
  businessId: string,
  payload: FormData,
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  try {
    const { response, data } = await apiFetch(
      `/business/${businessId}/editNg`,
      {
        method: "PUT",
        headers: {
          "X-API-KEY": process.env.API_KEY || "",
          Authorization: `Bearer ${accessToken}`,
        },
        body: payload,
      },
    );

    if (!response.ok) {
      console.error(
        JSON.stringify(
          {
            error: `Business registration failed (${response.status})`,
            status: response.status,
            statusText: response.statusText,
            body: data,
          },
          null,
          2,
        ),
      );

      return {
        success: false as const,
        error:
          data?.message || "Failed to update business registration details",
        status: response.status,
        body: data,
      };
    }
    return { success: true as const, data };
  } catch (error) {
    console.error("Business update error:", error);
    return {
      success: false as const,
      error: "An unexpected error occurred while updating details.",
    };
  }
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
}

export async function updateUserProfile(profile: UpdateProfilePayload) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const profileUpdate = {
    first_name: profile.firstName,
    last_name: profile.lastName,
    email: profile.email,
  };
  try {
    const { response, data } = await apiFetch("/auth/profile", {
      method: "PUT",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        profileUpdate,
      }),
    });

    if (
      !response.ok ||
      data?.error ||
      data?.status === false ||
      data?.success === false
    ) {
      return {
        success: false,
        error:
          data?.message ||
          (typeof data?.error === "string" ? data.error : undefined) ||
          "Failed to update profile",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Profile update error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while updating profile.",
    };
  }
}

export interface ChangePasswordPayload {
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
}

export async function changeUserPassword(password: ChangePasswordPayload) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const changePassword = {
    current_password: password.currentPassword,
    password: password.password,
    password_confirmation: password.confirmPassword,
  };
  try {
    const { response, data } = await apiFetch("/auth/change-password", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changePassword),
    });

    if (
      !response.ok ||
      data?.error ||
      data?.status === false ||
      data?.success === false
    ) {
      const backendError =
        data?.errors ||
        (typeof data?.error === "string" ? data.error : null) ||
        data?.errors?.[0]?.msg || // Common format for express-validator/zod backend responses
        data?.message;

      return {
        success: false,
        error: backendError,
        // error:
        //   data?.message ||
        //   (typeof data?.error === "string" ? data.error : undefined) ||
        //   "Failed to update password.",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while changing your password.",
    };
  }
}
