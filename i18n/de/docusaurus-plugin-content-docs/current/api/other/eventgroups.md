---
sidebar_label: eventGroups
title: "eventGroups-API"
description: "steuert aktive Ereignisgruppen"
---

# eventGroups

### Beschreibung

@short: Steuert aktive Ereignisgruppen

@signature: scheduler.ext.eventGroups: EventGroupsApi

### Beispiel

~~~js
scheduler.ext.eventGroups.setActive("personal", false);
if (scheduler.ext.eventGroups.isActive("work")) {
    scheduler.render();
}
~~~

### Details

`setActive(key, active)` ändert den aktiven Zustand einer bekannten Gruppe und gibt `true` zurück, wenn er sich ändert. Zuerst wird `onBeforeEventGroupActiveChange` ausgelöst; gibt dieses Ereignis `false` zurück, wird die Gruppe nicht geändert. Eine erfolgreiche Änderung zeichnet Scheduler neu und löst `onEventGroupActiveChange` aus. `isActive(key)` gibt zurück, ob eine bekannte Gruppe aktiv ist.

### Verwandte Anleitungen

- [Ereignisgruppen](guides/event-groups.md)