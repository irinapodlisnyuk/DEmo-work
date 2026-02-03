import { el, setChildren } from "redom";

export function renderPagination(
  total: number,
  limit: number,
  current: number,
  onChange: (page: number) => void,
) {
  const pagContainer = document.querySelector(
    ".catalog__pagination",
  ) as HTMLElement;
  if (!pagContainer) return;

  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) {
    setChildren(pagContainer, []);
    return;
  }

  const buttons: HTMLElement[] = [];
  const range = 1; // Сколько кнопок показывать по бокам от текущей

  for (let i = 1; i <= totalPages; i++) {
    // Логика: всегда показываем первую, последнюю и кнопки вокруг текущей
    if (
      i === 1 ||
      i === totalPages ||
      (i >= current - range && i <= current + range)
    ) {
      const btn = el(
        "button.catalog__pagination-btn",
      {
        className:
          i === current
            ? "catalog__pagination-btn active"
            : "catalog__pagination-btn",
        onclick: () => onChange(i),
      },
        i.toString(),
      );
      buttons.push(btn);
    }
    // Добавляем многоточие, если есть разрыв в числах
    else if (i === current - range - 1 || i === current + range + 1) {
      buttons.push(el("span.pagination-dots", "…"));
    }
  }
  setChildren(pagContainer, buttons);
}
