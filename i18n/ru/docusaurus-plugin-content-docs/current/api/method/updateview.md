---
sidebar_label: updateView
title: "метод updateView"
description: "отображает указанный вид и дату (не вызывает никаких событий)"
---

# updateView

### Description

@short: Отображает указанный вид и дату (не вызывает никаких событий)

@signature: updateView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - дата, которую нужно установить
- `view` - (optional) *string* - имя вида

### Example

~~~jsx
// отображает текущий вид и дату. Ничего не изменяет, просто обновляет
scheduler.updateView();
// отображает 2027-08-04 в текущем активном виде
scheduler.updateView(new Date(2027, 7, 4));
// отображает 2027-06-03 в недельном виде
scheduler.updateView(new Date(2027, 5, 3), "week");
~~~

### Related samples
- [Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)

### Details

- При вызове без параметров функция просто обновит текущий вид.
- Имена видов по умолчанию: 'day', 'week', 'month'. Чтобы указать любой другой вид, используйте его параметр `name`.
- Метод аналогичен [`setCurrentView()`](api/method/setcurrentview.md). Единственное отличие состоит в том, что в отличие от `updateView()`, [`setCurrentView()`](api/method/setcurrentview.md) генерирует события [`onBeforeViewChange`](api/event/onbeforeviewchange.md) и [`onViewChange`](api/event/onviewchange.md).

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)