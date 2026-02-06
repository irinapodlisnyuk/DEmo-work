import "../scss-index/index_style.scss";
import "../images/sprite.svg";
import { navigate } from "./navigate";
import { validateForm } from "../validate/validateForm";

document.addEventListener("DOMContentLoaded", function () {
  navigate();
  validateForm(".form__login");
  validateForm(".form__reg");
});
