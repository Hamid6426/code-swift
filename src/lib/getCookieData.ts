export function getCookieData(): string | null {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="));

  if (!cookie) return null;

  const token = cookie.split("=")[1];
  if (!token) return null;

  try {
    // decode JWT without verifying (just to get name/email)
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.name ?? null;
  } catch {
    return null;
  }
}
