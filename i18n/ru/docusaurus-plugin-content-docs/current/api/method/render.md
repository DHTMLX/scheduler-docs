---
sidebar_label: "render"
title: "render method"
description: "обновляет отображение scheduler-а"
---

# render

### Description

@short: Обновляет отображение scheduler-а

@signature: render: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - дата для отображения
- `view` - (optional) *string* - название view, на которое нужно переключиться

### Example

~~~jsx
// обновить layout с новой конфигурацией
scheduler.config.hour_size_px = 88;
scheduler.render();


// переключиться на другую дату
scheduler.render(new Date(2020,7,4));

// переключиться на другой view
scheduler.render(null, "week");
~~~

### Details

Этот метод является алиасом для [scheduler.setCurrentView](api/method/setcurrentview.md) и работает аналогично.

- Стандартные имена view включают 'day', 'week' и 'month'. Для других view используйте их параметр <b>name</b>.
- Вызов этого метода запускает события [onBeforeViewChange](api/event/onbeforeviewchange.md) и [onViewChange](api/event/onviewchange.md).
- Он похож на [updateView](api/method/updateview.md), но ключевое отличие в том, что [updateView](api/method/updateview.md) **не вызывает никаких событий**.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)
