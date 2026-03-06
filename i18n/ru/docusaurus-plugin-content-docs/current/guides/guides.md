---
title: "Руководства"
sidebar_label: "Руководства"
---

# Руководства

В этом разделе собраны основные материалы, которые помогут вам эффективно использовать dhtmlxScheduler. 
Он структурирован в виде руководств, ориентированных на выполнение конкретных задач - как простых, так и сложных, часто встречающихся или редких. 
Статьи охватывают важнейшие процедуры и практические решения.

Ознакомьтесь с [возможностями, доступными в версиях Standard и PRO](guides/editions-comparison.md) библиотеки dhtmlxScheduler.

<table cellspacing="0" cellpadding="5" border="0">
  <tbody>
  <tr>
  <td id="data" class='topics'><h4> Создание Scheduler на странице </h4> <ul id="data_sublist" > <li>[Инициализация Scheduler](guides/initialization.md)</li> <li>[Способы установки Scheduler](guides/installation.md)</li> <li>[Полный список расширений](guides/extensions-list.md)</li> </ul></td>
  <td class='topic_description'>Объясняет, как установить и инициализировать Scheduler, а также предоставляет список доступных расширений.</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> С чего начать с Scheduler и Front-End </h4> <ul id="data_sublist" > <li>[dhtmlxScheduler на чистом JS/HTML](guides/initialization.md)</li> <li>[dhtmlxScheduler с Angular](integrations/angular/howtostart-angular.md)</li> <li>[dhtmlxScheduler с React](integrations/react/js-scheduler-react.md)</li> <li>[dhtmlxScheduler с Vue.js](integrations/vue/howtostart-vue.md)</li> <li>[dhtmlxScheduler с Svelte](integrations/svelte/howtostart-svelte.md)</li> </ul></td>
  <td class='topic_description'>Описывает, как создать и настроить стандартный Scheduler на стороне клиента.</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> С чего начать с Scheduler на сервере </h4> <ul id="data_sublist" > <li>[dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)</li> <li>[dhtmlxScheduler с Node.js](integrations/node/howtostart-nodejs.md)</li> <li>[dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)</li> <li>[dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)</li> <li>[dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)</li> <li>[dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)</li> <li>[dhtmlxScheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)</li> <li>[dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)</li> <li>[dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)</li> </ul></td>
  <td class='topic_description'>Описывает, как создать стандартный Scheduler на различных серверных платформах, настроить параметры, кастомизировать шаблоны, подключать события и многое другое.</td>
  </tr>
  <tr>
  <td id="manipulations" class='topics'><h4> Настройка Scheduler </h4> <ul id="manipulations_sublist"> <li>[Мобильная адаптивность Scheduler](guides/touch-support.md)</li> <li>[Общие инструкции по настройке](guides/configuration.md)</li> <li>[Разметка Scheduler](guides/scheduler-markup.md)</li> <li>[RTL (Справа налево) режим](guides/rtl-mode.md)</li> <li>[Локализация](guides/localization.md)</li> <li>[Создание нескольких планировщиков на странице](guides/multiple-per-page.md)</li> <li>[Доступность](guides/accessibility.md)</li> </ul></td>
  <td class='topic_description'>Демонстрирует, как настраивать Scheduler, создавать несколько экземпляров на одной странице, локализовать интерфейс, включать функции доступности и многое другое.</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> Загрузка и хранение данных </h4> <ul id="data_sublist" > <li>[Загрузка данных](guides/loading-data.md)</li> <li>[Интеграция с серверной стороной](guides/server-integration.md)</li> </ul></td>
  <td class='topic_description'>Рассматривает различные способы загрузки данных в Scheduler: источники, форматы, техники, а также детали серверной интеграции.</td>
  </tr>
  <tr>
  <td id="manipulations" class='topics'><h4> Настройка видов </h4> <ul id="manipulations_sublist"> <li>[Обзор видов](/views/)</li> <li>[Скрытие единиц времени на оси X в представлении](guides/custom-scales.md)</li> <li>[Пользовательский вид](guides/custom-views.md)</li> <li>[Блокировка и выделение дат](guides/limits.md)</li> </ul></td>
  <td class='topic_description'>Объясняет, как настраивать виды, изменять единицы шкалы, создавать собственные виды и ограничивать определённые даты.</td>
  </tr>
  <tr>
  <td id="lightbox" class='topics'><h4> Настройка Lightbox (формы редактирования) </h4> <ul id="lightbox_sublist"> <li>[Секции и элементы управления (редакторы)](guides/lightbox-editors.md) </li> <li>[Пользовательские редакторы](guides/custom-lightbox-editor.md)</li> <li>[Манипуляции с Lightbox](guides/lightbox-editors-manipulations.md)</li> <li>[Полностью кастомный Lightbox](guides/custom-details-form.md)</li> <li>[Изменение кнопок](guides/changing-lightbox-buttons.md)</li> </ul></td>
  <td class='topic_description'>Посвящено работе с lightbox: добавление и удаление элементов управления, получение и установка значений, настройка внешнего вида и многое другое.</td>
  </tr>
  <tr>
  <td id="events" class='topics'><h4> Управление событиями в Scheduler </h4> <ul id="events_sublist"> <li>[Операции с объектом события](guides/event-object-operations.md)</li> <li>[Добавление/Удаление событий](guides/adding-events.md)</li> <li>[Фильтрация событий](guides/filtering.md)</li> <li>[Операции Drag-and-Drop](guides/drag-between.md)</li> <li>[Повторяющиеся события](guides/recurring-events.md)</li> <li>[Режим только для чтения](guides/readonly.md)</li> <li>[Валидация](guides/validation.md)</li> <li>[Предотвращение двойных событий в одном временном слоте](guides/collisions.md)</li> </ul></td>
  <td class='topic_description'>Описывает основные операции с объектами событий: добавление, удаление, фильтрация. Также объясняет работу с повторяющимися событиями, режимом только для чтения и другие аспекты.</td>
  </tr>
  <tr>
  <td id="customevent" class='topics'><h4> Кастомизация событий </h4> <ul id="customevent_sublist"> <li>[Бокс](guides/custom-events-display.md)</li> <li>[Цвет](guides/custom-events-color.md)</li> <li>[Содержимое (шаблон)](guides/custom-events-content.md)</li> <li>[Тултип](guides/tooltips.md)</li> <li>[Панели редактирования и выбора события](guides/customizing-edit-select-bars.md)</li> <li>[Изменение размера шкалы и блоков событий](guides/sizing.md)</li> </ul></td>
  <td class='topic_description'>Рассказывает, как персонализировать различные аспекты событий - от текстового шаблона до внешнего вида бокса события.</td>
  </tr>
  <tr>
  <td id="import" class='topics'><h4> Экспорт/импорт данных </h4> <ul id="import_sublist"> <li>[Интеграция с Google Calendar](integrations/google-calendar/google-calendar-sync.md)</li> <li>[Экспорт в PDF](export/pdf.md)</li> <li>[Экспорт в PNG](export/png.md)</li> <li>[Экспорт в Excel и iCal](export/excel.md)</li> <li>[XML, JSON, iCal и другие форматы](export/serialization.md)</li> </ul></td>
  <td class='topic_description'>Описывает форматы и методы, доступные для импорта и экспорта данных Scheduler.</td>
  </tr>
  <tr>
  <td id="styling" class='topics'><h4> Внешний вид и стилизация </h4> <ul id="styling_sublist"> <li>[Скины](guides/skins.md)</li> <li>[Форматирование меток, дат, стилей](guides/templates.md)</li> <li>[Настройка скинов](guides/custom-skins.md)</li> </ul></td>
  <td class='topic_description'>Ознакомит с графическими элементами Scheduler и объяснит, как их стилизовать.</td>
  </tr>
  <tr>
  <td id="styling" class='topics'><h4> Работа с датами </h4> <ul id="styling_sublist"> <li>[Спецификация формата даты](guides/settings-format.md)</li> <li>[Операции с датами](guides/date-formats.md)</li> </ul></td>
  <td class='topic_description'>Рассматривает важные вопросы работы с датами в Scheduler, включая преобразование дат в строки и обратно, а также допустимые символы в форматах дат.</td>
  </tr>
  <tr>
  <td id="styling" class='topics'><h4> Интеграции </h4> <ul id="styling_sublist"> <li>[Всплывающие сообщения и модальные окна](guides/popups-and-modals.md)</li> <li>[Использование Scheduler с TypeScript](guides/scheduler-typescript.md)</li> <li>[Интеграция с jQuery](integrations/other/jquery-integration.md)</li>  <li>[Интеграция с dhtmlxLayout](integrations/other/dhxlayout-integration.md)</li> </ul></td>
  <td class='topic_description'>Описывает доступные варианты интеграции Scheduler с сторонними фреймворками.</td>
  </tr>
  <tr>
  <td id="internet" class='topics'><h4> Специальные расширения и редакции </h4> <ul id="internet_sublist"> <li>[Мини-календарь (Date Picker)](guides/minicalendar.md)</li> <li>[Live Updates Mode (Устаревший)](guides/live-update.md)</li> <li>[Несколько пользователей](guides/multiple-users.md)</li> </ul></td>
  <td class='topic_description'>Дает рекомендации по использованию различных расширений, входящих в библиотеку, для расширения её функциональности.</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> Руководство по пользовательскому интерфейсу </h4> <ul id="data_sublist" > <li>[Графический интерфейс планировщика](guides/user-interface.md)</li> </ul></td>
  <td class='topic_description'>Описывает элементы интерфейса Scheduler с точки зрения конечного пользователя.</td>
  </tr>
  </tbody>
</table>
