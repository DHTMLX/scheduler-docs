---
sidebar_label: setCurrentView
title: "setCurrentView метод"
description: "отображает указанный вид и дату"
---

# setCurrentView

### Description

@short: Отображает указанный вид и дату

@signature: setCurrentView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - дата, которая будет отображаться
- `view` - (optional) *string* - название вида, который нужно отобразить

### Example

~~~jsx
// отображает текущий вид и дату. Ничего не изменяет, просто обновляется
scheduler.setCurrentView();
// отображает 2027-08-04 в текущем активном виде
scheduler.setCurrentView(new Date(2027, 7, 4));
// отображает 2027-06-03 в представлении Week
scheduler.setCurrentView(new Date(2027, 5, 3), "week");
~~~

### Related samples
- [Мини-календарь в заголовке планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Мини-календарь вне планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

- Названия видов по умолчанию: 'day', 'week', 'month'. Чтобы указать другой вид, используйте его параметр `name`.
- Метод вызывает [`onBeforeViewChange`](api/event/onbeforeviewchange.md) и [`onViewChange`](api/event/onviewchange.md).
- Метод аналогичен [`updateView()`](api/method/updateview.md). Единственное отличие состоит в том, что [`updateView()`](api/method/updateview.md) не генерирует никаких событий.

### Related API
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)