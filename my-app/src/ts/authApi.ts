// export async function sendAuthRequest(url: string, data: object) {
//   const response = await fetch(`http://localhost:8000${url}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return { ok: response.ok, status: response.status, data: await response.json() };
// }

export async function sendAuthRequest(url: string, data: object) {
  // Жёстко прописываем адрес вашего живого сервера на Render
  const BASE_URL = "https://vibecast-studio-2uiq.onrender.com";

  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return { ok: response.ok, status: response.status, data: await response.json() };
}