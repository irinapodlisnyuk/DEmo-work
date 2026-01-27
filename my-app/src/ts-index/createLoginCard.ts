import { navigate } from "./navigate";
import { el, setChildren } from "redom";
import { LoginData } from "./types";

export default function createLoginCard(containerEl: HTMLElement) {
  class LoginForm {
    el: HTMLElement;
    private emailInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;

    constructor() {
      // Создаем элементы. В Redom вторым аргументом идет объект свойств.
      this.el = el(
        "form.form-login",
        {
          onsubmit: (e: Event) => this.handleSubmit(e),
        },
        [
          (this.emailInput = el("input.custom-input", {
            type: "email",
            placeholder: "Email",
            required: true,
          }) as HTMLInputElement),

          (this.passwordInput = el("input.custom-input", {
            type: "password",
            placeholder: "Пароль",
            required: true,
          }) as HTMLInputElement),

          el("button.card__btn", { type: "submit" }, "Войти"),
        ],
      );
    }

    private handleSubmit(e: Event): void {
      e.preventDefault();
      const data: LoginData = {
        email: this.emailInput.value,
        password: this.passwordInput.value,

          // alert("Вход в аккаунт")
      };

      console.log("Вход выполнен, перенаправление в кабинет музыки...");
    //   navigate("main");
     // 1. Успешная проверка (например, поля не пустые)
        if (this.emailInput.value && this.passwordInput.value) {
            
            console.log("Данные верны. Переход в кабинет ...");
            
            // 2. Переход на физическую страницу main.html
            window.location.href = "main.html"; 
            
        } else {
            alert("Пожалуйста, введите логин и пароль");
        }
    }
  }


  const cardTitle = el("h2.card__title", "Вход в аккаунт");

  // 2. Инициализируем форму (берем regForm.el, так как это экземпляр класса)
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

  // 4. Используем setChildren правильно
  // Мы передаем regForm.el (узел DOM), а не сам объект класса
  setChildren(divCardEl, [cardTitle, regForm.el, divWrapCardEl]);

  // 5. Очищаем контейнер перед добавлением (если navigate этого не сделал)
  // Очистка и отрисовка
  containerEl.innerHTML = "";
  containerEl.append(divCardEl);
}
