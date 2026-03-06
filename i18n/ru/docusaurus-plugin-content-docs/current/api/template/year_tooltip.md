---
sidebar_label: "year_tooltip"
title: "year_tooltip template"
description: "определяет tooltip, который отображается над ячейкой дня с запланированным событием(ями)"
---

# year_tooltip

### Description

@short: Определяет tooltip, который отображается над ячейкой дня с запланированным событием(ями)

@signature: year_tooltip: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - объект события

### Returns
- ` text` - (string) - html-содержимое для отображения в tooltip планировщика

### Example

~~~jsx
scheduler.templates.year_tooltip = function(start,end,ev){
    return ev.text;
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Этот template работает только если плагин [year_view](guides/extensions-list.md#year) включен. 
:::

### Related Guides
- [Шаблоны годового вида](views/year-view-templates.md)
