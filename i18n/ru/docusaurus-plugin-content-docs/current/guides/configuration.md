---
title: "Общие инструкции по настройке"
sidebar_label: "Общие инструкции по настройке"
---

# Общие инструкции по настройке

Для настройки внешнего вида планировщика библиотека предоставляет три основных объекта:

- [scheduler.config](api/overview/properties_overview.md) - параметры для настройки дат, шкал, элементов управления и других опций.
- [scheduler.templates](api/overview/templates_overview.md) - шаблоны для форматирования дат, заголовков, тултипов и стилей.
- [scheduler.xy](api/other/xy.md) - настройки, определяющие размеры различных элементов планировщика.

Кроме того, dhtmlxScheduler включает [несколько расширений](#extensions), которые позволяют расширить функциональность компонента.

## scheduler.config

Библиотека содержит широкий набор опций конфигурации в объекте **scheduler.config**.

Чтобы применить опцию, просто присвойте ей значение, как показано в документации (или замените *scheduler* на имя вашего *экземпляра dhtmlxScheduler*, если вы используете [несколько планировщиков на странице](guides/multiple-per-page.md)).

Обратите внимание, что параметры конфигурации должны быть заданы до инициализации планировщика.

~~~js
scheduler.config.first_hour = 8;/*!*/
scheduler.config.last_hour = 17;/*!*/
scheduler.config.start_on_monday = true;/*!*/
scheduler.init('scheduler_here',null,"week");
~~~

Полный список свойств **scheduler.config** приведён в разделе [Scheduler API: Properties](api/overview/properties_overview.md).


[Multi-day events](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/06_multi_day_events.html)


## scheduler.templates

Шаблоны позволяют настраивать отображение дат и заголовков в планировщике.

Чтобы определить шаблон, присвойте ему функцию, как показано ниже (или замените *scheduler* на имя вашего *экземпляра dhtmlxScheduler*, если вы используете [несколько планировщиков на странице](guides/multiple-per-page.md)). Убедитесь, что вы определили шаблоны до инициализации планировщика.

~~~js
scheduler.templates.event_text = function(start,end,ev){/*!*/
   return 'Subject: ' + ev.text + '';/*!*/
};/*!*/
scheduler.init('scheduler_here',null,"week");
~~~

:::note
Рекомендуется переопределять шаблоны внутри обработчика события [onTemplatesReady](api/event/ontemplatesready.md), чтобы ваши шаблоны не были перезаписаны шаблонами по умолчанию.
:::

![templates.png](/img/templates.png)

Полный список доступных шаблонов смотрите в разделе [Scheduler API: Templates](api/overview/templates_overview.md).


[Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)


## scheduler.xy

Объект [scheduler.xy](api/other/xy.md) содержит свойства для управления шириной, высотой и отступами элементов планировщика в различных режимах отображения.

Чтобы задать эти параметры, присвойте им значения, как показано ниже (или замените *scheduler* на имя вашего *экземпляра dhtmlxScheduler*, если вы используете [несколько планировщиков на странице](guides/multiple-per-page.md)). Не забудьте применить настройки размеров до инициализации планировщика.

~~~js
scheduler.xy.scale_height = 40; //задаёт высоту оси X  /*!*/
scheduler.init('scheduler_here',new Date(),"month");
~~~

:::note
Все свойства в scheduler.xy используют тип данных 'number'.
:::


[Customizing the scheduler header](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/03_header_format.html)


## Расширения {#extensions}

Для добавления специальных возможностей в компонент Scheduler можно активировать различные расширения. Например, включение расширения **cookie** позволяет сохранять текущее состояние планировщика (такие как режим и дата) в cookies.

~~~js
scheduler.plugins({
    cookie: true
});
~~~


[Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)


Список доступных расширений Scheduler приведён в статье [Полный список расширений](guides/extensions-list.md).
