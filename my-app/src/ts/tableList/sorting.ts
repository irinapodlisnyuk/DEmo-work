import { AudioItem } from "./typesTracks";
import { sortTracks, SortOrder } from "./sortTable";

let currentSortField: keyof AudioItem | null = null;
let currentSortOrder: SortOrder = 1;

export function initSorting(
  getTracks: () => AudioItem[], 
  setTracks: (tracks: AudioItem[]) => void, 
  onSort: () => void
) {
  const headerRow = document.querySelector(".catalog__table-list");
  if (!headerRow) return;

  headerRow.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const th = target.closest("th[data-sort]");
    if (!th) return;

    const field = th.getAttribute("data-sort") as keyof AudioItem;

    if (currentSortField === field) {
      currentSortOrder = (currentSortOrder === 1 ? -1 : 1);
    } else {
      currentSortField = field;
      currentSortOrder = 1;
    }

    const sorted = sortTracks(getTracks(), field, currentSortOrder);
    setTracks(sorted);
    onSort(); // Вызывает renderUI через замыкание в loadTracks
  });
}