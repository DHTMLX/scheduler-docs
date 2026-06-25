--- 
sidebar_label: onBeforeViewChange
title: "onBeforeViewChange-Ereignis"
description: "Wird ausgelöst, bevor der Benutzer die aktuelle Ansicht auf eine andere ändert"
---

# onBeforeViewChange

### Description

@short: Wird ausgelöst, bevor der Benutzer die aktuelle Ansicht auf eine andere ändert

@signature: onBeforeViewChange: (old_mode: string, old_date: Date, mode: string, date: Date) =\> boolean

### Parameters

- `old_mode` - (required) *string* - die aktuell aktive Ansicht
- `old_date` - (required) *Date* - das aktuell aktive Datum
- `mode` - (required) *string* - die neue Ansicht
- `date` - (required) *Date* - das neue Datum

### Returns
- `result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (`true`) oder abgebrochen wird (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeViewChange", (old_mode, old_date, mode, date) => {
    // any custom logic here
    return true;
});
~~~

### Related samples
- [Konfigurieren der Map-Ansicht](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

- Das Event ist blockierbar. Gibt man `false` zurück, lässt der Scheduler die aktuelle Ansicht offen.
- Das Event wird auch ausgelöst, wenn der Scheduler beim ersten Rendern der Seite initial gerendert wird. In diesem Fall sind die Parameter `old_mode` und `old_date` undefiniert.