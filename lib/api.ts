const API_URL = process.env.BASE_API_URL;

async function parseResponseData(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      const text = await response.text();
      return text ? { message: text } : { message: "Request failed." };
    }
  }

  const text = await response.text();
  return text ? { message: text } : { message: "Request failed." };
}

export async function apiFetch(endpoint: string, options?: RequestInit) {
  if (!API_URL) {
    throw new Error("BASE_API_URL is not configured.");
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const data = await parseResponseData(response);

    return {
      response,
      data,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown fetch error.";
    throw new Error(message);
  }
}
