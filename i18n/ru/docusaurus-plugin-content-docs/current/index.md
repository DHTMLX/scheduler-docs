---
sidebar_label: Обзор DHTMLX Scheduler
title: Обзор DHTMLX Scheduler
slug: /
description: "Обзор компонента DHTMLX Scheduler на JavaScript. Начните с руководств быстрого старта, изучайте подробные руководства и API-справочник, и попробуйте живые демо."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

**DHTMLX Scheduler** — это гибко настраиваемый JavaScript-компонент календаря событий, поставляемый с определениями типов для TypeScript. Он предназначен для отображения, редактирования и управления расписаниями непосредственно в браузере. Компонент интегрируется с React, Angular, Vue и другими фронтенд-фреймворками. DHTMLX Scheduler также поддерживает разработку с использованием ИИ благодаря DHTMLX MCP Server, Agent Skills и структурированному API.

Вы можете использовать его в управлении проектами, CRM, системах бронирования, здравоохранении, образовании, сервисном обслуживании на местах, SaaS и других бизнес-приложениях, которым требуется интерактивный календарь, планировщик событий или временная шкала планирования ресурсов.

## Быстрый старт по фреймворкам

Вы можете использовать DHTMLX Scheduler как обычный виджет на JavaScript или интегрировать его в современный фреймворк. Начните с пошагового руководства, подходящего вашему стеку технологий:

<div className="framework-grid">

  <a className="framework-card" href="guides/initialization/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
  </a>

  <a className="framework-card" href="integrations/angular/quick-start/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
  </a>

  <a className="framework-card" href="integrations/vue/quick-start/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
  </a>

</div>

React, Angular и Vue поддерживают два подхода к интеграции:

- Готовые обёртки [React Scheduler](integrations/react/quick-start.md), [Angular Scheduler](integrations/angular/quick-start.md), и [Vue Scheduler](integrations/vue/quick-start.md) (рекомендуются для PRO и проектов-оценок)
- Прямая интеграция базового JavaScript Scheduler компонента с [React](integrations/react/js-scheduler-react.md), [Angular](integrations/angular/js-scheduler-angular.md), [Vue](integrations/vue/js-scheduler-vue.md) (Standard edition)

## Живые демо

Чтобы увидеть DHTMLX Scheduler в действии, изучите одни из самых популярных демо:

- [Basic initialization (week view)](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/?sample=%2703_extensions/01_recurring_events.html%27&filter=%27%27) и [Timeline view performance](https://docs.dhtmlx.com/scheduler/samples/?sample=%2706_timeline/16_lines_performance.html%27&filter=%27%27) примеры
- [Templates example](https://docs.dhtmlx.com/scheduler/samples/index.html?sample=%2702_customization/06_templates.html%27&filter=%27%27)

![scheduler_overview](/img/scheduler_overview.png)

Посмотрите [All Samples](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27), чтобы проверить полный набор возможностей Scheduler.

Для ориентированных на фреймворк стартовых точек смотрите примеры репозиториев для [React](integrations/react/js-scheduler-react.md), [Angular](integrations/angular/js-scheduler-angular.md) и [Vue](integrations/vue/js-scheduler-vue.md).

:::note
Некоторые примеры демонстрируют функциональность PRO, поэтому перед повторным использованием их в проекте Standard edition ознакомьтесь с [сравнением Standard vs PRO](guides/editions-comparison.md).
:::

## Ресурсы разработчика

- [Installation guide](guides/installation.md) для Standard, trial и PRO потоков настройки
- [Standard vs PRO comparison](guides/editions-comparison.md) для различий по функциям между редакциями
- Открытая [npm-пакет](https://www.npmjs.com/package/dhtmlx-scheduler) JavaScript Scheduler в рамках Standard edition
- [GitHub репозиторий](https://github.com/DHTMLX/scheduler) исходного кода Standard edition и отслеживания проблем
- [API reference](api/api_overview.md) и [samples](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27) для деталей реализации
- [What's New](whats-new.md) релизы и миграционные заметки

## Основные возможности Scheduler

DHTMLX Scheduler включает несколько видов календаря, богатые средства редактирования событий и планирования ресурсов.

### Виды календаря и навигация

По сути, Scheduler рендерит классические виды календаря и позволяет пользователям перемещаться во времени. Он включает:

- [Day](views/day.md), [Week](views/week.md), [Month](views/month.md), [Year](views/year.md) и [Agenda](views/agenda.md) views для визуализации расписаний в любом масштабе.
- настраиваемый [header](api/config/header.md) с элементами навигации и вкладками видов.

### Создание и редактирование событий

Компонент предусмотрит "calendar-first" редактирование, т.е. пользователи могут быстро создавать или обновлять события прямо на календаре:

- Взаимодействие с событиями в планировщике с помощью функций [создания](api/config/drag_create.md), [изменения размера](api/config/drag_resize.md) и [перемещения](api/config/drag_move.md) методом перетаскивания (drag-and-drop).
- [Гибкий редактор событий (лайтбокс)](guides/configuring-the-lightbox.md) для ввода полной информации о событии, а также опциональные всплывающие окна [Quick Info](guides/quick-info.md) для быстрого редактирования.
- [Перетаскивание между планировщиками](guides/drag-between.md) для перемещения событий из одного планировщика в другой.
- [Интеграция drag-and-drop с внешними источниками](https://dhtmlx.com/blog/creating-task-backlog-drag-drop-support-dhtmlx-scheduler/) для добавления записей из других компонентов в планировщик в качестве новых событий.
- [Обновление данных в реальном времени для нескольких пользователей](guides/multiuser-live-updates.md) при совместной работе с планировщиком.

### Повторяющиеся серии и исключения

Повторяющиеся события поддерживаются через отдельное расширение и RFC 5545 совместимый формат повторения:

- [Повторяющиеся события](guides/recurring-events.md) с исключениями для отдельных вхождений.
- [Валидация](guides/validation.md) и [предотвращение конфликтов](guides/collisions.md) для поддержания согласованности расписаний.

### Виды планирования ресурсов (PRO)

Для команд, которым требуется больше, чем просто календарь, PRO-издание DHTMLX Scheduler предоставляет расширенные режимы планирования:

- Представления [Timeline](views/timeline.md) и [Units](views/units.md) для планирования ресурсов.
- Представления [Week Agenda](views/weekagenda.md) и [Grid](views/grid.md) для компактного планирования в формате списка.
- [События, охватывающие несколько секций](guides/extensions-list.md#multisection), позволяющие назначать одно событие сразу нескольким ресурсам.

### Экспорт и экосистема

Команды часто нуждаются в совместном использовании расписаний, локальных копиях или синхронизации с внешними календарями. DHTMLX Scheduler интегрируется с внешними инструментами и форматами вывода, поддерживая:

- Экспорт в [PDF](export/pdf.md), [PNG](export/png.md), [Excel и iCal](export/excel.md).
- Двусторонняя синхронизация с [Google Календарем](integrations/google-calendar/google-calendar-sync.md).

### Кастомизация и стилизация

Внешний вид календаря можно настраивать на любом уровне — от полной темы до одного блока события через:

- Набор встроенных [скинов](guides/skins.md) с поддержкой [глубокой настройки](guides/custom-skins.md) и создания новых тем.
- Шаблоны для [содержимого событий, заголовков](guides/custom-events-content.md), [всплывающих подсказок](guides/tooltips.md) и других элементов интерфейса.
- Поддержка [локализации](guides/localization.md) языка интерфейса и форматов даты/времени, а также режима [RTL](guides/rtl-mode.md).

## Выпуски и лицензирование

DHTMLX Scheduler доступен в двух редакциях: **Standard** и **PRO**. Вы можете начать с бесплатной Standard edition и позже перейти на PRO, если вам нужны дополнительные функции, официальная поддержка и полностью поддерживаемая основа Scheduler. Также можно начать напрямую с PRO-издания либо через официальный пробный период, либо с платной лицензией. Выберите один из вариантов:

- **Standard edition.** Распространяется через публичные источники пакетов (npm, CDN), охватывает ядро интерактивного календаря.
- **[Official trial](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml)** Позволяет оценить полный набор функций PRO и получить техническую поддержку в течение пробного периода.
- **[PRO edition](https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing)** Разработано для рабочих окружений, включает продвинутые функции планирования, официальную поддержку и коммерческую лицензию. Устанавливается из закрытого реестра npm или добавляется вручную.

Чтобы увидеть точные различия функций между редакциями, смотрите [Standard vs PRO comparison](guides/editions-comparison.md). Для процесса установки каждой опции смотрите [installation guide](guides/installation.md).

:::note
Standard edition доступна только по лицензии GNU GPL v2. Чтобы использовать DHTMLX Scheduler в проектах с лицензией, отличной от GPL (и получить PRO-версию продукта), пожалуйста, приобретите лицензию Individual, Commercial, Enterprise, Ultimate или Startup на нашем сайте или свяжитесь с нами по **sales@dhtmlx.com**.
:::

## Инструменты AI-помощи в кодировании

Для разработки с поддержкой ИИ начните с руководств DHTMLX Scheduler, созданных специально для помощников по коду:

- [AI Tools guide](integrations/ai-tools.md)
- [DHTMLX MCP Server guide](integrations/ai-tools/mcp-server.md)
- [Agent Skills guide](integrations/ai-tools/agent-skills.md)
- [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md)

## Backend интеграция

DHTMLX Scheduler позволяет подключаться к любому бэкенду, реализуя RESTful API на сервере:

- Данные (как для [событий](guides/loading-data.md), так и для [правил их повторения](guides/recurring-events.md)) обычно загружаются и сохраняются в формате JSON.
- Встроенный компонент [DataProcessor](guides/server-integration.md) помогает направлять запросы на создание, обновление и удаление данных на ваш сервер.
- Доступны руководства для популярных бэкенд-платформ и фреймворков ([Node.js](integrations/node/howtostart-nodejs.md), [ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md), [Laravel](integrations/php/howtostart-php-laravel.md), [Ruby on Rails](integrations/other/howtostart-ruby.md) и др.), в которых рассматриваются CRUD-операции и лучшие практики синхронизации Scheduler с базой данных.

## Что дальше

Если вы только начинаете, действуйте следующим образом:

1. Ознакомьтесь с [руководством по началу работы](integrations/howtostart-guides.md) для выбранного вами фронтенд-фреймворка или чистого JavaScript.
2. Настройте [заголовок](api/config/header.md), [представления](views.md), [шаблоны](guides/templates.md) и поведение при редактировании через [Lightbox](guides/configuring-the-lightbox.md).
3. Подключите необходимые расширения, например [повторяющиеся события](guides/recurring-events.md), [Timeline/Units](views/timeline.md) (в версии PRO), [Quick Info](guides/quick-info.md) или [подсказки](guides/tooltips.md).
4. Подключитесь к бэкенду, настройте [интеграцию с сервером](guides/server-integration.md) и эндпоинты приложения для работы с событиями.
5. Изучите [руководства](guides.md) и [справочник по API](api/api_overview.md) для более глубокой настройки, включая шаблоны, события и расширения.

Если вы уже используете DHTMLX Scheduler и переходите с более ранней версии, смотрите [What's New](whats-new.md) для заметок о выпусках и обзоре последних функций и миграционных гайдов.