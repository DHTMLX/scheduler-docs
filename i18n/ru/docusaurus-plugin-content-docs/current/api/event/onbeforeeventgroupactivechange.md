---
sidebar_label: onBeforeEventGroupActiveChange
title: "Событие onBeforeEventGroupActiveChange"
description: "срабатывает перед изменением активного состояния группы событий"
---

# onBeforeEventGroupActiveChange

### Описание

@short: Срабатывает перед изменением активного состояния группы событий

@signature: onBeforeEventGroupActiveChange: (key: string | number | boolean, active: boolean) => boolean

### Параметры

- `key` - (обязательный) *string | number | boolean* - ключ группы, состояние которой изменяется
- `active` - (обязательный) *boolean* - запрошенное активное состояние

### Возвращаемое значение

- `result` - (boolean) - верните `false`, чтобы отменить изменение

### Пример

~~~js
scheduler.attachEvent("onBeforeEventGroupActiveChange", (key, active) => {
    return key !== "personal" || active;
});
~~~

### Детали

Событие срабатывает до того, как `scheduler.ext.eventGroups.setActive()` изменит группу, и до применения изменения флажка в списке групп. Возврат `false` сохраняет текущее состояние и предотвращает срабатывание `onEventGroupActiveChange`.