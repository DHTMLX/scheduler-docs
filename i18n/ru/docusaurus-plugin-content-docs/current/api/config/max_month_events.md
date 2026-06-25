---
sidebar_label: max_month_events
title: "Конфигурация max_month_events"
description: "задает максимальное количество событий, которые можно отобразить в ячейке"
---

# max_month_events

### Description

@short: Устанавливает максимальное количество событий, которые можно отобразить в ячейке

@signature: max_month_events: number

### Example

~~~jsx
scheduler.config.max_month_events = 5;
..
scheduler.init('scheduler_here', new Date(2027,5,30),"month");
~~~

**Доступные представления:** [Month view](views/month.md)

### Related samples
- ['Показать ещё' ссылка на Вид месяца](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

Если количество назначенных событий превышает значение опции, планировщик отобразит ссылку 'Показать ещё'. Эта ссылка перенаправит пользователя на Вид дня, отображающий полный список назначенных событий.

![max_month_events_property](/img/max_month_events_property.png)

### Related API
- [month_events_link](api/template/month_events_link.md)
- [onViewMoreClick](api/event/onviewmoreclick.md)

### Related Guides
- [Месячный вид](views/month.md)