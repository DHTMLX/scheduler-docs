---
sidebar_label: "setCurrentView"
title: "setCurrentView method"
description: "показывает выбранный view и дату"
---

# setCurrentView

### Description

@short: Показывает выбранный view и дату

@signature: setCurrentView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - дата для отображения
- `view` - (optional) *string* - имя view для отображения

### Example

~~~jsx
// обновляет текущий view и дату без внесения изменений
scheduler.setCurrentView();
// показывает 4 июля 2012 года в текущем view
scheduler.setCurrentView(new Date(2012,7,4));
// показывает 3 мая 2012 года в view "week"
scheduler.setCurrentView(new Date(2012,5,3), "week");
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

- Стандартные имена view включают 'day', 'week' и 'month'. Для любого другого view используйте его параметр <b>name</b>.
- Вызов этого метода запускает события [onBeforeViewChange](api/event/onbeforeviewchange.md) и [onViewChange](api/event/onviewchange.md).
- Этот метод похож на [updateView](api/method/updateview.md), но ключевое отличие в том, что [updateView](api/method/updateview.md) **не вызывает никаких событий**.

### Related API
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)
