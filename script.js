
// ==UserScript==
// @name         Drive2 liker Прямой эфир
// @namespace    https://www.drive2.ru/life/
// @version      2024-09-22
// @description  Лайкаю весь прямой эфир
// @author       PD
// @match        https://www.drive2.ru/life/*
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
            await new Promise(resolve => setTimeout(resolve, 3000)); // Пауза между лайками, чтобы не выглядеть как бот
        }
    }
}

// Функция для перехода на следующую страницу
function goToNextPage() {
    const nextPageLink = document.querySelector('.c-pager__link[rel="next"]');
    if (nextPageLink) {
        nextPageLink.click();
    } else {
        console.log('Следующая страница не найдена.');
    }
}

// Главная функция для выполнения скрипта
async function runScript() {
    const currentPageElement = document.querySelector('.c-pager__page--active');
    const currentPage = parseInt(currentPageElement.textContent.trim(), 10);

    for (let i = currentPage; i < currentPage + 5 && i <= 5; i++) {
        await likeAllPostsSequentially();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Пауза перед переходом на следующую страницу
        goToNextPage();
        await new Promise(resolve => setTimeout(resolve, 3000)); // Пауза для загрузки следующей страницы
    }

    // Возвращаемся на первую страницу, если находимся на 5-й странице
    if (currentPage + 4 >= 5) {
        /*const firstPageLink = document.querySelector('a.c-pager__link[href="/life/"]');
        if (firstPageLink) {
            firstPageLink.click();
        } else {
            console.log('Ссылка на первую страницу не найдена.');
        }*/
 				window.location.href = 'https://www.drive2.ru/life/';
    }
}

// Запуск скрипта
runScript();
