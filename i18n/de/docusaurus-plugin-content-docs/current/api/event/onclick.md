---
sidebar_label: onClick
title: "onClick event"
description: "Löst aus, wenn der Benutzer die linke Maustaste auf einem Event klickt"
---

# onClick

### Description

@short: Wird ausgelöst, wenn der Benutzer die linke Maustaste auf einem Event klickt

@signature: onClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (erforderlich) *string* - die Event-ID
- `e` - (erforderlich) *Event* - ein natives Event-Objekt

### Returns
- `result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (`true`) oder abgebrochen wird (`false`)

### Example

~~~jsx
scheduler.attachEvent("onClick", (id, event) => {
    // any custom logic here
    return true;
});
~~~

### Related samples
- [Ausblenden der Auswahlleiste der Event-Box](https://docs.dhtmlx.com/scheduler/samples/02_customization/10_without_toolbar.html)
- [Schreibgeschützte Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

Das Event ist blockierbar. Wenn der Handler einen Wert ungleich `true` zurückgibt, wird die Standardreaktion blockiert. Standardmäßig erscheint die Auswahlleiste.

### Related Guides
- [Manipulationen mit Lightbox](guides/lightbox-editors-manipulations.md#opening-the-lightbox-on-a-single-click)