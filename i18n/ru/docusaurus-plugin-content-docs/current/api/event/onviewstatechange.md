---
sidebar_label: onViewStateChange
title: "Событие onViewStateChange"
description: Срабатывает после публикации состояния представления Scheduler
---

# onViewStateChange

### Описание

@short: Срабатывает после публикации состояния представления Scheduler

@signature: onViewStateChange: (state: ViewState) => void

### Параметры

- `state` - (обязательный) *ViewState* - опубликованное состояние представления Scheduler

### Пример

~~~js
scheduler.attachEvent("onViewStateChange", state => {
    document.title = state.label;
});
~~~

### Детали

Срабатывает после публикации режима, даты, метки даты или ARIA-состояния представления Scheduler. Получает ту же структуру, что и `getViewState()`, и также выполняется после прямого вызова `updateView()`.
