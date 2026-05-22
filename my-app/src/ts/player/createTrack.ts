import { el, svg } from "redom";
import { player } from "./player"; 
import { AudioItem } from "../tableList/typesTracks";
import spritePath from "../../images/sprite.svg";
import { getFavorites } from "../tableList/favoritesTrack";
import { toggleFavorite } from "../tableList/toggleFavorite";

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

  // Выносим обработчик в отдельную переменную для последующего удаления
  const handleFavoriteUpdate = (e: any) => {
    const { id, type, isFavorite: newStatus } = e.detail;
    if (id === item.id && type === item.type) {
      favBtn.classList.toggle("active", newStatus);
    }
  };

  window.addEventListener("favoriteUpdate", handleFavoriteUpdate);

  const trackImg =
    item.type === "track"
      ? `../../images/img-audio/${item.artist.toLowerCase().replace(/\s+/g, "-")}.png`
      : "../../images/img-audio/placeholder.png";

  const author = (item.type === "track" ? item.artist : item.host) || "Unknown";

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
          img.onerror = null; // Стоп бесконечного цикла 404
          img.src = "../../images/img-audio/track-icon.png";
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

  return infoTrack;
}