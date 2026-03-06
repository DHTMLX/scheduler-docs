---
sidebar_label: "tooltip_text"
title: "tooltip_text template"
description: "задаёт текст, отображаемый в тултипах"
---

# tooltip_text

### Description

@short: Задаёт текст, отображаемый в тултипах

@signature: tooltip_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - объект события

### Returns
- ` text` - (string) - html содержимое для отображения внутри tooltip scheduler'а

### Example

~~~jsx
scheduler.templates.tooltip_text = function(start,end,ev){
    return "<b>Event:</b> "+ev.text+"<br/><b>Start date:</b> " + 
    scheduler.templates.tooltip_date_format(start)+ 
    "<br/><b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};
~~~

**Applicable views:** [Agenda view](views/agenda.md), [Day view](views/day.md), [Map view](views/map.md), [Month view](views/month.md), [Week view](views/week.md), [Week Agenda view](views/weekagenda.md), [Units view](views/units.md)

### Details

:::note
 Этот шаблон работает только если плагин [tooltip](guides/extensions-list.md#tooltip) включён. 
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- [Общие шаблоны](guides/common-templates.md#tooltips)
