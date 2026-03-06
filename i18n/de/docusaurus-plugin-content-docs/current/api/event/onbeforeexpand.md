---
sidebar_label: "onBeforeExpand"
title: "onBeforeExpand event"
description: "Wird ausgelöst, wenn der Benutzer auf das Expand-Symbol klickt, um den Scheduler von seiner ursprünglichen Größe auf den 'Vollbild'-Modus umzuschalten."
---

# onBeforeExpand

### Description

@short: Wird ausgelöst, wenn der Benutzer auf das Expand-Symbol klickt, um den Scheduler von seiner ursprünglichen Größe auf den „Vollbild"-Modus umzuschalten.

@signature: onBeforeExpand: () =\> boolean

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeExpand",function(){
    //benutzerdefinierte Logik kann hier hinzugefügt werden
    return true;
});
~~~

### Details

:::note
 Das Event erfordert, dass das [expand](guides/extensions-list.md#expand) Plugin aktiviert ist. 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
