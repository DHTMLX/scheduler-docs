---
sidebar_label: Обзор DHTMLX Scheduler
title: Обзор DHTMLX Scheduler
slug: /
description: "Обзор JavaScript-компонента DHTMLX Scheduler. Начните с руководств по быстрому старту, изучите подробные гайды и API reference, а также попробуйте живые демо."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';


**DHTMLX Scheduler** - это JavaScript-компонент календаря событий для отображения и редактирования расписаний в браузере.
Он поддерживает классические календарные представления ([День](views/day.md)/[Неделя](views/week.md)/[Месяц](views/month.md)/[Год](views/year.md)), расширенное редактирование событий (создание/изменение длительности/перемещение drag-and-drop + Lightbox), [повторяющиеся серии](guides/recurring-events.md), а также расширенные режимы планирования ресурсов ([Timeline](views/timeline.md)/[Units](views/units.md) в PRO).

DHTMLX Scheduler доступен в редакциях Standard и PRO. Standard-редакция распространяется через публичные источники пакетов, а PRO/Evaluation можно установить из приватного npm-реестра (или добавить вручную).


## Быстрый старт по фреймворкам

Вы можете использовать DHTMLX Scheduler как виджет на vanilla JavaScript или интегрировать его в современный фреймворк. Выберите пошаговый гайд под ваш стек:

<div className="framework-grid">

  <a className="framework-card" href="guides/initialization/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
    <div className="framework-desc">
      Минимальная настройка через script-теги или bundler.
    </div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Используйте готовый компонент <code>ReactScheduler</code> с props и событиями.
    </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      Интегрируйте Scheduler в Angular-проекты через тонкий wrapper.
    </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      Используйте Scheduler в Vue-приложениях с небольшим wrapper и реактивной конфигурацией.
    </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      Встраивайте Scheduler в Svelte через простой компонент с привязкой конфигурации и событий.
    </div>
  </a>

  <a className="framework-card" href="integrations/react/js-scheduler-react/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Встраивайте core-виджет Scheduler в свои компоненты для полного контроля жизненного цикла и потока данных.
    </div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      Используйте Scheduler в Salesforce Lightning Web Components и подключайте данные вашей org.
    </div>
  </a>

</div>


## Live demos

Чтобы увидеть DHTMLX Scheduler в действии, посмотрите онлайн-демо:

- [Базовая инициализация (представление Week)](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html).
- [Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html).
- [Производительность Timeline (горизонтальный скролл)](https://docs.dhtmlx.com/scheduler/samples/06_timeline/16_lines_performance.html).
- [Пример с templates](https://docs.dhtmlx.com/scheduler/samples/index.html?filter=%27%27&sample=%2702_customization%2F06_templates.html%27).
- [Все примеры](https://docs.dhtmlx.com/scheduler/samples/).


## Ключевые возможности

DHTMLX Scheduler ориентирован на интерактивный календарный UX и расширяемость. Ниже перечислены основные области с переходами к подробным разделам.

### Календарные представления и навигация

Scheduler предоставляет несколько способов визуализации времени и событий:

- Встроенные календарные представления ([День](views/day.md)/[Неделя](views/week.md)/[Месяц](views/month.md)/[Год](views/year.md)/варианты [Agenda](views/agenda.md)). Общий обзор смотрите в [Views](views.md).
- Настраиваемая навигация/заголовок и адаптивная инициализация через [scheduler.config.header](api/config/header.md).

### Создание и редактирование событий

Scheduler спроектирован для редактирования в стиле "календарь в центре":

- Создание, изменение размера и перемещение через drag-and-drop (настраивается).
- Встроенный редактор ([Lightbox](guides/configuring-the-lightbox.md)) и опциональные попапы [Quick Info](guides/quick-info.md) через расширения.
- Templates для [текста события](guides/custom-events-content.md), [Tooltips](guides/tooltips.md), заголовков и фрагментов UI (для полного контроля рендеринга).

### Повторяющиеся серии и исключения

Повторяющиеся события поддерживаются через отдельное расширение и современный формат повторения. См. [Recurring Events](guides/recurring-events.md).

### Планирование ресурсов (PRO)

PRO добавляет расширенные режимы, часто используемые для планирования ресурсов:

- Представление [Timeline](views/timeline.md), [Units](views/units.md), [Week Agenda](views/weekagenda.md), [Grid](views/grid.md) и другие расширения только для PRO.
- Мультисекционные события (назначение одного события нескольким ресурсам/секциям) через расширение [Multisection](guides/extensions-list.md#multisection).

### Загрузка данных, форматы и синхронизация

Scheduler можно подключить к вашему слою данных несколькими способами:

- Загружать данные с backend и поддерживать синхронизацию (часто используется [REST-подобный API + DataProcessor](guides/server-integration.md)).
- Доступны серверные гайды [How to start](integrations/howtostart-guides.md) для разных стеков (Node, ASP.NET Core, PHP/Laravel, Ruby и др.).


## Интеграция с фреймворками и backend

### Frontend-интеграция

Scheduler можно использовать:

- Как самостоятельный JS-виджет на любой странице - [инициализация на чистом HTML/JS](guides/initialization.md).
- Во wrapper-компонентах фреймворков через гайды [How to start](integrations/howtostart-guides.md) для [React](integrations/react/)/[Angular](integrations/angular/howtostart-angular.md)/[Vue](integrations/vue/howtostart-vue.md)/[Svelte](integrations/svelte/howtostart-svelte.md).


## Примечания по установке

- Standard-редакция:
  - <code>npm install dhtmlx-scheduler</code>
  - или подключение с CDN.
- PRO/Evaluation:
  - установка из приватного npm-реестра или ручное добавление пакета/из локальной папки, см. [руководство по установке](guides/installation.md).


## Что дальше

Если вы только начинаете:

1. Выберите один из гайдов в разделе «Быстрый старт по фреймворкам» или начните с [инициализации на чистом HTML/JS](guides/initialization.md).
2. Настройте UI: [header](api/config/header.md), [views](/views/), [templates](guides/templates.md) и правила редактирования.
3. Включите нужные [расширения](guides/extensions-list.md) - [Recurring](guides/recurring-events.md), [Timeline](views/timeline.md)/[Units](views/units.md) в PRO, [Quick Info](guides/quick-info.md), [Tooltip](guides/tooltips.md) и т.д.
4. Подключите backend по гайдам [Server-Side Integration](guides/server-integration.md).
5. Изучите [Guides](guides/) и [API reference](api/api_overview.md) для более глубокой кастомизации.

При обновлении проверьте разделы [What's new](whats-new.md) и [migration guides](migration.md).
