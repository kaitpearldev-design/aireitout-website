/** Session token helpers — usable in both Edge and Node runtimes. */

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + "|aire-admin-salt|");
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function generateSessionToken(): Promise<string> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD is not set");
  return hashPassword(pw);
}
