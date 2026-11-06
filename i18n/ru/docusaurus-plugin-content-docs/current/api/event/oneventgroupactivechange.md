---
sidebar_label: onEventGroupActiveChange
title: "Событие onEventGroupActiveChange"
description: "срабатывает после изменения активного состояния группы событий"
---

# onEventGroupActiveChange

### Описание

@short: Срабатывает после изменения активного состояния группы событий

@signature: onEventGroupActiveChange: (key: string | number | boolean, active: boolean) => void

### Параметры

- `key` - (обязательный) *string | number | boolean* - изменившийся ключ группы
- `active` - (обязательный) *boolean* - новое активное состояние группы

### Пример

~~~js
scheduler.attachEvent("onEventGroupActiveChange", (key, active) => {
    console.log(key, active ? "is visible" : "is hidden");
});
~~~

### Детали

Событие срабатывает после изменения состояния группы через `scheduler.ext.eventGroups.setActive()` или список групп событий в Sidebar. В рамках изменения Scheduler обновляет отображение событий.