import ResizeObserver from "resize-observer-polyfill";
//import SimpleBar from "simplebar";
import "../scss/blocks/_scrollbar.scss";
import "simplebar/dist/simplebar.css";

window.ResizeObserver = ResizeObserver;

import { getAllAudio } from "./getAllAudio";
import { el, setChildren, mount, svg } from "redom";
import { AudioItem } from "./typesTracks";
import { renderPagination } from "./renderPagination";
//import { formatTime } from "../utils/formatTime";
import { createRow } from "./createRow";
//import spritePath from "../images/sprite.svg";

// Состояние приложения
let allTracks: AudioItem[] = [];
const itemsPerPage = 4;

export async function loadTracks() {
  // Загружаем данные только если массив пуст
  if (allTracks.length === 0) {
    allTracks = await getAllAudio();
  }

  const scrollWrapper = document.querySelector(".tracks-scroll") as HTMLElement;
  const container = document.getElementById("tracks-tbody") as HTMLElement;
  const pagContainer = document.querySelector(
    ".catalog__pagination",
  ) as HTMLElement;

  if (!container || !scrollWrapper) return;

  const isDesktop = window.innerWidth > 1023;

  /**
   * Отрисовка порции данных
   * @param page - номер страницы
   * @param append - true (добавить в конец), false (заменить всё)
   */
  const renderBatch = (page: number, append = false) => {
    const start = (page - 1) * itemsPerPage;
    const batch = allTracks.slice(start, start + itemsPerPage);

    // Создаем массив DOM-элементов строк
    const rows = batch.map((item, index) => createRow(item, start + index));

    if (append) {
      // Добавляем строки в конец по одной без использования fragment
      rows.forEach((row) => mount(container, row));
    } else {
      // Полностью обновляем содержимое таблицы
      setChildren(container, rows);
    }

    // Возвращаем последний элемент для IntersectionObserver
    return rows[rows.length - 1];
  };

  // --- 1. РЕЖИМ МОБИЛКИ И ПЛАНШЕТА (Ленивая загрузка) ---
  if (!isDesktop) {
    // Скрываем кнопки пагинации
    if (pagContainer) pagContainer.style.display = "none";
    // Разрешаем нативный скролл или SimpleBar (по желанию)
    scrollWrapper.style.overflowY = "auto";

    let currentPage = 1;

    const initLazyLoad = (page: number) => {
      const lastRowEl = renderBatch(page, page > 1);

      // Если есть данные для следующей страницы, ставим наблюдателя
      if (lastRowEl && page * itemsPerPage < allTracks.length) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              observer.unobserve(lastRowEl); // Перестаем следить за текущим "хвостом"
              initLazyLoad(page + 1); // Подгружаем следующую порцию
            }
          },
          {
            root: scrollWrapper, // Следим внутри контейнера
            rootMargin: "0px 0px -120px 0px",
            threshold: 0.1,
          },
        );
        observer.observe(lastRowEl);
      }
    };

    container.innerHTML = ""; // Очистка перед первым рендером
    initLazyLoad(currentPage);
    return;
  }

  // --- 2. РЕЖИМ ДЕКСТОПА (Пагинация) ---
  const renderDesktopPage = (page: number) => {
    renderBatch(page, false);

    const pagContainer = document.querySelector(
      ".catalog__pagination",
    ) as HTMLElement;
    if (pagContainer) {
    //  pagContainer.style.display = "flex";

      console.log(
        `Всего: ${allTracks.length}, Лимит: ${itemsPerPage}, Стр: ${page}`,
      );

      renderPagination(allTracks.length, itemsPerPage, page, (newPage) => {
        renderDesktopPage(newPage);
        // Скроллим таблицу вверх при переключении страницы
        scrollWrapper.scrollTo({ top: 0, behavior: "smooth" });
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  if (isDesktop) {
    renderDesktopPage(1);
  }
}
// ! первая отрисовка всх файлов
// import ResizeObserver from "resize-observer-polyfill";
// import SimpleBar from "simplebar";
// import "../scss/blocks/_scrollbar.scss";
// import "simplebar/dist/simplebar.css";

// // Фикс для корректной работы в старых браузерах
// window.ResizeObserver = ResizeObserver;

// import { getAllAudio } from "./getAllAudio";
// import { el, mount, svg, setChildren } from "redom";
// import { AudioItem } from "./typesTracks";
// import { renderPagination } from "./renderPagination";
// import { formatTime } from "../utils/formatTime";
// //import { createTrackRow } from "./createTrackRow";
// import spritePath from "../images/sprite.svg";

// export async function loadTracks() {
//   const items: AudioItem[] = await getAllAudio();
//   const scrollWrapper = document.querySelector(".tracks-scroll") as HTMLElement;
//   const container = document.getElementById("tracks-tbody") as HTMLElement;

//   if (!container || !scrollWrapper) {
//     console.error("Контейнер #tracks-tbody не найден");
//     return;
//   }

//   container.innerHTML = "";

//   const elements = items.map((item: AudioItem, index: number) => {
//     const author = item.type === "track" ? item.artist : item.host;
//     const category = item.type === "track" ? "-" : item.category;

//     const itemsPerPage = 8;
//     let currentPage = 1;

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

//   if (scrollWrapper) {
//     if (window.innerWidth <= 767) {
//       // На мобилке включаем
//       new SimpleBar(scrollWrapper, {
//         autoHide: false,
//         forceVisible: "y",
//       });
//     } else {
//       // На десктопе убеждаемся, что стандартный скролл виден, если контента много
//       scrollWrapper.style.overflow = "visible";
//     }
//   }
// }
