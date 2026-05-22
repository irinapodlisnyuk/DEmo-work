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
      // Формируем строку классов заранее: либо "fav-btn active", либо просто "fav-btn"
      className: isFavorite ? "fav-btn active" : "fav-btn",
      onclick: async (e: Event) => {
        e.stopPropagation();

        const wasFavorite = favBtn.classList.contains("active");
        // Отправляем запрос на сервер
        const success = await toggleFavorite(item.id, item.type, wasFavorite);
        if (success) {
          // classList.toggle работает с ОДНИМ словом, поэтому тут ошибки не будет
          favBtn.classList.toggle("active");
        }
      },
    },
    [heartIcon],
  );

  // Получаем дату из объекта (или ставим текущую, если её нет в API)
  const dateAdded = item.createdAt
    ? getRelativeTime(item.createdAt)
    : "Неизвестно";

  const author = (item.type === "track" ? item.artist : item.host) || "Unknown";

  const trackImg =
    item.type === "track"
      ? `../../../images/img-audio/${item.artist.toLowerCase().replace(/\s+/g, "-")}.png`
      : "../../../images/img-audio/placeholder.png";

  const moreBtn = el(
    "button.tippy__btn",
    {
      onclick: (e: Event) => e.stopPropagation(), // Чтобы не запускался плеер
    },
    [pointsIcon],
  );
    // Генерируем контент
  const tooltipCont = tooltipContent (item.title, author);

  //  Инициализируем тултип через наш модуль
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
            onerror: (e: Event) =>
              ((e.target as HTMLImageElement).src =
                "./images/img-audio/track-icon.png"),
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
  return row;
}
