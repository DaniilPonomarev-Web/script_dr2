
// ==UserScript==
// @name         Drive2 лента like
// @namespace    https://www.drive2.ru/
// @version      1
// @description  Лайкаю ленту
// @author       PD
// @match        https://www.drive2.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// Функция для лайка всех постов поочередно
async function likeAllPostsSequentially() {
    // Найти все элементы с кнопками лайков в shadow DOM
    const likeButtons = document.querySelectorAll('like-button');

    for (let i = 0; i < likeButtons.length; i++) {
        const shadowRoot = likeButtons[i].shadowRoot;
        const likeButton = shadowRoot.querySelector('button[data-tt="Нравится"]');
        if (likeButton) {
            likeButton.click();
            console.log(`Лайк поставлен для записи ${i + 1}`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Пауза между лайками, чтобы не выглядеть как бот
        }
    }
}

async function runScript() {
    await likeAllPostsSequentially();
   // Перезагружаем страницу каждые 30 секунд
    setTimeout(() => {
        location.reload();
    }, 65000);
}

// Запуск скрипта
runScript();