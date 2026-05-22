import { el, svg } from "redom";
import { AudioItem } from "./typesTracks";
import { formatTime } from "../../utils/formatTime";
import spritePath from "../../images/sprite.svg";
import { getFavorites } from "./favoritesTrack";
import { toggleFavorite } from "./toggleFavorite";
import { player } from "../player/player";
import { getRelativeTime } from "../../utils/formatDate";
import { setupTooltip, tooltipContent } from "../tippy";

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
  const itemKey: string = `${item.type}-${item.id}`;
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

  // Синхронизация лайков с футером (чтобы работало в обе стороны)
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

  // 1. АВТОМАТИЧЕСКИ ВЫЧИСЛЯЕМ ИМЯ РЕПОЗИТОРИЯ ДЛЯ GITHUB PAGES
  const isGithub = window.location.hostname.includes("github.io");
  const pathParts = window.location.pathname.split('/');
  const repoName = isGithub && pathParts.length > 1 ? `/${pathParts[1]}` : "";

  // 2. ИСПРАВЛЯЕМ КОРНЕВЫЕ ПУТИ К ОБЛОЖКАМ И ЗАГЛУШКАМ
  const trackImg =
    item.type === "track"
      ? `${repoName}/images/img-audio/${item.artist.toLowerCase().replace(/\s+/g, "-")}.png`
      : `${repoName}/images/img-audio/placeholder.png`;

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
              // 3. ИСПРАВЛЯЕМ ПУТЬ К КАРТИНКЕ ОШИБКИ
              img.src = `${repoName}/images/img-audio/track-icon.png`;
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

  // Очищаем память от слушателя событий при удалении строки
  row.onunmount = () => {
    window.removeEventListener("favoriteUpdate", handleFavoriteUpdate);
  };

  return row;
}

// import { el, svg } from "redom";
// import { AudioItem } from "./typesTracks";
// import { formatTime } from "../../utils/formatTime";
// import spritePath from "../../images/sprite.svg";
// import { getFavorites } from "./favoritesTrack";
// import { toggleFavorite } from "./toggleFavorite";
// import { player } from "../player/player";
// import { getRelativeTime } from "../../utils/formatDate";
// import { setupTooltip, tooltipContent } from "../tippy";

// export function createRow(
//   item: AudioItem,
//   index: number,
//   currentList: AudioItem[],
// ) {
//   const heartIcon = svg(
//     "svg",
//     { class: "fav-btn__icon", width: "24", height: "24" },
//     svg("use", { href: `${spritePath}#heart` }),
//   );

//   const pointsIcon = svg(
//     "svg",
//     { class: "tooltip__btn-icon", width: "24", height: "24" },
//     svg("use", { href: `${spritePath}#points-desktop` }),
//   );

//   const favorites = getFavorites();
//   const itemKey: string = `${item.type}-${item.id}`;
//   const isFavorite = favorites.includes(itemKey);

//   const favBtn = el(
//     "button",
//     {
//       className: isFavorite ? "fav-btn active" : "fav-btn",
//       onclick: async (e: Event) => {
//         e.stopPropagation();
//         const wasFavorite = favBtn.classList.contains("active");
//         const success = await toggleFavorite(item.id, item.type, wasFavorite);
//         if (success) {
//           favBtn.classList.toggle("active");
//         }
//       },
//     },
//     [heartIcon],
//   );

//   const dateAdded = item.createdAt
//     ? getRelativeTime(item.createdAt)
//     : "Неизвестно";

//   const author = (item.type === "track" ? item.artist : item.host) || "Unknown";

//   const trackImg =
//     item.type === "track"
//       ? `../../images/img-audio/${item.artist.toLowerCase().replace(/\s+/g, "-")}.png`
//       : "../../images/img-audio/placeholder.png";

//   const moreBtn = el(
//     "button.tippy__btn",
//     {
//       onclick: (e: Event) => e.stopPropagation(),
//     },
//     [pointsIcon],
//   );

//   // Исправлено форматирование: убран лишний пробел перед скобкой
//   const tooltipCont = tooltipContent(item.title, author);
//   setupTooltip(moreBtn, tooltipCont);

//   const row = el(
//     "tr.track-row",
//     {
//       "data-id": item.id,
//       onclick: () => {
//         player.playTrack(index, currentList);
//       },
//     },
//     [
//       el("td.track-row__num", index + 1),
//       el("td.track-row__info", [
//         el("div.track-wrapper", [
//           el("img.track-img", {
//             src: trackImg,
//             onerror: (e: Event) => {
//               const img = e.target as HTMLImageElement;
//               img.onerror = null; 
//               img.src = "../../images/img-audio/track-icon.png";
//             },
//           }),
//           el("div.track-text", [
//             el("div.track-title", item.title),
//             el("div.track-author", author),
//           ]),
//         ]),
//       ]),
//       el("td.track-row__album", item.type === "track" ? item.artist : "-"),
//       el("td.track-row__date", dateAdded),
//       el("td.track-row__heart", favBtn),
//       el("td.track-row__actions", formatTime(item.duration)),
//       el("td.track-row__more", moreBtn),
//     ],
//   );

//   return row;
// }
