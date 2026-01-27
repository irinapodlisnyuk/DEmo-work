//Создание главной карточки
import { el, setChildren } from "redom";
import { navigate } from "./navigate";

export default function createHomeCard(containerEl: HTMLElement) {
  // 1. Создаем заголовок

  const divCardEl = el(".card");
  const cardTitle = el("h2.card__title", "Добро пожаловать на сайт");
  const cardText = el(
    "p.card__text",
    "Войдите в личный кабинет. Если Вы, еще не зарегистрированы, пройдите регистрацию!",
  );

  const btnLoginEl = el("button.card__btn", { type: "submit" }, "Войти");
  const btnRegEl = el("button.card__btn", { type: "submit" }, "Регистрация");
  const divWrapCardEl = el(".card__wrapper", [btnLoginEl, btnRegEl]);

  // Важно: вызывайте navigate с аргументом или без, согласно логике navigate.ts
  btnLoginEl.onclick = (e) => {
    e.preventDefault();
    navigate("login");
  };
  btnRegEl.onclick = (e) => {
    e.preventDefault();
    navigate("reg");
  };

  setChildren(divCardEl, [cardTitle, cardText, divWrapCardEl]);
  containerEl.append(divCardEl);
}
