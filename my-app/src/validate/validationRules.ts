import { Rules } from "just-validate";

export const regRules = {
  "#name": [{ rule: "required" as Rules, errorMessage: "Введите имя" }],
  "#email": [
    { rule: "required" as Rules, errorMessage: "Введите почту" },
    {
      rule: "customRegexp" as Rules, // JustValidate использует customRegexp для регулярных выражений
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      errorMessage: "Неверный формат email!",
    },
  ],
  "#password": [
    { rule: "required" as Rules, errorMessage: "Придумайте пароль" },
    { rule: "minLength" as Rules, value: 4, errorMessage: "Минимум 4 символа" },
  ],
};

export const loginRules = {
  "#login-username": [
    { rule: "required" as Rules, errorMessage: "Введите имя" },
  ],
  "#login-password": [
    { rule: "required" as Rules, errorMessage: "Введите пароль" },
  ],
};
