import { navigate } from "./navigate";
import { RegisterData } from "./types";
import { el, setChildren } from "redom"; 
import { validateForm } from "../validate/validateForm";

export default function createRegCard(containerEl: HTMLElement) {
  class RegistrationForm {
    el: HTMLElement;

    constructor() {
      this.el = el("form.form__reg", { autocomplete: "on" }, [
        el(".form__group", [
          el("input.custom-input#name", {
            name: "username",
            type: "text",
            placeholder: "Имя",
            autocomplete: "name",
          }),
        ]),

        el(".form__group", [
          el("input.custom-input#email", {
            name: "email",
            type: "email",
            placeholder: "Email",
            autocomplete: "email",
          }),
        ]),

        el(".form__group", [
          el("input.custom-input#password", {
            name: "password",
            type: "password",
            placeholder: "Пароль",
            autocomplete: "current-password",
          }),
        ]),

        el("button.card__btn", { type: "submit" }, "Зарегистрироваться"),
      ]);
    }
  }

  const cardTitle = el("h2.card__title", "Регистрация");
  const regForm = new RegistrationForm();

  // Кнопки навигации
  const homeLinkEl = el("a.card__link", { href: "#" }, "На главную");
  const loginLinkEl = el("a.card__link", { href: "#" }, "Вход");
  homeLinkEl.onclick = (e) => {
    e.preventDefault();
    navigate("home");
  };
  loginLinkEl.onclick = (e) => {
    e.preventDefault();
    navigate("login");
  };

  const divCardEl = el(".card", [
    cardTitle,
    regForm.el,
    el(".card__wrapper", [homeLinkEl, loginLinkEl]),
  ]);

  containerEl.innerHTML = "";
  containerEl.append(divCardEl);

  // Инициализация валидации
  validateForm(".form__reg");
}
