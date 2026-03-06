---
sidebar_label: "month_events_link"
title: "month_events_link template"
description: "управляет отображением ссылки «View more» внутри ячейки просмотра месяца"
---

# month_events_link

### Description

@short: Управляет отображением ссылки «View more» внутри ячейки просмотра месяца

@signature: month_events_link: (date: Date, count: number) =\> string

### Parameters

- `date` - (required) *Date* - дата, соответствующая ячейке месяца
- `count` - (required) *number* - общее количество событий для этой ячейки

### Returns
- ` text` - (string) - html-контент, который будет отображён в scheduler

### Example

~~~jsx
// стандартная реализация
scheduler.templates.month_events_link = function(date, count){
    return "<a>View more("+count+" events)</a>";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Related API
- [max_month_events](api/config/max_month_events.md)
- [onViewMoreClick](api/event/onviewmoreclick.md)

### Related Guides
- [Шаблоны для Месячного Вида](views/month-view-templates.md)
- [Месячный вид](views/month.md#limitingthenumberofeventsinacell)
