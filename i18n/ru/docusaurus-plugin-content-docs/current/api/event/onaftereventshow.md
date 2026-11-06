---
sidebar_label: onAfterEventShow
title: "Событие onAfterEventShow"
description: "срабатывает после показа Scheduler события, запрошенного методом 'showEvent'"
---

# onAfterEventShow

### Описание

@short: Срабатывает после показа Scheduler события, запрошенного методом `showEvent`

@signature: onAfterEventShow: (event: object, view: string) =\> void

### Параметры

- `event` - (обязательный) *object* - объект события
- `view` - (обязательный) *string* - имя представления, в котором показывается событие

### Пример

~~~js
scheduler.attachEvent("onAfterEventShow", function(event, view){
    console.log("event is displayed in " + view);
});
~~~

### Детали

Событие относится к жизненному циклу `showEvent()` и срабатывает после переключения Scheduler на представление с запрошенным событием.

### Миграция с v7.2

Это событие заменяет прежнее событие жизненного цикла `onAfterEventDisplay(event, view)`. Переименуйте его в `onAfterEventShow`; аргументы `(event, view)` не меняются.

### Связанный API

- [showEvent](api/method/showevent.md)
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [Миграция с v7.2 на v8.0](migration.md#event-display-and-showevent-lifecycle-events)