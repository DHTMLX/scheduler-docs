---
sidebar_label: eventGroups
title: "API eventGroups"
description: "управляет активными группами событий"
---

# eventGroups

### Описание

@short: Управляет активными группами событий

@signature: scheduler.ext.eventGroups: EventGroupsApi

### Пример

~~~js
scheduler.ext.eventGroups.setActive("personal", false);
if (scheduler.ext.eventGroups.isActive("work")) {
    scheduler.render();
}
~~~

### Детали

`setActive(key, active)` изменяет активное состояние известной группы и возвращает `true`, если оно изменилось. Сначала вызывается `onBeforeEventGroupActiveChange`; если событие возвращает `false`, группа не изменяется. Успешное изменение перерисовывает Scheduler и вызывает `onEventGroupActiveChange`. `isActive(key)` возвращает, активна ли известная группа.

### Связанные руководства

- [Группы событий](guides/event-groups.md)