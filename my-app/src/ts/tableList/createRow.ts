import { el, svg } from "redom"; 
import { AudioItem } from "./typesTracks";
import { formatTime } from "../../../utils/formatTime";
import { getFavorites } from "./favoritesTrack";
import { toggleFavorite } from "./toggleFavorite";
import { player } from "../player/player";
import { getRelativeTime } from "../../../utils/formatDate"; 
import { setupTooltip, tooltipContent } from "../tippy";


import spritePath from "../../../images/sprite.svg"; 
import defaultIconPath from "../../../images/img-audio/track-icon.png";
import placeholderPath from "../../../images/img-audio/placeholder.png";

export function createRow(
  item: AudioItem,
  index: number,
  currentList: AudioItem[],
) {
  const heartIcon = svg(
    "svg",
    { class: "fav-btn__icon", width: "24", height: "24" },
    svg("use", { href: `${spritePath}#heart` }),
  );

  const pointsIcon = svg(
    "svg",
    { class: "tooltip__btn-icon", width: "24", height: "24" },
    svg("use", { href: `${spritePath}#points-desktop` }),
  );

  const favorites = getFavorites();
  const itemKey = `${item.type}-${item.id}`;
  const isFavorite = favorites.includes(itemKey);

  const favBtn = el(
    "button",
    {
      className: isFavorite ? "fav-btn active" : "fav-btn",
      onclick: async (e: Event) => {
        e.stopPropagation();
        const wasFavorite = favBtn.classList.contains("active");
        const success = await toggleFavorite(item.id, item.type, wasFavorite);
        if (success) {
          favBtn.classList.toggle("active");
        }
      },
    },
    [heartIcon],
  );

  // Синхронизация лайков с футером
  const handleFavoriteUpdate = (e: any) => {
    const { id, type, isFavorite: newStatus } = e.detail;
    if (id === item.id && type === item.type) {
      favBtn.classList.toggle("active", newStatus);
    }
  };

  window.addEventListener("favoriteUpdate", handleFavoriteUpdate);

  const dateAdded = item.createdAt
    ? getRelativeTime(item.createdAt)
    : "Неизвестно";

  const author = (item.type === "track" ? item.artist : item.host) || "Unknown";

  // Динамический путь для картинок артистов
  const trackImg =
    item.type === "track"
      ? `./images/img-audio/${item.artist.toLowerCase().replace(/\s+/g, "-")}.png`
      : placeholderPath;

  const moreBtn = el(
    "button.tippy__btn",
    {
      onclick: (e: Event) => e.stopPropagation(),
    },
    [pointsIcon],
  );

  const tooltipCont = tooltipContent(item.title, author);
  setupTooltip(moreBtn, tooltipCont);

  const row = el(
    "tr.track-row",
    {
      "data-id": item.id,
      onclick: () => {
        player.playTrack(index, currentList);
      },
    },
    [
      el("td.track-row__num", index + 1),
      el("td.track-row__info", [
        el("div.track-wrapper", [
          el("img.track-img", {
            src: trackImg,
            onerror: (e: Event) => {
              const img = e.target as HTMLImageElement;
              img.onerror = null; 
              img.src = defaultIconPath; 
            },
          }),
          el("div.track-text", [
            el("div.track-title", item.title),
            el("div.track-author", author),
          ]),
        ]),
      ]),
      el("td.track-row__album", item.type === "track" ? item.artist : "-"),
      el("td.track-row__date", dateAdded),
      el("td.track-row__heart", favBtn),
      el("td.track-row__actions", formatTime(item.duration)),
      el("td.track-row__more", moreBtn),
    ],
  );

  row.onunmount = () => {
    window.removeEventListener("favoriteUpdate", handleFavoriteUpdate);
  };

  return row;
}
