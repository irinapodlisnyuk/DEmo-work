import { getLoaderEl } from "./loader";

/**
 * Функция navigate для переключения экранов.
 * @param cardName - название страницы (строка), а не HTMLElement.
 */
export async function navigate(cardName?: string) {
  const appEl = document.getElementById("app") as HTMLElement;

  // Очищаем контейнер и добавляем лоадер
  appEl.innerHTML = "";
  const loaderEl = getLoaderEl();
  appEl.append(loaderEl);

  try {
    switch (cardName) {
      case "login": {
        // При динамическом импорте .default содержит экспорт по умолчанию
        const { default: createLoginCard } = await import("./createLoginCard");
        createLoginCard(appEl);
        break;
      }

      case "reg": {
        const { default: createRegCard } = await import("./createRegCard");
        createRegCard(appEl);
        break;
      }

      default: {
        const { default: createHomeCard } = await import("./createHomeCard");
        createHomeCard(appEl);
      }
    }
  } catch (error) {
    console.error("Ошибка при загрузке страницы:", error);
  } finally {

    loaderEl.remove();
  }
}
