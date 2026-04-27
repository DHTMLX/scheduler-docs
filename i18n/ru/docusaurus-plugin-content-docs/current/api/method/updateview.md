---
sidebar_label: updateView
title: "updateView method"
description: "отображает указанный просмотр и дату (не вызывает никаких событий)"
---

# updateView

### Description

@short: Отображает указанный просмотр и дату (не вызывает никаких событий)

@signature: updateView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* -  дата, которую нужно установить
- `id` - (optional) *string* - имя вида

### Example

~~~jsx
// обновляет текущее представление и дату без внесения изменений
scheduler.updateView();
// показывает 4 июля 2027 года в текущем представлении
scheduler.updateView(new Date(2027,7,4));
// показывает 3 мая 2027 года в представлении Week
scheduler.updateView(new Date(2027,5,3), "week");
~~~

### Related samples
- [Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)

### Details

- При вызове без параметров функция просто обновит текущий просмотр.
- Имена видов по умолчанию: 'day', 'week', 'month'. Чтобы указать любой другой вид - используйте его параметр **name**.
- Метод аналогичен [setCurrentView](api/method/setcurrentview.md). Единственное отличие между методами состоит в том, что в отличие от **updateView**, [setCurrentView](api/method/setcurrentview.md) генерирует события [onBeforeViewChange](api/event/onbeforeviewchange.md), [onViewChange](api/event/onviewchange.md).

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)