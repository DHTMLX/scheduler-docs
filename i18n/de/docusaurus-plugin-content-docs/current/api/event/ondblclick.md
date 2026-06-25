---
sidebar_label: onDblClick
title: "onDblClick Event"
description: "Wird ausgelöst, wenn der Benutzer ein Event doppelt anklickt"
---

# onDblClick

### Description

@short: Wird ausgelöst, wenn der Benutzer ein Event doppelt anklickt

@signature: onDblClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (erforderlich) *string* - die Event-ID
- `e` - (erforderlich) *Event* - ein natives Event-Objekt

### Returns
- `result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (`true`) oder abgebrochen wird (`false`)

### Example

~~~jsx
scheduler.attachEvent("onDblClick", (id, e) => {
    // any custom logic here
    return true;
});
~~~

### Details

Das Event ist blockierbar. Geben Sie `false` zurück, um das Standardverhalten zu verhindern.