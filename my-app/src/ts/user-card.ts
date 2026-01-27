import { el, svg, setChildren } from "redom";
import spritePath from "../images/sprite.svg";
import userPhoto from '../images/foto-user-dekstop.png';

export function cardUser() {
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
      el("h2.user-card__title", "USER"),
      el("img.user-card__img", { 
        src: userPhoto, 
        width: "25", 
        height: "25", 
        alt: "User Photo" 
      })
    ]),

    // Основной контент
    el(".user-card__top", [
      el("h3.user-card__error", "Данный раздел находится в разработке. Спасибо за понимание!!!")
    ]),

    // Нижняя часть с кнопками
    el(".user-card__bottom", [
      el("button.user-card__buttonRedactionEl", { type: "button" }, "Редактировать профиль"),
      el("button.user-card__exit", { type: "button" }, "Покинуть профиль")
    ])
  ]);

  // 3. Монтируем всё в DOM
  setChildren(headerCard, [cardEl]);
}


// import { el, setAttr, svg, setChildren } from "redom";
// import spritePath from "../images/sprite.svg";
// import userPhoto from '../images/foto-user-dekstop.png';

// export function cardUser() {
//   const headerCard: HTMLElement = document.querySelector(
//     ".header__card",
//   ) as HTMLElement;
//   headerCard.classList.add("user-card");

//   const cardEl = el("div");
//   setAttr(cardEl, {
//     className: "user-card__wrapper",
//   });

//   const headingEl = el("div");
//   setAttr(headingEl, {
//     className: "user-card__heading",
//   });

//   const topEl = el("div");
//   setAttr(topEl, {
//     className: "user-card__top",
//   });

//   const bottomEl = el("div");
//   setAttr(bottomEl, {
//     className: "user-card__bottom",
//   });

//   const hEl = el("h2", "USER");
//   setAttr(hEl, {
//     className: "user-card__title",
//   });

//   const h3El = el(
//     "h3",
//     "Данный раздел находится в разработке. Спасибо за понимание!!!",
//   );
//   setAttr(h3El, {
//     className: "user-card__error",
//   });

//   const buttonEl = el("button", { type: "button" });
//   setAttr(buttonEl, {
//     className: "user-card__close",
//   });

//   const buttonExitEl = el("button", "Покинуть профиль", { type: "button" });
//   setAttr(buttonExitEl, {
//     className: "user-card__exit",
//   });

//   const buttonRedactionEl = el("button", "Редактировать профиль", {
//     type: "button",
//   });
//   setAttr(buttonRedactionEl, {
//     className: "user-card__buttonRedactionEl",
//   });

// const closeId = 'icon-close';
//   const svgEl = svg("svg", 
//   { 
//     class: "close-icon", 
//     width: "24", 
//     height: "24" 
//   },
//   svg("use", { 
//     href: `${spritePath}#${closeId}` // Вставляем путь из переменной
//   })
// );

//   // const svgEl = svg(
//   //   "svg",
//   //   svg("use", {
//   //     href: `${spritePath}#icon-close`,
//   //   }),
//   // );
//   // setAttr(svgEl, {
//   //   className: "user-card__icon",
//   //   wedth: "25",
//   //   height: "24", // You could also just use 'class'
//   // });

//   const imgUserEl = el("img");
//   setAttr(imgUserEl, {
//     className: "user-card__img",
//     wedth: "25",
//     height: "25",
//     src: userPhoto,
//     // You could also just use 'class'
//   });

//   bottomEl.appendChild(buttonRedactionEl);
//   bottomEl.appendChild(buttonExitEl);
//   buttonEl.append(svgEl);
//   headingEl.append(buttonEl, hEl, imgUserEl);
//   topEl.appendChild(h3El);
//   cardEl.appendChild(headingEl);
//   cardEl.appendChild(topEl);
//   cardEl.appendChild(bottomEl);
//   headerCard.appendChild(cardEl);
// }
