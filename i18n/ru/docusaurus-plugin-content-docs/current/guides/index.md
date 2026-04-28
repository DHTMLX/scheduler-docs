--- 
title: "Руководства"
sidebar_label: "Руководства"
---

# Руководства

Информация руководств составляет основную часть документации и помогает вам в реальном использовании dhtmlxScheduler.
Глава разделена на практические руководства по задачам, которые помогают выполнять как простые, так и сложные задачи.
Статьи сосредоточены на ключевых процедурах и задачах по решению проблем.

Узнайте [функции, доступные в версиях Standard и PRO](guides/editions-comparison.md) библиотеки dhtmlxScheduler.

<div className="guidesList">

## Создание Scheduler на странице

Показывает, как установить и инициализировать Scheduler, а также приводит список доступных расширений.

- ### [Инициализация Scheduler](guides/initialization.md)
- ### [Способы установки Scheduler](guides/installation.md)
- ### [Полный список расширений](guides/extensions-list.md)

## Начало работы с фреймворками (Front-End)

Рассказывает, как построить и настроить стандартный Scheduler на фронтенде.

- ### [Scheduler на чистом JS/HTML](guides/initialization.md)
- ### [Scheduler с Angular](integrations/angular/howtostart-angular.md)
- ### [Scheduler с React](integrations/react/js-scheduler-react.md)
- ### [Scheduler с Vue.js](integrations/vue/howtostart-vue.md)
- ### [Scheduler с Svelte](integrations/svelte/howtostart-svelte.md)

## Начало работы на стороне сервера

Показывает, как построить стандартный Scheduler на различных платформах серверной стороны и запустить его в работу.

- ### [Scheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- ### [Scheduler с Node.js](integrations/node/howtostart-nodejs.md)
- ### [Scheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- ### [Scheduler с PHP](integrations/php/howtostart-plain-php.md)
- ### [Scheduler с Laravel](integrations/php/howtostart-php-laravel.md)
- ### [Scheduler со Slim](integrations/php/howtostart-php-slim4.md)
- ### [Scheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- ### [Scheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)

## Версии фреймворков

Узнайте, как интегрировать Scheduler в современные фронтенд-фреймворки.

- ### [Обзор React Scheduler](integrations/react/overview.md)

## Настройка Scheduler

Показывает, как настроить Scheduler, создать несколько schedulers, локализовать UI и обеспечить доступность.

- ### [Мобильная адаптивная версия Scheduler](guides/touch-support.md)
- ### [Общие настройки](guides/configuration.md)
- ### [Разметка Scheduler](guides/scheduler-markup.md)
- ### [RTL режим](guides/rtl-mode.md)
- ### [Локализация](guides/localization.md)
- ### [Несколько Scheduler на странице](guides/multiple-per-page.md)
- ### [Доступность](guides/accessibility.md)

## Загрузка и хранение данных

Обсуждает способы загрузки данных в Scheduler и интеграцию с backend.

- ### [Загрузка данных](guides/loading-data.md)
- ### [Серверная интеграция](guides/server-integration.md)

## Настройка видов

Показывает, как настраивать виды Scheduler и временные рамки.

- ### [Обзор представлений](/views/)
- ### [Пользовательские шкалы](guides/custom-scales.md)
- ### [Пользовательские представления](guides/custom-views.md)
- ### [Блокирование и пометка дат](guides/limits.md)

## Настройка Lightbox (форма редактирования)

Фокусируется на работе с лайтбоксом и редакторами.

- ### [Редакторы лайтбокса](guides/lightbox-editors.md)
- ### [Пользовательские редакторы](guides/custom-lightbox-editor.md)
- ### [Манипуляции лайтбоксом](guides/lightbox-editors-manipulations.md)
- ### [Полностью настраиваемый лайтбокс](guides/custom-details-form.md)
- ### [Изменение кнопок](guides/changing-lightbox-buttons.md)

## Управление событиями

Охватывает операции над объектами событий.

- ### [Операции над объектами события](guides/event-object-operations.md)
- ### [Добавление и удаление событий](guides/adding-events.md)
- ### [Фильтрация событий](guides/filtering.md)
- ### [Операции перетаскивания](guides/drag-between.md)
- ### [Периодические события](guides/recurring-events.md)
- ### [Режим только чтения](guides/readonly.md)
- ### [Валидация](guides/validation.md)
- ### [Предотвращение столкновений](guides/collisions.md)

## Настройка событий

Опisывает, как настраивать внешний вид и поведение событий.

- ### [Окно события](guides/custom-events-display.md)
- ### [Цвет события](guides/custom-events-color.md)
- ### [Содержимое события](guides/custom-events-content.md)
- ### [Тултипы](guides/tooltips.md)
- ### [Панели редактирования и выбора](guides/customizing-edit-select-bars.md)
- ### [Размеры](guides/sizing.md)

## Экспорт и импорт данных

Охватывает форматы и техники импорта/экспорта данных.

- ### [Интеграция с Google Calendar](integrations/google-calendar/google-calendar-sync.md)
- ### [Экспорт в PDF](export/pdf.md)
- ### [Экспорт в PNG](export/png.md)
- ### [Экспорт в Excel и iCal](export/excel.md)
- ### [Форматы сериализации](export/serialization.md)

## Оформление и стили

Представляет варианты стилизации GUI Scheduler.

- ### [Скины](guides/skins.md)
- ### [Шаблоны](guides/templates.md)
- ### [Пользовательские скины](guides/custom-skins.md)

## Работа с датами

Обсуждает форматы дат и операции с ними.

- ### [Спецификация форматов дат](guides/settings-format.md)
- ### [Операции с датами](guides/date-formats.md)


## Особые расширения и редакции

Руководство по опциональным расширениям.

- ### [Мини-календарь](guides/minicalendar.md)
- ### [Сообщения во всплывающих окнах и модальные окна](guides/popups-and-modals.md)
- ### [Обновления в реальном времени для нескольких пользователей](guides/multiuser-live-updates.md)
- ### [Несколько пользователей](guides/multiple-users.md)

## Руководство по интерфейсу пользователя

Описывает интерфейс Scheduler с точки зрения конечного пользователя.

- ### [Графический интерфейс Scheduler](guides/user-interface.md)

</div>