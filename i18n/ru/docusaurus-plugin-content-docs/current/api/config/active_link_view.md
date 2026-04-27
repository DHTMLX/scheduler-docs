---
sidebar_label: active_link_view
title: "конфигурация active_link_view"
description: "позволяет отображать числа дней в месячном виде как кликабельные ссылки, которые открывают соответствующий день в указанном представлении"
---

# active_link_view

### Description

@short: "позволяет отображать числа дней в месячном виде как кликабельные ссылки, которые открывают соответствующий день в указанном представлении"

@signature: active_link_view: string

### Example

~~~jsx
scheduler.config.active_link_view = "week"; // указывает представление, к которому будет переход из Month view
...
scheduler.init('scheduler_here',new Date(2012,7,6),"month");
~~~

**Значение по умолчанию:** day

**Доступные представления:** [Month view](views/month.md)

### Related samples
- [Дни месяца как ссылки](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)
- [Выделенные временные диапазоны во месячном виде](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note
 Свойство требует активации плагина [active_links](guides/extensions-list.md#active-links). 
:::

Свойство должно быть установлено на имя представления, в котором вы хотите открыть дни месяца.

### Related Guides
- [Месячный просмотр](views/month.md#presenting-days-numbers-as-clickable-links)