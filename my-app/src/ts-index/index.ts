
import '../scss-index/index_style.scss';
import '../images/sprite.svg';
// Запуск приложения
 import {navigate} from "./navigate";
 import {validateForm} from "../validate/validateForm";

document.addEventListener("DOMContentLoaded", function () {
    navigate();
    validateForm(".form__login");
    validateForm(".form__reg");
})