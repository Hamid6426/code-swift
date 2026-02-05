import { useState, useEffect } from "react";

export function useCookieData(): string | null {
  const [cookieData, setCookieData] = useState<string | null>(null);

  useEffect(() => {
    // Run async to avoid React strict mode warnings
    const getCookie = async () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="));
      if (!cookie) {
        setCookieData(null);
        return;
      }

      const token = cookie.split("=")[1];
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCookieData(payload.name ?? null);
      } catch {
        setCookieData(null);
      }
    };

    getCookie();
  }, []);

  return cookieData;
}
