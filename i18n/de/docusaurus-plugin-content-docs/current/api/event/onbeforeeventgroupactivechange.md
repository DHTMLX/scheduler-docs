---
sidebar_label: onBeforeEventGroupActiveChange
title: "onBeforeEventGroupActiveChange-Ereignis"
description: "wird ausgelöst, bevor eine Ereignisgruppe ihren aktiven Zustand ändert"
---

# onBeforeEventGroupActiveChange

### Beschreibung

@short: Wird ausgelöst, bevor eine Ereignisgruppe ihren aktiven Zustand ändert

@signature: onBeforeEventGroupActiveChange: (key: string | number | boolean, active: boolean) => boolean

### Parameter

- `key` - (erforderlich) *string | number | boolean* - der Gruppenschlüssel, dessen Zustand geändert wird
- `active` - (erforderlich) *boolean* - der angeforderte aktive Zustand

### Rückgabewert

- `result` - (boolean) - geben Sie `false` zurück, um die Änderung abzubrechen

### Beispiel

~~~js
scheduler.attachEvent("onBeforeEventGroupActiveChange", (key, active) => {
    return key !== "personal" || active;
});
~~~

### Details

Das Ereignis wird ausgelöst, bevor `scheduler.ext.eventGroups.setActive()` eine Gruppe ändert und bevor die Ereignisgruppenliste eine Kontrollkästchenänderung anwendet. Die Rückgabe von `false` behält den aktuellen Zustand bei und verhindert, dass `onEventGroupActiveChange` ausgelöst wird.