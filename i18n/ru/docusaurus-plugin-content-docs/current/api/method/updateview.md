---
sidebar_label: "updateView"
title: "updateView method"
description: "отображает указанное представление и дату без вызова каких-либо событий"
---

# updateView

### Description

@short: Отображает указанное представление и дату без вызова каких-либо событий

@signature: updateView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (required) *Date* - (необязательно) дата для установки
- `view` - (required) *string* - (необязательно) имя представления

### Example

~~~jsx
// обновляет текущее представление и дату без внесения изменений
scheduler.updateView();
// показывает 4 июля 2012 года в текущем представлении
scheduler.updateView(new Date(2012,7,4));
// показывает 3 мая 2012 года в представлении Week
scheduler.updateView(new Date(2012,5,3), "week");
~~~

### Related samples
- [Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)

### Details

- Вызов этой функции без параметров просто обновляет текущее представление. 
- Стандартные имена представлений: 'day', 'week' и 'month'. Для использования любого другого представления укажите его параметр **name**.
- Этот метод похож на [setCurrentView](api/method/setcurrentview.md). Главное отличие в том, что в отличие от **updateView**, [setCurrentView](api/method/setcurrentview.md) вызывает события [onBeforeViewChange](api/event/onbeforeviewchange.md) и [onViewChange](api/event/onviewchange.md).

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
