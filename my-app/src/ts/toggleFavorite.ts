import {loadTracks } from "./loadTracks"

export async function toggleFavorite(id: number, type: 'track' | 'podcast', isFavorite: boolean | undefined) {
  const token = localStorage.getItem("token");
  // Если уже в избранном — удаляем (DELETE), иначе добавляем (POST)
  const method = isFavorite ? "DELETE" : "POST";

  try {
    const response = await fetch("http://localhost:8000/api/favorites", {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ 
        trackId: id, 
        type: type 
      })
    });

    if (response.ok) {
      // После успешного изменения — перерисовываем список, чтобы обновить сердечки
      const result = await response.json();
      console.log(result.message);
      loadTracks(); 
    } else {
      alert("Ошибка при обновлении избранного");
    }
  } catch (error) {
    console.error("Сетевая ошибка:", error);
  }
}