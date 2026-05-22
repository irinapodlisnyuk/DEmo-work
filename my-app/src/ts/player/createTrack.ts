import { el, svg } from "redom";
import { player } from "./player";
import { AudioItem } from "../tableList/typesTracks";
import { getFavorites } from "../tableList/favoritesTrack";
import { toggleFavorite } from "../tableList/toggleFavorite";

// Импортируем ассеты (3 уровня вверх: player -> ts -> ts/.. -> src/)
import spritePath from "../../../images/sprite.svg";
import defaultIconPath from "../../../images/img-audio/track-icon.png";
import placeholderPath from "../../../images/img-audio/placeholder.png";

export function createTrack(
  item: AudioItem,
  index: number,
  currentList: AudioItem[],
) {
  const heartIcon = svg(
    "svg",
    { class: "footer__heart-icon", width: "24", height: "24" },
    svg("use", { href: `${spritePath}#heart` }),
  );

  const favorites = getFavorites();
  const itemKey = `${item.type}-${item.id}`;
  const isFavorite = favorites.includes(itemKey);

  const favBtn = el("button.footer__heart-btn", {
    className: isFavorite ? "footer__heart-btn active" : "footer__heart-btn",
    onclick: async (e: Event) => {
       e.stopPropagation();
       const currentlyActive = favBtn.classList.contains("active");
       await toggleFavorite(item.id, item.type, currentlyActive);
    }
  }, [heartIcon]);

  const handleFavoriteUpdate = (e: any) => {
    const { id, type, isFavorite: newStatus } = e.detail;
    if (id === item.id && type === item.type) {
      favBtn.classList.toggle("active", newStatus);
    }
  };

  window.addEventListener("favoriteUpdate", handleFavoriteUpdate);

  const author = (item.type === "track" ? item.artist : item.host) || "Unknown";

  // Используем простой относительный путь для картинок артистов. 
  // Если сборщик не сможет его обработать на проде, сработает onerror и подставит железный defaultIconPath
  const trackImg =
    item.type === "track"
      ? `./images/img-audio/${item.artist.toLowerCase().replace(/\s+/g, "-")}.png`
      : placeholderPath;

  const infoTrack = el(
    "div.footer__wrapper",
    {
      onclick: () => player.playTrack(index, currentList),
    },
    [
      el("img.footer__wrapper-img", {
        src: trackImg,
        onerror: (e: Event) => {
          const img = e.target as HTMLImageElement;
          img.onerror = null; // Полноценный стоп бесконечного цикла 404
          img.src = defaultIconPath; // Этот путь собран Webpack/Vite, он 100% сработает
        },
      }),
      el("div.footer__info", [
        el("div.footer__top", [
          el("p.footer__top-title", item.title),
          favBtn,
        ]),
        el("span.footer__info-text", author),
      ]),
    ],
  );

  infoTrack.onunmount = () => {
    window.removeEventListener("favoriteUpdate", handleFavoriteUpdate);
  };

  return infoTrack;
}
