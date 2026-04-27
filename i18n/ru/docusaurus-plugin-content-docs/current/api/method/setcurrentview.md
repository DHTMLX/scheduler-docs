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

- `date` - (необязательно) *Date* - дата для отображения
- `view` - (необязательно) *string* - имя вида для отображения

### Example

~~~jsx
// обновляет текущий view и дату без внесения изменений
scheduler.setCurrentView();
// показывает 4 июля 2027 года в текущем view
scheduler.setCurrentView(new Date(2027,7,4));
// показывает 3 мая 2027 года в view "week"
scheduler.setCurrentView(new Date(2027,5,3), "week");
~~~

### Related samples
- [Мини-календарь в шапке планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Мини-календарь вне планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

- Имена представлений по умолчанию: 'day', 'week', 'month'. Чтобы указать любое другое представление — используйте его <b>name</b> параметр.
- Метод вызывает [onBeforeViewChange](api/event/onbeforeviewchange.md) и [onViewChange](api/event/onviewchange.md).
- Метод аналогичен [updateView](api/method/updateview.md). Единственное различие между методами состоит в том, что [updateView](api/method/updateview.md)  **не генерирует никаких событий**.

### Related API
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)