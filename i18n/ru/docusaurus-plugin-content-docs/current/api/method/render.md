---
sidebar_label: render
title: "render метод"
description: "Перерисовывает планировщик"
---

# render

### Description

@short: Перерисовывает планировщик

@signature: render: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - дата, которую нужно отобразить
- `view` - (optional) *string* - имя отображаемого вида

### Example

~~~jsx
// обновить layout с новой конфигурацией
scheduler.config.hour_size_px = 88;
scheduler.render();


// переключиться на другую дату
scheduler.render(new Date(2027,7,4));

// переключиться на другой view
scheduler.render(null, "week");
~~~

### Details

Этот метод является псевдонимом для [scheduler.setCurrentView](api/method/setcurrentview.md) и работает идентично ему.

- Имена представлений по умолчанию: 'day', 'week', 'month'. Чтобы указать любое другое представление — используйте его параметр <b>name</b>.
- Метод вызывает [onBeforeViewChange](api/event/onbeforeviewchange.md) и [onViewChange](api/event/onviewchange.md).
- Метод похож на [updateView](api/method/updateview.md). Единственное различие между методами состоит в том, что [updateView](api/method/updateview.md)  **не генерирует никаких событий**.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)