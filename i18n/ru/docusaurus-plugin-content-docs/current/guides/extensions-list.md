---
title: "Полный список расширений"
sidebar_label: "Полный список расширений"
---

# Полный список расширений

dhtmlxScheduler предлагает различные расширения, которые расширяют стандартную функциональность.

Чтобы включить расширение, активируйте его с помощью метода [scheduler.plugins](api/method/plugins.md).

:::info
Начиная с версии 6.0, файлы кода расширений были удалены из папки **ext** и объединены в файл *dhtmlxscheduler.js*. 

Если вы используете dhtmlxScheduler 5.3 или более ранней версии, пожалуйста, обратитесь к [статье по миграции](migration.md#53---60).
:::

## Active Links {#activelinks}

Отображает номера дней в представлениях "Месяц" и "Неделя" в виде кликабельных ссылок, которые открывают соответствующий день в выбранном представлении.

~~~js
scheduler.plugins({
    active_links: true
});
~~~

#### Связанные материалы

Статья: [Месячный вид](views/month.md#presentingdaysnumbersasclickablelinks)


API: [active_link_view](api/config/active_link_view.md) 


[Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)


## Agenda View {#agenda-view}

Это кодовый файл для представления Agenda.

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~

#### Связанные материалы

Статья: [Представление Agenda](views/agenda.md) 


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## All Timed {#all-timed}

Отображает многодневные события в том же стиле, что и однодневные события.

~~~js
scheduler.plugins({
    all_timed: true
});
~~~

#### Связанные материалы

API: [all_timed](api/config/all_timed.md) 


[Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)


## Collision {#collision}

Обрабатывает количество событий, происходящих в один и тот же временной интервал.

~~~js
scheduler.plugins({
    collision: true
});
~~~


#### Связанные материалы

Статья: [Предотвращение двойных событий в одном временном слоте](guides/collisions.md) 


[Controlling the number of events in a time slot](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)


## Container Autoresize {#containerautoresize}

Автоматически изменяет размер контейнера планировщика в соответствии с его содержимым.

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

#### Связанные материалы

Статья: [dhtmlxScheduler на чистом JS/HTML](guides/initialization.md#containerautoresizing)


API: [container_autoresize](api/config/container_autoresize.md) 


[Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


## Cookie {#cookie}

Сохраняет текущее состояние планировщика (режим и дату) с помощью cookies.

~~~js
scheduler.plugins({
    cookie: true
});
~~~

#### Связанные материалы

[Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)


## Daytimeline {#daytimeline}

:::info
Это расширение доступно только в PRO-версии
:::

Обеспечивает режим "Days" для представления Timeline.

~~~js
scheduler.plugins({
    daytimeline: true
});
~~~


#### Связанные материалы

Статья: [Вид 'Timeline'](views/timeline.md)


[Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)


## Drag-n-Drop между планировщиками {#drag-n-drop-between-schedulers}

:::info
Это расширение доступно только в Scheduler PRO (Commercial (с 6 октября 2021), Enterprise и Ultimate лицензиях).
:::

Позволяет перетаскивать события между несколькими планировщиками, обеспечивая перенос событий из одного планировщика в другой.

~~~js
scheduler.plugins({
    drag_between: true
});
~~~

#### Связанные материалы

Статья: [Drag-and-drop between Schedulers](guides/drag-between.md)


## Editors {#editors}

Включает код для элементов управления [Контролы Lightbox](guides/lightbox-editors.md), [combo](guides/lightbox-editors.md), 
[checkbox](guides/lightbox-editors.md), используемых в lightbox.

~~~js
scheduler.plugins({
    editors: true
});
~~~


#### Связанные материалы

Статья: [Контролы Lightbox](guides/lightbox-editors.md) 


[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Expand {#expand}

Добавляет иконку "развернуть" в правом верхнем углу планировщика. При нажатии переключает планировщик между исходным размером и полноэкранным режимом.

~~~js
scheduler.plugins({
    expand: true
});
~~~


#### Связанные материалы

API: [expand](api/method/expand.md), [collapse](api/method/collapse.md) 


События: [onBeforeExpand](api/event/onbeforeexpand.md), [onBeforeCollapse](api/event/onbeforecollapse.md), [onExpand](api/event/onexpand.md), [onCollapse](api/event/oncollapse.md)
 

[Full-screen view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/05_expand_plugin.html)


## Export service {#export-service}

Включает онлайн-сервис экспорта.

~~~js
scheduler.plugins({
    export_api: true
});
~~~

#### Связанные материалы

Статья: [Экспорт в PDF](export/pdf.md) , [Экспорт в PNG](export/png.md)


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## Grid View {#gridview}

:::info
Это расширение доступно только в PRO-версии
:::

Кодовый файл для представления Грид.

~~~js
scheduler.plugins({
    grid_view: true
});
~~~


#### Связанные материалы

Статья: [Грид View](views/grid.md)


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## HTML Templates {#html-templates}

Позволяет определять шаблоны с использованием HTML-кода.

~~~js
scheduler.plugins({
    html_templates: true
});
~~~

#### Связанные материалы

Статья: [Шаблоны](guides/templates.md)


[Specifying templates with HTML](https://docs.dhtmlx.com/scheduler/samples/03_extensions/09_html_templates_plugin.html)


## Keyboard Navigation {#keyboard-navigation}

Включает навигацию с помощью клавиатуры.

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

#### Связанные материалы

Статья: [Навигация с помощью клавиатуры](guides/keyboard-navigation.md)


[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)


[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)


## Legacy {#legacy}

Активирует поддержку устаревшего API.

~~~js
scheduler.plugins({
    legacy: true
});
~~~

#### Связанные материалы

Статья: [Migration From Older Versions](migration.md)


## Limit {#limit}

Предоставляет возможность блокировать и выделять определённые даты.

~~~js
scheduler.plugins({
    limit: true
});
~~~

#### Связанные материалы

Статья: [Блокировка и выделение дат](guides/limits.md)


[Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)


## Map View {#mapview}

Кодовый файл для представления Map.

~~~js
scheduler.plugins({
    map_view: true
});
~~~

#### Связанные материалы

Статья: [Map View](views/map.md)


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Мини-календарь (Date Picker) {#minicalendardatepicker}

Плагин, добавляющий мини-календарь.

~~~js
scheduler.plugins({
    minical: true
});
~~~

#### Связанные материалы

Статья: [Мини-календарь (Date Picker)](guides/minicalendar.md), [Время и дата](guides/time.md#mini-calendar-in-the-lightbox)


[Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## Multisection {#multisection}

:::info
Это расширение доступно только в PRO-версии
:::

Позволяет назначать события нескольким секциям в Timeline или нескольким юнитам в Units.

~~~js
scheduler.plugins({
    multisection: true
});
~~~

#### Связанные материалы

Статья: [Вид 'Timeline'](views/timeline.md), [Units View](views/units.md#assigningeventstoseveralunits)


API: [multisection](api/config/multisection.md)


[Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Multiselect {#multiselect}

Добавляет поддержку элемента [multiselect](guides/lightbox-editors.md) в lightbox.

~~~js
scheduler.plugins({
    multiselect: true
});
~~~

#### Связанные материалы

Статья: [Контролы Lightbox](guides/lightbox-editors.md)


[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Multisource {#multisource}

Позволяет загружать данные из нескольких источников.

~~~js
scheduler.plugins({
    multisource: true
});
~~~

#### Связанные материалы

Статья: [Загрузка данных](guides/loading-data.md#loadingdatafrommultiplesources)


[Loading data from multiple sources](https://docs.dhtmlx.com/scheduler/samples/03_extensions/13_multisource.html)


## Outerdrag {#outerdrag}

Позволяет перетаскивать события из внешних компонентов DHTMLX, например, dhtmlxTree.

~~~js
scheduler.plugins({
    outerdrag: true
});
~~~


#### Связанные материалы

Статья: [Операции Drag-and-Drop](guides/drag-between.md)


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


## PDF {#pdf}

Поддерживает экспорт в документы PDF.

- [Экспорт в PDF (версия 4.0)](export/pdf-legacy.md)

- [Экспорт в PDF (версия 4.1+)](export/pdf.md)


## Quick Info {#quickinfo}

Отображает всплывающее окно с деталями события.

~~~js
scheduler.plugins({
    quick_info: true
});
~~~


#### Связанные материалы

Статья: [Мобильная адаптивность Scheduler](guides/touch-support.md)


[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


## Readonly {#readonly}

Включает режим только для чтения для lightbox и некоторых событий.

~~~js
scheduler.plugins({
    readonly: true
});
~~~


#### Связанные материалы

Статья: [Режим только для чтения](guides/readonly.md)


[Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Recurring {#recurring}

Добавляет поддержку повторяющихся событий.

~~~js
scheduler.plugins({
    recurring: true
});
~~~


#### Связанные материалы

Статья: [Повторяющиеся события](guides/recurring-events.md)


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
 

## Recurring Legacy {#recurring-legacy}

Устаревшая поддержка повторяющихся событий.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

#### Связанные материалы

Статья: [Повторяющиеся события (до v7.1)](guides/recurring-events-legacy.md)


## Serialize {#serialize}

Поддерживает сериализацию данных в форматы ICal, XML и JSON.

~~~js
scheduler.plugins({
    serialize: true
});
~~~


#### Связанные материалы

Статья: [Сериализация данных в XML, JSON, iCal](export/serialization.md)


 

[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Timeline {#timeline}

:::info
Это расширение доступно только в PRO-версии
:::

Плагин представления Timeline.

~~~js
scheduler.plugins({
    timeline: true
});
~~~


#### Связанные материалы

Статья: [Вид 'Timeline'](views/timeline.md)


[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


## Tooltip {#tooltip}

Включает тултипы для событий.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~


#### Связанные материалы

Статья: [Тултипы](guides/tooltips.md)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


## Treetimeline {#treetimeline}

:::info
Это расширение доступно только в PRO-версии
:::

Обеспечивает режим "Tree" для представления Timeline.

~~~js
scheduler.plugins({
    treetimeline: true
});
~~~


#### Связанные материалы

Статья: [Вид 'Timeline'](views/timeline.md)


[Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)


## Units {#units}

:::info
Это расширение доступно только в PRO-версии
:::

Расширение представления Units.

~~~js
scheduler.plugins({
    units: true
});
~~~


#### Связанные материалы

Статья: [Units View](views/units.md)


[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## URL {#url}

Сохраняет состояние планировщика (дата, ID события, вид) в URL.

Примеры: 
~~~js
<code>10_url_date_plugin.html#date=2014-08-01,mode=month</code> 
или 
<code>10_url_date_plugin.html#event="15</code">
~~~
~~~js
scheduler.plugins({
    url: true
});
~~~


#### Связанные материалы

[Saving the scheduler state in URL](https://docs.dhtmlx.com/scheduler/samples/03_extensions/10_url_date_plugin.html)


## Week Agenda {#weekagenda}

:::info
Это расширение доступно только в PRO-версии
:::

Кодовый файл для представления Week Agenda.

~~~js
scheduler.plugins({
    week_agenda: true
});
~~~


#### Связанные материалы

Статья: [Неделя-Агенда (Week Agenda View)](views/weekagenda.md)


[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Year {#year}

Кодовый файл для представления Year.

~~~js
scheduler.plugins({
    year_view: true
});
~~~

#### Связанные материалы

Статья: [Годовой вид](views/year.md)


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)
