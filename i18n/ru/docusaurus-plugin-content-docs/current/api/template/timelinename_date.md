---
sidebar_label: "TIMELINE_date"
title: "TIMELINE_date template"
description: "определяет дату, отображаемую в заголовке вида"
---

# TIMELINE_date
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет дату, отображаемую в заголовке вида

@signature: TIMELINE_date: (date1: Date, date2: Date) =\> string;

### Parameters

- `date1` - (required) *Date* - начальная дата события
- `date2` - (required) *Date* - конечная дата события

### Returns
- ` text` - (string) - html текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.timeline_date = function(date1, date2){
    if (date1.getDay()==date2.getDay() && date2-date1<(24*60*60*1000))
            return scheduler.templates.day_date(date1);
        return scheduler.templates.week_date(date1, date2); 
};
~~~

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Шаблон требует включения плагина [timeline](guides/extensions-list.md#timeline). 
:::

Если шаблон [timeline_date](api/template/timelinename_date.md) не определён, дата в заголовке будет отображаться в формате, используемом шаблоном [week_date](api/template/week_date.md).

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
