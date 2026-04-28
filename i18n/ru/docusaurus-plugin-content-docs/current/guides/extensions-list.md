---
title: "Полный список расширений"
sidebar_label: "Полный список расширений"
---

# Полный список расширений

dhtmlxScheduler включает ряд расширений, которые добавляют дополнительную функциональность к стандартному поведению.

Чтобы использовать расширение, активируйте его с помощью метода [`plugins()`](api/method/plugins.md).

:::info
В версии v6.0 файлы кода расширений были удалены из папки **ext** исходного кода планировщика и включены в файл *dhtmlxscheduler.js*.

Если вы используете dhtmlxScheduler 5.3 и более ранние версии, ознакомьтесь со статьей миграции migration.md#53---60.
:::

## Активные ссылки

Представляет числа дней в режимах просмотра Месяц и Неделя как кликабельные ссылки, которые открывают соответствующий день в указанном виде просмотра.

~~~js
scheduler.plugins({
    active_links: true
});
~~~

#### Связанные ресурсы

Статья: [Вид месяца](views/month.md)

API: [active_link_view](api/config/active_link_view.md)

Пример: [Дни месяца в виде ссылок](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)

## Agenda View 

Это кодовый файл для представления Agenda.

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~

#### Связанные ресурсы

Статья: [Вид Agenda](views/agenda.md)

Пример: [Вид Agenda](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

## All Timed

Показывает многодневные события обычным способом (однодневные события отображаются аналогично).

~~~js
scheduler.plugins({
    all_timed: true
});
~~~

#### Связанные ресурсы

API: [all_timed](api/config/all_timed.md) 

Пример: [Отображение многодневных событий обычным образом](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

## Collision 

Управляет количеством событий в временном слоте.

~~~js
scheduler.plugins({
    collision: true
});
~~~

#### Связанные ресурсы

Статья: [Предотвращение двойных событий в временном слоте](guides/collisions.md) 

Пример: [Контроль количества событий в временном слоте](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)

## Авторазмер контейнера

Включает автоматическое изменение размера контейнера планировщика (размер подстраивается под содержимое).

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

#### Связанные ресурсы

Статья: [dhtmlxScheduler в Plain JS/HTML](guides/initialization.md#scheduler-autoresizing)

API: [container_autoresize](api/config/container_autoresize.md) 

Пример: [Автоизменение размера контейнера планировщика](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)

## Куки

Сохраняет текущее состояние планировщика (режим и дата) в куки.

~~~js
scheduler.plugins({
    cookie: true
});
~~~

#### Связанные ресурсы

Пример: [Работа с куками](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)

## Daytimeline

:::note
Это расширение доступно только в версии PRO
:::

Файл кода для режима "Days" в виде Timeline.

~~~js
scheduler.plugins({
    daytimeline: true
});
~~~

#### Связанные ресурсы

Статья: [Timeline View](views/timeline.md)

Пример: [Дни как строки Timeline](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)


## Перемещение между планировщиками (Drag-n-Drop между Schedulers)

:::info
Это расширение доступно только в версии Scheduler PRO (Коммерческая версия с 6 октября 2021 года), лицензии Enterprise и Ultimate.
:::

Позволяет выполнять операции перетаскивания между несколькими планировщиками, что делает возможным перетаскивать события из одного планировщика в другой и обратно.

~~~js
scheduler.plugins({
    drag_between: true
});
~~~

#### Связанные ресурсы

Статья: [Drag-and-drop между планировщиками](guides/drag-between.md)

## Редакторы

Файл кода для контролов [radio](guides/radio.md), [combo](guides/combo.md), [checkbox](guides/checkbox.md) лайтбокса.

~~~js
scheduler.plugins({
    editors: true
});
~~~

#### Связанные ресурсы

Статья: [Редакторы лайтбокса](guides/lightbox-editors.md)

Пример: [Переключатель-radio в лайтбоксе](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

## Expand

Добавляет значок "expand" в правый угол планировщика. По клику на этот значок размер планировщика изменяется с исходного на «полный экран» и обратно.

~~~js
scheduler.plugins({
    expand: true
});
~~~

#### Связанные ресурсы

API: [`expand()`](api/method/expand.md), [`collapse()`](api/method/collapse.md)

События: [onBeforeExpand](api/event/onbeforeexpand.md), [onBeforeCollapse](api/event/onbeforecollapse.md), [onExpand](api/event/onexpand.md), [onCollapse](api/event/oncollapse.md)

Пример: [Полноэкранный режим](https://docs.dhtmlx.com/scheduler/samples/03_extensions/05_expand_plugin.html)

## Сервис экспорта

Предоставляет возможность включить онлайн-сервис экспорта.

~~~js
scheduler.plugins({
    export_api: true
});
~~~

#### Связанные ресурсы

Статья: [Export to PDF](export/pdf.md), [Export to PNG](export/png.md)

Пример: [Экспорт в PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)

## Грид-вид

:::info
Это расширение доступно только в PRO версии
:::

Файл кода для грида вида.

~~~js
scheduler.plugins({
    grid_view: true
});
~~~

#### Связанные ресурсы

Статья: [Грид-вид](views/grid.md)

Пример: [Грид-вид](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)

## HTML-шаблоны

Позволяет определять шаблоны как HTML-код.

~~~js
scheduler.plugins({
    html_templates: true
});
~~~

#### Связанные ресурсы

Статья: [Templates](guides/templates.md#specifying-templates-with-code)

Пример: [Указание шаблонов с HTML](https://docs.dhtmlx.com/scheduler/samples/03_extensions/09_html_templates_plugin.html)


## Клавиатурная навигация

Включает клавиатурную навигацию.

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

#### Связанные ресурсы

Статья: [Клавиатурная навигация](guides/keyboard-navigation.md)

Пример: [Клавиатурная навигация и WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

Пример: [Клавиатурная навигация в планировщике](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

## Устаревшее

Включает устаревший API.

~~~js
scheduler.plugins({
    legacy: true
});
~~~

#### Связанные ресурсы

Статья: [Migration From Older Versions](migration.md)

## Ограничение

Обеспечивает функциональность блокирования и выделения дат.

~~~js
scheduler.plugins({
    limit: true
});
~~~

#### Связанные ресурсы

Статья: [Blocking and Marking Dates](guides/limits.md)

Пример: [Ограничение дат для создания событий](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)


## Вид карты

Файл кода вида карты.

~~~js
scheduler.plugins({
    map_view: true
});
~~~

#### Связанные ресурсы

Статья: [Map View](views/map.md)

Пример: [Вид карты](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Мини-календарь (Date Picker)

Плагин для мини-календаря.

~~~js
scheduler.plugins({
    minical: true
});
~~~

#### Связанные ресурсы

Статья: [Мини-календарь (Date Picker)](guides/minicalendar.md), [Time and Date](guides/time.md#mini-calendar-in-the-lightbox)

Пример: [Мини-календарь в заголовке планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## Мультирезделение

:::info
Это расширение доступно только в PRO версии
:::

Позволяет назначать события нескольким секциям в Timeline-виде или нескольким единицам в виде Units.

~~~js
scheduler.plugins({
    multisection: true
});
~~~

#### Связанные ресурсы

Статья: [Timeline View](views/timeline.md), [Units View](views/units.md)

API: [multisection](api/config/multisection.md)

Пример: [Мультирезделение событий в Timeline и Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Множественный выбор

Плагин для управления [множественным выбором](guides/multiselect.md) элементов в лайтбоксе.

~~~js
scheduler.plugins({
    multiselect: true
});
~~~

#### Связанные ресурсы

Статья: [Редакторы лайтбокса](guides/lightbox-editors.md)

Пример: [Управление множественным выбором в лайтбоксе](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Несколько источников

Предоставляет функциональность загрузки данных из нескольких источников.

~~~js
scheduler.plugins({
    multisource: true
});
~~~

#### Связанные ресурсы

Статья: [Loading Data](guides/loading-data.md#loading-data-from-multiple-sources)

Пример: [Загрузка данных из нескольких источников](https://docs.dhtmlx.com/scheduler/samples/03_extensions/13_multisource.html)


## Внешнее перетаскивание

Разрешает перетаскивание событий из внешних компонентов DHTMLX, например dhtmlxTree.

~~~js
scheduler.plugins({
    outerdrag: true
});
~~~

#### Связанные ресурсы

Статья: [Drag-and-Drop Operations](guides/drag-between.md)

Пример: [Интеграция с dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


## PDF

Обеспечивает экспорт в PDF-документ.

- [Export to PDF (version 4.0)](export/pdf-legacy.md)

- [Export to PDF (version 4.1+)](export/pdf.md)


## Быстрая информация

Предоставляет всплывающее окно с деталями события.

~~~js
scheduler.plugins({
    quick_info: true
});
~~~

#### Связанные ресурсы

Статья: [Mobile Responsive Scheduler](guides/touch-support.md)

Пример: [Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


## Только для чтения

Обеспечивает режим только для чтения для лайтбокса и отдельных событий.

~~~js
scheduler.plugins({
    readonly: true
});
~~~

#### Связанные ресурсы

Статья: [Read-only Mode](guides/readonly.md)

Пример: [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Повторяющиеся

Обеспечивает поддержку повторяющихся событий.

~~~js
scheduler.plugins({
    recurring: true
});
~~~

#### Связанные ресурсы

Статья: [Recurring Events](guides/recurring-events.md)

Пример: [Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Наследие повторяющихся

Устаревший движок для повторяющихся событий.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

#### Связанные ресурсы

Статья: [Recurring Events (up to v7.1)](guides/recurring-events-legacy.md)

## Сериализация

Обеспечивает поддержку сериализации в форматы iCal, XML, JSON.

~~~js
scheduler.plugins({
    serialize: true
});
~~~

#### Связанные ресурсы

Статья: [Data Serialization to XML, JSON, iCal](export/serialization.md)

Пример: [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Таймлайн

:::info
Это расширение доступно только в PRO версии
:::

Плагин вида Таймлайн.

~~~js
scheduler.plugins({
    timeline: true
});
~~~

#### Связанные ресурсы

Статья: [Timeline View](views/timeline.md)

Пример: [Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


## Тултип

Включает тултипы для событий.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

#### Связанные ресурсы

Статья: [Tooltips](guides/tooltips.md)

Пример: [Тултипы](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


## Древо-таймлайн

:::info
Это расширение доступно только в PRO версии
:::

Расширение для режима "Tree" вида Таймлайн.

~~~js
scheduler.plugins({
    treetimeline: true
});
~~~

#### Связанные ресурсы

Статья: [Timeline View](views/timeline.md)

Пример: [Режим дерева](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)


## Вид единиц

:::info
Это расширение доступно только в PRO версии
:::

Расширение вида Units.

~~~js
scheduler.plugins({
    units: true
});
~~~

#### Связанные ресурсы

Статья: [Units View](views/units.md)

Пример: [Вид единиц](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## URL

Сохраняет состояние планировщика (дата, идентификатор события, вид) в URL.

Например:

```text
10_url_date_plugin.html#date=2027-08-01,mode=month
10_url_date_plugin.html#event=15
```

~~~js
scheduler.plugins({
    url: true
});
~~~

#### Связанные ресурсы

Пример: [Сохранение состояния планировщика в URL](https://docs.dhtmlx.com/scheduler/samples/03_extensions/10_url_date_plugin.html)

## Неделя Agenda

:::info
Это расширение доступно только в PRO версии
:::

Файл кода вида Week Agenda.

~~~js
scheduler.plugins({
    week_agenda: true
});
~~~

#### Связанные ресурсы

Статья: [Неделя Agenda View](views/weekagenda.md)

Пример: [WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Год

Файл кода вида года.

~~~js
scheduler.plugins({
    year_view: true
});
~~~

#### Связанные ресурсы

Статья: [Year View](views/year.md)

Пример: [Годовой вид](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)