// export async function sendAuthRequest(url: string, data: object) {
//   const response = await fetch(`http://localhost:8000${url}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return { ok: response.ok, status: response.status, data: await response.json() };
// }

export async function sendAuthRequest(url: string, data: object) {
  // Указываем TypeScript игнорировать проверку process через (process as any)
  const BASE_URL = (typeof process !== 'undefined' && (process as any).env.NODE_ENV === "production")
    ? "https://onrender.com" 
    : "http://localhost:8000";

  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return { ok: response.ok, status: response.status, data: await response.json() };
}