# SocialNetwork

## Описание

Учебный проект. SPA социальной сети на React/Redux. 

Данные тестового аккаунта: Email: free@samuraijs.com, Password: free. Регистрация нового аккаунта возможна на странице API соцсети https://social-network.samuraijs.com
Ограничения для бесплатного аккаунта:
Сумарное кол-во ВСЕХ запросов в день - 300
Сумарное кол-во ВСЕХ запросов в секунду - 11
Кол-во POST/PUT/DELETE/GraphQL запросов в час - 20

На странице Profile: загружается картинка, редактируются данные профиля, редактируется статус по двойному клику, добавляются посты. На станице Messages добавляются сообщения. На странице News добавляются новости. На странице Users реализован постраничный вывод пользователей, в пагинации ввод страницы кнопками и по клику на номере текущей страницы. По клику на аватарке пользователя выводится его профиль. Кнопка follow-unfollow сохраняет состояние на сервере. Список друзей в меню сохраняется в localStorage браузера.

## Демо страница

https://parunkov.github.io/socialNetwork/

## Команды

Клонирование репозитория по протоколу https:

    git clone https://github.com/parunkov/socialNetwork

Клонирование репозитория по протоколу ssh:

    git clone git://github.com/parunkov/socialNetwork

Установка проекта:
    
    npm i

Запуск dev server, адрес localhost:3000:

    npm start

Развертывание проекта:

    npm run deploy

Запуск тестов:

	npm test
