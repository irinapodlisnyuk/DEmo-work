import { el, svg } from "redom";
import { AudioItem } from "./typesTracks";
import { formatTime } from "../utils/formatTime";
import spritePath from "../images/sprite.svg";

export function createRow(item: AudioItem, index: number) {

    const heartIcon = svg(
      "svg",
      { class: "fav-btn__icon", width: "24", height: "24" },
      svg("use", { href: `${spritePath}#heart` }),
    );

    const pointsIcon = svg(
      "svg",
      { class: "more-btn__icon", width: "24", height: "24" },
      svg("use", { href: `${spritePath}#points-desktop` }),
    );

  const author = item.type === "track" ? item.artist : item.host;
  const trackImg = item.type === "track" 
    ? `./images/img-audio/${item.artist.toLowerCase().replace(/\s+/g, "-")}.png` 
    : "./images/img-audio/placeholder.png";

  return el("tr.track-row", [
    el("td.track-row__num", index + 1),
    el("td.track-row__info", [
      el("div.track-wrapper", [
        el("img.track-img", { 
            src: trackImg, 
            onerror: (e: any) => e.target.src = "./images/img-audio/track-icon.png" 
        }),
        el("div.track-text", [
          el("div.track-title", item.title),
          el("div.track-author", author),
        ]),
      ]),
    ]),
    el("td.track-row__album", item.type === "track" ? item.artist : "-"),
    el("td.track-row__date", "2 дня назад"),
    el("td.track-row__heart", [
      el("button.fav-btn", [heartIcon])
    ]),
    el("td.track-row__actions", formatTime(item.duration)),
    el("td.track-row__more", [
      el("button.more-btn", [svg("svg", [pointsIcon])])
    ]),
  ]);
}

// !lkz hf,jns gktthf

// import { el, svg } from "redom";
// import { AudioItem } from "./typesTracks";
// import { formatTime } from "../utils/formatTime";
// import spritePath from "../images/sprite.svg";

// export function createRow(item: AudioItem, index: number) {
//   const author = item.type === "track" ? item.artist : item.host;
//   const trackImg = item.type === "track"
//     ? `./images/img-audio/${item.artist.toLowerCase().replace(/\s+/g, "-")}.png`
//     : "./images/img-audio/placeholder.png";

//   // Создаем строку
//   const row = el("tr.track-row", {
//     style: "cursor: pointer;",
//     // Обработка клика для воспроизведения
//     onclick: () => {
//       console.log(`Играем: ${item.title} (ID: ${item.id})`);
//       // Здесь вызывайте вашу функцию плеера, например:
//       // playTrack(item); 
//     }
//   }, [
//     el("td.track-row__num", index + 1),
//     el("td.track-row__info", [
//       el("div.track-wrapper", [
//         el("img.track-img", {
//           src: trackImg,
//           onerror: (e: any) => (e.target.src = "./images/img-audio/track-icon.png"),
//         }),
//         el("div.track-text", [
//           el("div.track-title", item.title),
//           el("div.track-author", author),
//         ]),
//       ]),
//     ]),
//     el("td.track-row__album", item.type === "track" ? item.artist : "-"),
//     el("td.track-row__date", "2 дня назад"),
//     el("td.track-row__heart", [
//       el("button.fav-btn", { 
//         type: "button",
//         onclick: (e: Event) => {
//           e.stopPropagation(); // Чтобы не срабатывал клик по всей строке (Play)
//           console.log("Добавлено в избранное:", item.id);
//         }
//       }, [
//         svg("svg", { class: "fav-btn__icon", width: "24", height: "24" }, 
//           svg("use", { href: `${spritePath}#heart` })
//         )
//       ]),
//     ]),
//     el("td.track-row__actions", formatTime(item.duration)),
//     el("td.track-row__more", [
//       el("button.more-btn", { 
//         type: "button",
//         onclick: (e: Event) => e.stopPropagation() // Не даем играть трек при нажатии на "Меню"
//       }, [
//         svg("svg", { class: "more-btn__icon", width: "24", height: "24" }, 
//           svg("use", { href: `${spritePath}#points-desktop` })
//         )
//       ]),
//     ]),
//   ]);

//   return row;
// }


// import { formatTime } from "../utils/formatTime";
// import spritePath from "../images/sprite.svg";
// import { getAllAudio } from "./getAllAudio";
// import { el, mount, svg, setChildren } from "redom";
// import { AudioItem } from "./typesTracks";

// export async function createTrackRow() {
//   const items: AudioItem[] = await getAllAudio();
//   const container = document.getElementById("tracks-tbody") as HTMLElement;


//   const elements = items.map((item: AudioItem, index: number) => {
//     const author = item.type === "track" ? item.artist : item.host;
//     const category = item.type === "track" ? "-" : item.category;

//     // 1. Создаем иконку закрытия
//     const heartIcon = svg(
//       "svg",
//       { class: "fav-btn__icon", width: "24", height: "24" },
//       svg("use", { href: `${spritePath}#heart` }),
//     );

//     const pointsIcon = svg(
//       "svg",
//       { class: "more-btn__icon", width: "24", height: "24" },
//       svg("use", { href: `${spritePath}#points-desktop` }),
//     );

//     const trackImg =
//       item.type === "track"
//         ? `../images/img-audio/${item.artist.toLowerCase().replace(/\s+/g, "-")}.png` // динамический путь
//         : "../images/img-audio/placeholder.png"; // заглушка
//     // const trackImg = "../images/img-audio/placeholder.png";
//     return el("tr.track-row", [
//       el("td.track-row__num", index + 1),

//       // 2. Фото, Наименование и Автор (в одном td)
//       el("td.track-row__info", [
//         el("div.track-wrapper", [
//           el("img.track-img", {
//             src: trackImg,
//             alt: item.title,

//             onerror: (e: Event) => {
//               (e.target as HTMLImageElement).src =
//                 "../images/img-audio/track-icon.png";
//             },
//           }),
//           el("div.track-text", [
//             el("div.track-title", item.title),
//             el("div.track-author", author),
//           ]),
//         ]),
//       ]),

//       // 3. Альбом (или категория для подкаста)
//       el("td.track-row__album", item.type === "track" ? item.artist : "-"),

//       // 4. Время добавления (заглушка или дата из данных)
//       el("td.track-row__date", "2 дня назад"),

//       // SVG Избранное
//       el("td.track-row__heart", [
//         el("button.fav-btn", { type: "button" }, [heartIcon], {
//           // className: item.isFavorite ? "active" : "",
//           // onclick: () => toggleFavorite(item.id, item.type, item.isFavorite),
//         }),
//       ]),

//       el("td.track-row__actions", formatTime(item.duration)),

//       el("td.track-row__more", [
//         el("button.more-btn", { type: "button" }, [pointsIcon]),
//       ]),
//     ]);
//   });

//   setChildren(container, elements);
// }


