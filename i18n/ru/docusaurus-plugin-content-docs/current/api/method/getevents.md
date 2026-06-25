---
sidebar_label: getEvents
title: "Метод getEvents"
description: "возвращает коллекцию событий, происходящих в указанном периоде"
---

# getEvents

### Description

@short: Возвращает коллекцию событий, происходящих в указанном периоде

@signature: getEvents: (from?: Date, to?: Date) =\> any[]

### Parameters

- `from` - (optional) *Date* - начальная дата периода
- `to` - (optional) *Date* - конечная дата периода

### Returns
- ` array` - (массив) - массив объектов событий

### Example

~~~jsx
const evs = scheduler.getEvents(new Date(2027,1,10),new Date(2027,2,10)); 
evs.forEach((e) => console.log(e.text));
// или
const evs = scheduler.getEvents();// возвращает все события
~~~

### Related samples
- [Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Выделенные диапазоны времени в месячном виде](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

Если включена поддержка [повторяющихся событий](guides/recurring-events.md), поведение метода **getEvents** зависит от того, заданы ли параметры "from-to".

#### Using getEvents with Recurring Events

- Если заданы параметры **from-to**, метод вернёт все одиночные события, вхождения повторяющихся серий и их изменённые экземпляры в заданном диапазоне:
~~~js
const today = scheduler.date.day_start(new Date());
const nextWeek = scheduler.date.add(today, 1, "week");
const events = scheduler.getEvents(today, nextWeek);
~~~

- Если параметры **from-to** не заданы, метод вернёт все одиночные события, повторяющиеся серии (в виде записей, а не отдельных вхождений) и их изменённые/удалённые экземпляры. Однако отдельные даты вхождений для повторяющихся событий не будут включены.

:::note
 В версиях ранее чем v7.1.2 метод **getEvents** требовал параметров "from-to" при включённых повторяющихся событиях. Без этих параметров метод возвращал пустой массив, поскольку расширение для повторяющихся событий позволяло бесконечные последовательности событий, что делало невозможным возвращать бесконечный массив.
:::

Если повторяющиеся события отключены, метод будет работать корректно как с параметрами, так и без них. Но если вы не укажете ни одного параметра, метод вернёт все события.

### Change log
- обновлено в v7.1.2