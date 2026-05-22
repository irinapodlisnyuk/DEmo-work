import { el, svg } from "redom";
import { player } from "./player"; // Путь к вашему плееру
import { AudioItem } from "../tableList/typesTracks";
import spritePath from "../../images/sprite.svg";
import { getFavorites } from "../tableList/favoritesTrack";
import { toggleFavorite } from "../tableList/toggleFavorite";
import defaultIconPath from "../images/img-audio/placeholder.png";

export function createTrack(
  item: AudioItem,
  index: number,
  currentList: AudioItem[],
) {
  // 1. Иконка сердца
  const heartIcon = svg(
    "svg",
    { class: "footer__heart-icon", width: "24", height: "24" },
    svg("use", { href: `${spritePath}#heart` }),
  );

  const favorites = getFavorites();
  const itemKey: string = `${item.type}-${item.id}`;
  const isFavorite = favorites.includes(itemKey);

  const favBtn = el("button.footer__heart-btn", {
    className: isFavorite ? "footer__heart-btn active" : "footer__heart-btn",
    onclick: async (e: Event) => {
       e.stopPropagation();
       const currentlyActive = favBtn.classList.contains("active");
       await toggleFavorite(item.id, item.type, currentlyActive);
    }
  }, [heartIcon]);

    // СЛУШАЕМ ОБНОВЛЕНИЯ ИЗ ТАБЛИЦЫ
  window.addEventListener("favoriteUpdate", (e: any) => {
    const { id, type, isFavorite: newStatus } = e.detail;
    // Если ID и Тип совпадают с треком, который сейчас рисуется в футере
    if (id === item.id && type === item.type) {
      favBtn.classList.toggle("active", newStatus);
    }
  });

  const trackImg =
    item.type === "track"
      ? `../../images/img-audio/${item.artist.toLowerCase().replace(/\s+/g, "-")}.png`
      : "../../images/img-audio/placeholder.png";

  // 2. Логика автора и обложки
  const author = (item.type === "track" ? item.artist : item.host) || "Unknown";

  // 3. Собираем основной контейнер (footer__wrapper)
  const infoTrack = el(
    "div.footer__wrapper",
    {
      onclick: () => player.playTrack(index, currentList),
    },
    [
      // Обложка

      el("img.footer__wrapper-img", {
        src: trackImg,
        onerror: (e: Event) => {
          const img = e.target as HTMLImageElement;
          // Предотвращаем бесконечный цикл, если даже заглушка пропадет
          img.onerror = null; 
          img.src = defaultIconPath;
        },
      }),
      // Инфо-блок
      el("div.footer__info", [
        el("div.footer__top", [
          el("p.footer__top-title", item.title),
          favBtn,
        ]),
        el("span.footer__info-text", author),
      ]),
    ],
  );

  return infoTrack;
}
