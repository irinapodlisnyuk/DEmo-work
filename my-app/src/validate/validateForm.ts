import JustValidate from "just-validate";
import { navigate } from "../ts-index/navigate";
import { regRules, loginRules } from "./validationRules";
import { sendAuthRequest } from "../ts/authApi";

export function validateForm(formSelector: string): void {
  const form = document.querySelector<HTMLFormElement>(formSelector);
  if (!form) return;

  const validate = new JustValidate(form);
  const isReg = formSelector === ".form__reg";
  
  // Применяем нужный конфиг
  const rules = isReg ? regRules : loginRules;
  Object.entries(rules).forEach(([id, rulesList]) => {
    validate.addField(id, rulesList);
  });

  validate.onSuccess(async (event) => {
    event?.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());
    const apiUrl = isReg ? "/api/register" : "/api/login";

    try {
      const { ok, data } = await sendAuthRequest(apiUrl, formData);

      if (ok) {
        if (isReg) {
          alert(data.message);
          navigate("login");
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", String(formData.username || formData['login-username']));
          window.location.href = "main.html";
        }
      } else {
        alert(data.message || "Ошибка авторизации");
      }
    } catch (error) {
      alert("Ошибка соединения с сервером");
    }
  });
}





// import JustValidate, { Rules } from "just-validate";
// import { navigate } from "../ts-index/navigate";

// // Добавляем аргумент formSelector
// export function validateForm(formSelector: string): void {
//   const form = document.querySelector<HTMLFormElement>(formSelector);

//   if (!form) {
//     console.error(`Форма ${formSelector} не найдена`);
//     return;
//   }

//   const validate = new JustValidate(form);

//   if (formSelector === ".form__reg") {
//     validate
//       .addField("#name", [
//         { rule: "required" as Rules, errorMessage: "Введите имя" },
//       ])
//       .addField("#email", [
//         { rule: "required" as Rules, errorMessage: "Введите почту" },
//         {
//           rule: "required" as Rules,
//           value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//           errorMessage: "Неверный формат email!",
//         },
//       ])
//       .addField("#password", [
//         { rule: "required" as Rules, errorMessage: "Придумайте пароль" },
//         {
//           rule: "minLength" as Rules,
//           value: 4,
//           errorMessage: "Пароль слишком короткий (минимум 4 символа)",
//         },
//       ]);
//   }

//   if (formSelector === ".form__login") {
//     validate
//       .addField("#login-username", [
//         { rule: "required" as Rules, errorMessage: "Введите имя" },
//       ])
//       .addField("#login-password", [
//         { rule: "required" as Rules, errorMessage: "Введите пароль" },
//       ]);
//   }

//   validate.onSuccess(async (event) => {
//     event?.preventDefault();

//     // 1. Автоматический сбор данных (нужны атрибуты name у инпутов!)
//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData.entries());

//     // 2. Определяем путь в зависимости от формы
//     const isReg = formSelector === ".form__reg";
//     const apiUrl = isReg ? "/api/register" : "/api/login";

//     try {
//       const response = await fetch(`http://localhost:8000${apiUrl}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data), // Отправит {username: "...", password: "..."}
//       });

//       const result = await response.json();

//       if (response.ok) {
//         if (isReg) {
//           // Логика для РЕГИСТРАЦИИ 
//           alert(result.message); // "пользователь успешно добавлен"
//           navigate("login");
//         } else {
//           // Логика для ВХОДА
//           localStorage.setItem("token", result.token);
//           localStorage.setItem("username", String(data.username));
//           window.location.href = "main.html";
//         }
//       } else {
//         // Вывод ошибки (например, "пользователь уже существует")
//         alert(result.message);
//       }
//     } catch (error) {
//       alert("Ошибка соединения с сервером");
//     }
//   });
// }
