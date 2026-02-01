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
// export function renderPagination(
//   total: number, // количесиво треков
//   limit: number,
//   current: number,
//   onChange: (page: number) => void,
// ) {
//   console.log("Total:", total, "Limit:", limit);
//   const pagContainer = document.querySelector(
//     ".catalog__pagination",
//   ) as HTMLElement;
//   // if (!pagContainer ) return;
//   if (!pagContainer) {
//     console.error(
//       "КРИТИЧЕСКАЯ ОШИБКА: .catalog__pagination отсутствует в HTML!",
//     );
//     return;
//   }

//   const totalPages = Math.ceil(total / limit);
//   const buttons = [];

//   for (let i = 1; i <= totalPages; i++) {
//     // Создаем кнопку через RE-DOM
//     const btnPage = el(
//       "button.catalog__pagination-btn",
//       {
//         className:
//           i === current
//             ? "catalog__pagination-btn active"
//             : "catalog__pagination-btn",
//         onclick: () => onChange(i),
//       },
//       i.toString(), // Убеждаемся, что это строка текста
//     );

//     // Добавляем инлайн-стиль для активной кнопки, как в вашем примере
//     if (i === current) {
//       btnPage.style.color = "#11253d";
//     }

//     buttons.push(btnPage);
//   }

//   // RE-DOM очистит контейнер и вставит новые кнопки автоматически
//   setChildren(pagContainer, buttons);
// }
