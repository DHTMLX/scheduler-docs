---
sidebar_label: onBeforeEventDisplay
title: "Событие onBeforeEventDisplay"
description: "фильтрует события перед отрисовкой"
---

# onBeforeEventDisplay

### Описание

@short: Срабатывает перед отрисовкой события и позволяет запретить его показ

@signature: onBeforeEventDisplay: (id: string | number, event: object) =\> boolean

### Параметры

- `id` - (обязательный) *string | number* - идентификатор события
- `event` - (обязательный) *object* - объект события

### Возвращаемое значение
- `result` - (boolean) - определяет, будет ли действие выполнено (**true**) или отменено (**false**)

### Пример

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(id, event){
    return event.priority !== "low";
});
~~~

### Детали

Событие срабатывает для каждого события, рассматриваемого для отрисовки, включая экземпляры повторяющихся событий и события для отметок мини-календаря. Оно выполняется вместе с функцией `filter_<view>` текущего представления.

Можно подключить несколько обработчиков `onBeforeEventDisplay`. Событие показывается, только если фильтр представления и все обработчики возвращают `true`. Отключение одного обработчика не влияет на остальные.

### Миграция с v7.2

В v7.2 `onBeforeEventDisplay(event, view)` относилось к жизненному циклу `showEvent()`. В v8.0 используйте для этого [onBeforeEventShow](api/event/onbeforeeventshow.md). Событие v8.0 `onBeforeEventDisplay` — описанный здесь предикат отрисовки, получающий `(id, event)`.

### Связанный API
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [onAfterEventShow](api/event/onaftereventshow.md)