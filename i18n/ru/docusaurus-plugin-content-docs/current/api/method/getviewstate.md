---
sidebar_label: getViewState
title: "Метод getViewState"
description: Возвращает последнее завершенное состояние представления Scheduler
---

# getViewState

### Описание

@short: Возвращает последнее завершенное состояние представления Scheduler

@signature: getViewState(): ViewState | null

### Возвращаемое значение

- `state` - (ViewState | null) - последнее опубликованное состояние представления или `null` до первой завершенной отрисовки

### Пример

~~~js
const state = scheduler.getViewState();
if (state) {
  console.log(state.mode, state.label);
}
~~~

### Детали

Возвращает текущие режим, дату, метку даты и ARIA-метку, которыми управляет Scheduler, или `null` до первой завершенной отрисовки. Возвращаемая дата является копией. Это состояние имеет приоритет над значением `views` в Toolbar, в том числе после прямых вызовов `updateView()`.
