---
sidebar_label: event_groups
title: "Настройка event_groups"
description: "настраивает коллекции групп событий"
---

# event_groups

### Описание

@short: Настраивает коллекции групп событий

@signature: event_groups: EventGroupsConfig | false

### Пример

~~~js
scheduler.config.event_groups = { list: "calendars", property: "calendarId", default: "work" };
scheduler.serverList("calendars", [
    { key: "work", label: "Work", color: "#537cfa", textColor: "#fff" },
    { key: "personal", label: "Personal", color: "#39a675", active: false }
]);
~~~

### Детали

Группы событий — встроенная возможность, для которой не нужен плагин. Объект конфигурации включает их; `false`, `null` или отсутствие значения отключает их при следующей отрисовке. Значения по умолчанию: `list: "event_groups"` и `property: "group"`.

### Параметры конфигурации

| Параметр | Тип | Описание |
| --- | --- | --- |
| `list` | *string* | Имя коллекции с определениями групп. По умолчанию — `"event_groups"`. |
| `property` | *string* | Свойство события, в котором хранится ключ группы. По умолчанию — `"group"`. |
| `default` | *string \| number \| boolean* | Ключ, назначаемый новому событию, если он обозначает активную группу. |

Каждый элемент коллекции использует свойства `key`, `label` и необязательные `color`, `textColor`, `active`. Неактивные группы скрывают свои события. Неизвестные, пустые, массивы и другие multisection-значения остаются видимыми без цвета группы. Не используйте multisection-свойство в качестве `property`.

`default` назначается новым событиям, если он обозначает активную группу. В противном случае Scheduler использует первую активную группу. Группы событий не добавляют раздел в стандартный lightbox; добавьте раздел `select`, если пользователь должен выбирать группу.

### Связанный API

- [eventGroups](api/other/eventgroups.md)

### Связанные руководства

- [Группы событий](guides/event-groups.md)
- [Пользовательские цвета событий](guides/custom-events-color.md)