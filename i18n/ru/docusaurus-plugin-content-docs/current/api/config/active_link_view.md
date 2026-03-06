---
sidebar_label: "active_link_view"
title: "active_link_view config"
description: "Позволяет отображать номера дней в Month view в виде кликабельных ссылок, которые открывают соответствующий день в выбранном представлении."
---

# active_link_view

### Description

@short: Позволяет отображать номера дней в Month view в виде кликабельных ссылок, которые открывают соответствующий день в выбранном представлении.

@signature: active_link_view: string

### Example

~~~jsx
scheduler.config.active_link_view = "week"; // указывает представление, к которому будет переход из Month view
...
scheduler.init('scheduler_here',new Date(2012,7,6),"month");
~~~

**Default value:** day

**Applicable views:** [Month view](views/month.md)

### Related samples
- [Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note
 Для работы данной настройки требуется включение плагина [active_links](guides/extensions-list.md#activelinks). 
:::

Установите это свойство в имя представления, на которое должны ссылаться номера дней месяца.

### Related Guides
- [Месячный вид](views/month.md#presentingdaysnumbersasclickablelinks)
