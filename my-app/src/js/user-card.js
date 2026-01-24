"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardUser = cardUser;
var redom_1 = require("redom");
var redom_2 = require("redom");
function cardUser() {
    var headerCard = document.querySelector(".header__card");
    headerCard.classList.add("user-card");
    var cardEl = (0, redom_1.el)("div");
    (0, redom_1.setAttr)(cardEl, {
        className: "user-card__wrapper",
    });
    var headingEl = (0, redom_1.el)("div");
    (0, redom_1.setAttr)(headingEl, {
        className: "user-card__heading",
    });
    var topEl = (0, redom_1.el)("div");
    (0, redom_1.setAttr)(topEl, {
        className: "user-card__top",
    });
    var bottomEl = (0, redom_1.el)("div");
    (0, redom_1.setAttr)(bottomEl, {
        className: "user-card__bottom",
    });
    var hEl = (0, redom_1.el)("h2", "USER");
    (0, redom_1.setAttr)(hEl, {
        className: "user-card__title",
    });
    var h3El = (0, redom_1.el)("h3", "Данный раздел находится в разработке. Спасибо за понимание!!!");
    (0, redom_1.setAttr)(h3El, {
        className: "user-card__error",
    });
    var buttonEl = (0, redom_1.el)("button", { type: "button" });
    (0, redom_1.setAttr)(buttonEl, {
        className: "user-card__close",
    });
    var buttonExitEl = (0, redom_1.el)("button", "Покинуть профиль", { type: "button" });
    (0, redom_1.setAttr)(buttonExitEl, {
        className: "user-card__exit",
    });
    var buttonRedactionEl = (0, redom_1.el)("button", "Редактировать профиль", {
        type: "button",
    });
    (0, redom_1.setAttr)(buttonRedactionEl, {
        className: "user-card__buttonRedactionEl",
    });
    var svgEl = (0, redom_2.svg)("svg", (0, redom_2.svg)("use", { xlink: { href: "./images/sprite.svg#icon-close" } }));
    (0, redom_1.setAttr)(svgEl, {
        className: "user-card__icon",
        wedth: "25",
        height: "24", // You could also just use 'class'
    });
    var imgUserEl = (0, redom_1.el)("img");
    (0, redom_1.setAttr)(imgUserEl, {
        className: "user-card__img",
        wedth: "25",
        height: "25",
        src: "../images/foto-user-dekstop.png",
        // You could also just use 'class'
    });
    bottomEl.appendChild(buttonRedactionEl);
    bottomEl.appendChild(buttonExitEl);
    buttonEl.append(svgEl);
    headingEl.append(buttonEl, hEl, imgUserEl);
    topEl.appendChild(h3El);
    cardEl.appendChild(headingEl);
    cardEl.appendChild(topEl);
    cardEl.appendChild(bottomEl);
    headerCard.appendChild(cardEl);
}
