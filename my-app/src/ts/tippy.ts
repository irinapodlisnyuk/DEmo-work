import tippy from "tippy.js";
import { el } from "redom";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

/**
 * Универсальная функция для создания тултипа
 * @param target — элемент-кнопка
 * @param content — RE-DOM элемент или строка
 */
export function setupTooltip(target: HTMLElement, content: HTMLElement) {
  return tippy(target, {
    content: content,
    allowHTML: true,
    interactive: true,
    trigger: "click",
    placement: "left",
    theme: "light",
    // Закрывать при клике по контенту (опционально)
    onClickOutside(instance) {
      instance.hide();
    },
  });
}

export function tooltipContent(title: string, author: string) {
  return el("div.tippy__card", [
    el("p.tippy__card-header", "Краткое описание трека:"),
    el("div.tippy__info", [
      el("span.tippy__info-title", title),
      el("span.tippy__info-author", author),
    ]),
  ]);
}