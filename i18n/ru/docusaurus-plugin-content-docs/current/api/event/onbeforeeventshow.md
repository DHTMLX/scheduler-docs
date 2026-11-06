---
sidebar_label: onBeforeEventShow
title: "Событие onBeforeEventShow"
description: "срабатывает перед показом Scheduler события, запрошенного методом 'showEvent'"
---

# onBeforeEventShow

### Описание

@short: Срабатывает перед показом Scheduler события, запрошенного методом `showEvent`

@signature: onBeforeEventShow: (event: object, view: string) =\> boolean

### Параметры

- `event` - (обязательный) *object* - объект события
- `view` - (обязательный) *string* - имя представления, в котором показывается событие

### Возвращаемое значение

- `result` - (boolean) - определяет, будет ли действие выполнено (**true**) или отменено (**false**)

### Пример

~~~js
scheduler.attachEvent("onBeforeEventShow", function(event, view){
    return true;
});
~~~

### Детали

Событие относится к жизненному циклу `showEvent()`. Оно не выполняется при обычной отрисовке событий; для фильтрации используйте [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md).

### Миграция с v7.2

Это событие заменяет прежнее событие жизненного цикла `onBeforeEventDisplay(event, view)`. Переименуйте его в `onBeforeEventShow`; аргументы `(event, view)` не меняются.

### Связанный API

- [showEvent](api/method/showevent.md)
- [onAfterEventShow](api/event/onaftereventshow.md)
- [Миграция с v7.2 на v8.0](migration.md#event-display-and-showevent-lifecycle-events)