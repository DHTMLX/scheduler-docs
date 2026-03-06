---
sidebar_label: "onCollapse"
title: "onCollapse event"
description: "Wird ausgelöst, wenn der Benutzer auf das Expand-Symbol klickt, um den Scheduler vom 'Vollbild' -Modus zurück auf seine ursprüngliche Größe zu wechseln."
---

# onCollapse

### Description

@short: Wird ausgelöst, wenn der Benutzer auf das Expand-Symbol klickt, um den Scheduler vom „Vollbild"-Modus zurück auf seine ursprüngliche Größe zu wechseln.

@signature: onCollapse: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onCollapse",function(){
    //hier kann benutzerdefinierte Logik eingefügt werden
});
~~~

### Details

:::note
 Das Event erfordert, dass die [expand](guides/extensions-list.md#expand) Erweiterung aktiviert ist. 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
