---
sidebar_label: "getEvents"
title: "getEvents method"
description: "возвращает коллекцию событий, которые происходят в указанном временном интервале"
---

# getEvents

### Description

@short: Возвращает коллекцию событий, которые происходят в указанном временном интервале

@signature: getEvents: (from?: Date, to?: Date) =\> any[]

### Parameters

- `from` - (optional) *Date* - начальная дата периода
- `to` - (optional) *Date* - конечная дата периода

### Returns
- ` array` - (array) - массив объектов событий

### Example

~~~jsx
const evs = scheduler.getEvents(new Date(2024,1,10),new Date(2024,2,10)); 
evs.forEach((e) => console.log(e.text));
// или
const evs = scheduler.getEvents();// возвращает все события
~~~

### Related samples
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

Когда включена поддержка [recurring events](guides/recurring-events.md), поведение метода **getEvents** зависит от того, указаны ли параметры "from-to". 

#### Использование getEvents с recurring events

- Если указаны параметры **from-to**, метод возвращает все одиночные события, вхождения из повторяющихся серий и любые изменённые экземпляры в этом диапазоне:
~~~js
const today = scheduler.date.day_start(new Date());
const nextWeek = scheduler.date.add(today, 1, "week");
const events = scheduler.getEvents(today, nextWeek);
~~~

- Если параметры **from-to** опущены, метод возвращает все одиночные события, повторяющиеся серии как записи (а не отдельные вхождения), а также любые изменённые или удалённые экземпляры. Однако конкретные даты повторяющихся вхождений не включаются.

:::note
 В версиях до v7.1.2 метод **getEvents** требовал параметры "from-to" при активных повторяющихся событиях. Без них он возвращал пустой массив, так как расширение для recurring events могло генерировать бесконечные последовательности событий, что делало невозможным возврат всех вхождений. 
:::

Если повторяющиеся события отключены, метод ведёт себя одинаково независимо от наличия параметров. Если параметры не заданы, он просто возвращает все события.

### Change log
- обновлено в v7.1.2
