import { navigate } from "./navigate";
import { el, setChildren } from "redom";
import { LoginData } from "./types";
import { validateForm } from "../validate/validateForm";

export default function createLoginCard(containerEl: HTMLElement) {
  class LoginForm {
    el: HTMLElement;
    private emailInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;

    constructor() {
      this.el = el(
        "form.form__login",

        { autocomplete: "on" },
        [
          el(".form__group", [
            (this.emailInput = el("input.custom-input", {
              name: "username",
              id: "login-username",
              type: "text",
              placeholder: "Имя",
              required: true,
              autocomplete: "username",
            }) as HTMLInputElement),
          ]),
          el(".form__group", [
            (this.passwordInput = el("input.custom-input", {
              name: "password",
              id: "login-password",
              type: "password",
              placeholder: "Пароль",
              required: true,
              autocomplete: "current-password",
            }) as HTMLInputElement),
          ]),

          el("button.card__btn", { type: "submit" }, "Войти"),
        ],
      );
    }
  }

  const cardTitle = el("h2.card__title", "Вход в аккаунт");

  const regForm = new LoginForm();

  const homeLinkEl = el("a.card__link", { href: "#" }, "На главную");
  const regLinkEl = el("a.card__link", { href: "#" }, "Регистрация");

  homeLinkEl.onclick = (e) => {
    e.preventDefault();
    navigate("");
  };
  regLinkEl.onclick = (e) => {
    e.preventDefault();
    navigate("reg");
  };

  const divWrapCardEl = el(".card__wrapper", [homeLinkEl, regLinkEl]);
  const divCardEl = el(".card");

  // Мы передаем regForm.el (узел DOM), а не сам объект класса
  setChildren(divCardEl, [cardTitle, regForm.el, divWrapCardEl]);

  containerEl.innerHTML = "";
  containerEl.append(divCardEl);

  validateForm(".form__login");
}
