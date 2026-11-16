---
sidebar_label: onEventGroupActiveChange
title: "onEventGroupActiveChange-Ereignis"
description: "wird ausgelöst, nachdem eine Ereignisgruppe ihren aktiven Zustand geändert hat"
---

# onEventGroupActiveChange

### Beschreibung

@short: Wird ausgelöst, nachdem eine Ereignisgruppe ihren aktiven Zustand geändert hat

@signature: onEventGroupActiveChange: (key: string | number | boolean, active: boolean) => void

### Parameter

- `key` - (erforderlich) *string | number | boolean* - der geänderte Gruppenschlüssel
- `active` - (erforderlich) *boolean* - der neue aktive Zustand der Gruppe

### Beispiel

~~~js
scheduler.attachEvent("onEventGroupActiveChange", (key, active) => {
    console.log(key, active ? "is visible" : "is hidden");
});
~~~

### Details

Das Ereignis wird ausgelöst, nachdem eine Ereignisgruppe über `scheduler.ext.eventGroups.setActive()` oder die Ereignisgruppenliste der Sidebar ihren Zustand geändert hat. Scheduler aktualisiert im Rahmen der Änderung die Ereignisanzeige.