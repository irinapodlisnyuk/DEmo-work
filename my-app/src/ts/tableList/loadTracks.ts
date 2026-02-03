import ResizeObserver from "resize-observer-polyfill";
import "../scss/blocks/_scrollbar.scss";
import "simplebar/dist/simplebar.css";

window.ResizeObserver = ResizeObserver;

import { getAllAudio } from "./getAllAudio";
import { setChildren, mount} from "redom";
import { renderPagination } from "./renderPagination";
import { createRow } from "./createRow";
import { initSorting } from "./sorting";
import { state } from "./state";

const itemsPerPage = 4;
export async function loadTracks() {

  if (state.allTracks.length === 0) {
    const data = await getAllAudio();
    state.allTracks = data; // ПРОВЕРЬ: записываешь ли ты данные в стейт?
    console.log("Данные в стейте:", state.allTracks);

    initSorting(
      () => state.allTracks,
      (newTracks) => { state.allTracks = newTracks; },
      () => loadTracks()
    );
  }

  // 2. Получаем актуальные фильтры
  const isFavActive = (document.getElementById("radio-favorites") as HTMLInputElement)?.checked;
  const favIds = JSON.parse(localStorage.getItem("favorite_tracks") || "[]");

  // КЛЮЧЕВОЙ МОМЕНТ: displayTracks всегда должен вычисляться заново
 const displayTracks = isFavActive
  ? state.allTracks.filter((t) => {
      const currentKey = `${t.type}-${t.id}`;
      return favIds.some((favId: string) => String(favId) === String(currentKey));
    })
  : [...state.allTracks];

console.log("Отображаем треков:", displayTracks.length);
  const container = document.getElementById("tracks-tbody") as HTMLElement;
  if (!container) return;

  // 3. Вспомогательная функция (должна быть тут, чтобы видеть displayTracks)
  const renderBatch = (page: number, append = false) => {
    const start = (page - 1) * itemsPerPage;
    const batch = displayTracks.slice(start, start + itemsPerPage);
    const rows = batch.map((item, index) => createRow(item, start + index));

    if (append) {
      rows.forEach((row) => mount(container, row));
    } else {
      setChildren(container, rows);
    }
    return rows[rows.length - 1];
  };

  // 4. Отрисовка
  function renderUI() {
    const pagContainer = document.querySelector(".catalog__pagination") as HTMLElement;
    const scrollWrapper = document.querySelector(".tracks-scroll") as HTMLElement;
    const isDesktop = window.innerWidth > 1023;

    container.innerHTML = ""; // Очистка один раз в начале

    // Проверка на пустоту
    if (displayTracks.length === 0) {
      const message = isFavActive ? "У вас пока нет избранных треков" : "Список треков пуст";
      container.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px;">${message}</td></tr>`;
      if (pagContainer) pagContainer.style.display = "none";
      return; 
    }

    if (!isDesktop) {
      // МОБИЛКА
      if (pagContainer) pagContainer.style.display = "none";
      const initLazyLoad = (page: number) => {
        const lastRowEl = renderBatch(page, page > 1);
        if (lastRowEl && page * itemsPerPage < displayTracks.length) {
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              observer.unobserve(lastRowEl);
              initLazyLoad(page + 1);
            }
          }, { root: scrollWrapper, rootMargin: "0px 0px 120px 0px", threshold: 0.1 });
          observer.observe(lastRowEl);
        }
      };
      initLazyLoad(1);
    } else {
      // ДЕСКТОП
      if (pagContainer) pagContainer.style.display = "flex";
      const renderDesktopPage = (page: number) => {
        renderBatch(page, false);
        renderPagination(displayTracks.length, itemsPerPage, page, (newPage) => {
          renderDesktopPage(newPage);
          scrollWrapper.scrollTo({ top: 0, behavior: "smooth" });
        });
      };
      renderDesktopPage(1);
    }
  }
  renderUI();
}
