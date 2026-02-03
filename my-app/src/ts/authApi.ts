export async function sendAuthRequest(url: string, data: object) {
  const response = await fetch(`http://localhost:8000${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return { ok: response.ok, status: response.status, data: await response.json() };
}