"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.btnUser = btnUser;
function btnUser() {
    var userBtnEl = document.querySelector(".header__user-btn");
    var headerCard = document.querySelector(".header__card");
    headerCard.classList.add("user-card");
    var userEl = document.querySelector(".user-card");
    userBtnEl === null || userBtnEl === void 0 ? void 0 : userBtnEl.addEventListener("click", function (event) {
        event.preventDefault();
        userEl.classList.add("user-card--active");
        var closeEl = document.querySelector(".user-card__close");
        if (closeEl) {
            closeEl === null || closeEl === void 0 ? void 0 : closeEl.addEventListener("click", function (event) {
                event.preventDefault();
                userEl.classList.remove("user-card--active");
            });
        }
    });
}
