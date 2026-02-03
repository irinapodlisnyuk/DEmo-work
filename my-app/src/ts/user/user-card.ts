import { el, svg, setChildren } from "redom";
import spritePath from "../../images/sprite.svg";
import userPhoto from '../../images/avatar.png';

export function cardUser() {
  const currentUserName = localStorage.getItem("username") || "Гость";

  const headerCard = document.querySelector(".header__card") as HTMLElement;
  if (!headerCard) return; // Защита от ошибки, если контейнер не найден

  headerCard.classList.add("user-card");
  headerCard.innerHTML = ''; // Очищаем перед рендером, если нужно

  // 1. Создаем иконку закрытия
  const closeIcon = svg("svg", { class: "user-card__icon", width: "24", height: "24" },
    svg("use", { href: `${spritePath}#icon-close` })
  );

  // 2. Описываем структуру в декларативном стиле RE|DOM
  const cardEl = el(".user-card__wrapper", [
    // Хедер карточки
    el(".user-card__heading", [
      el("button.user-card__close", { type: "button" }, [closeIcon]),
      el("h2.user-card__title",  currentUserName),
      el("img.user-card__img", { 
        src: userPhoto, 
        width: "42", 
        height: "42", 
        alt: "User Photo" 
      })
    ]),

    // Основной контент
    el(".user-card__top", [
      el("h3.user-card__error", "Данный раздел находится в разработке. Спасибо за понимание!!!")
    ]),

    // Нижняя часть с кнопками
    el(".user-card__bottom", [
      el("button.user-card__btnRegEl", { type: "button", disabled:true }, "Редактировать профиль"),
      el("button.user-card__exit", { type: "button" }, "Покинуть профиль")
    ])
  ]);

  // 3. Монтируем всё в DOM
  setChildren(headerCard, [cardEl]);
}

