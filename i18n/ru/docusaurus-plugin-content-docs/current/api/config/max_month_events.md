---
sidebar_label: "max_month_events"
title: "max_month_events config"
description: "контролирует максимальное количество событий, отображаемых в одной ячейке"
---

# max_month_events

### Description

@short: Контролирует максимальное количество событий, отображаемых в одной ячейке

@signature: max_month_events: number

### Example

~~~jsx
scheduler.config.max_month_events = 5;
..
scheduler.init('scheduler_here', new Date(2013,5,30),"month");
~~~

**Applicable views:** [Month view](views/month.md)

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

Когда количество событий, назначенных ячейке, превышает этот предел, scheduler показывает ссылку «View more». Нажатие на эту ссылку переводит пользователя в Day view, где все события этого дня отображаются полностью.

![max_month_events_property](/img/max_month_events_property.png)

### Related API
- [month_events_link](api/template/month_events_link.md)
- [onViewMoreClick](api/event/onviewmoreclick.md)

### Related Guides
- [Месячный вид](views/month.md#limitingthenumberofeventsinacell)
