import JustValidate, { Rules } from "just-validate";
import { navigate } from "../ts-index/navigate";

// Добавляем аргумент formSelector
export function validateForm(formSelector: string): void {
  const form = document.querySelector<HTMLFormElement>(formSelector);

  if (!form) {
    console.error(`Форма ${formSelector} не найдена`);
    return;
  }

  const validate = new JustValidate(form);

  // Проверяем, какая именно форма пришла, и вешаем нужные правила
  if (formSelector === ".form__reg") {
    validate
      .addField("#name", [{ rule: "required" as Rules, errorMessage: "Введите имя" }])
      .addField("#surname", [{ rule: "required" as Rules, errorMessage: "Введите фамилию" }])
      .addField("#email", [{ rule: "required" as Rules, errorMessage: "Введите почту" }])
      .addField("#password", [{ rule: "required" as Rules, errorMessage: "Придумайте пароль" }]);
  } 
  
  if (formSelector === ".form__login") {
    validate
      .addField("#login-email", [{ rule: "required" as Rules, errorMessage: "Введите email" }])
      .addField("#login-password", [{ rule: "required" as Rules, errorMessage: "Введите пароль" }]);
  }

  validate.onSuccess((event?: Event) => {
    if (event) event.preventDefault();
    
    if (formSelector === ".form__reg") {
      alert("Регистрация успешна!");
      navigate("login");
    } else {
      alert("Вход выполнен!");
       window.location.href = "main.html";
    }
  });
}

// export function validateForm(): void {
//   // Находим форму в DOM, чтобы убедиться в её существовании
//   const form = document.querySelector<HTMLFormElement>(".form__reg");

//   if (!form) {
//     console.error("Форма .card__form не найдена");
//     return;
//   }

//   const validate = new JustValidate(form);

//   validate
//     .addField("#name", [
//       {
//         rule: "required" as Rules,
//         errorMessage: "Введите Ваше имя",
//       },
//       {
//         rule: "minLength" as Rules,
//         value: 2,
//         errorMessage: "Минимальная длина — 2 символа",
//       },
//       {
//         rule: "maxLength" as Rules,
//         value: 10,
//         errorMessage: "Максимальная длина — 10 символов",
//       },
//     ])

//     .addField("#surname", [
//       {
//         rule: "required" as Rules,
//         errorMessage: "Введите фамилию.",
//       },
//       {
//         rule: "minLength" as Rules,
//         value: 2,
//         errorMessage: "Минимальная длина — 2 символа",
//       },
//       {
//         rule: "maxLength" as Rules,
//         value: 10,
//         errorMessage: "Максимальная длина — 10 символов",
//       },
//     ])
//     .addField("#email", [
//       {
//         rule: "required" as Rules,
//         errorMessage: "Введите почту",
//       },
//       {
//         rule: "email" as Rules,
//         errorMessage: "Почта введена неверно!",
//       },
//       {
//         // Используем customRegexp для своей регулярки
//         rule: "customRegexp" as Rules,
//         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//         errorMessage: "Неверный формат email!",
//       },
//     ])
//     .addField("#password", [
//       {
//         rule: "required" as Rules,
//         errorMessage: "Придумайте пароль",
//       },

//       {
//         rule: "minLength" as Rules,
//         value: 5,
//         errorMessage: "Минимальная длина — 5 символов",
//       },
//     //   {
//     //     rule: Rules.StrongPassword,
//     //     errorMessage:
//     //       "Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную, одну цифру и один спецсимвол",
//     //   },  ЕСЛИ ЕСТЬ НЕОБХОДИМОСТЬ
//     ]);

//   // event? — делаем необязательным, чтобы избежать ошибки несовместимости типов
//   validate.onSuccess((event?: Event) => {
//     // Проверка наличия события для безопасного обращения к target
//     if (!event || !event.target) {
//       console.log("Форма валидна, но событие не передано");
//       return;
//     }

//     const formElement = event.target as HTMLFormElement;
//     const formData = new FormData(formElement);

//     console.log("Валидация прошла успешно!");
//     console.log("Данные формы:", Object.fromEntries(formData.entries()));

//     // Если нужно отправить форму:
//     formElement.submit();
//   });
// }
