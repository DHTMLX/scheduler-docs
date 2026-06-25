---
sidebar_label: onBeforeDrag
title: "onBeforeDrag-Ereignis"
description: "wird ausgelöst, wenn der Benutzer die Drag-/Resize-Operation startet (Version 2.1+)"
---

# onBeforeDrag

### Description

@short: Wird ausgelöst, wenn der Benutzer die Drag-/Resize-Operation startet (Version 2.1+)

@signature: onBeforeDrag: (id: string, mode: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - die ID des Events
- `mode` - (required) *string* - der Drag-Modus: "move","resize" oder "create"
- `e` - (required) *Event* - ein natives Event-Objekt

### Returns
- `result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (`true`) oder abgebrochen wird (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeDrag", (id, mode, e) => {
    // any custom logic here
    return true;
});
~~~

### Related samples
- [Schreibgeschützte Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Schreibgeschützte Events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Das Ereignis wird ausgelöst, wenn der Benutzer im Scheduler auf das verschiebbare Element klickt.

Für den Modus "create" wird der Wert von `id` nicht bereitgestellt, da ein neues Ereignis noch nicht erstellt wurde.