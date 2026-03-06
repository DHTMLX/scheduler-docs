---
sidebar_label: "onBeforeCollapse"
title: "onBeforeCollapse event"
description: "Wird ausgelöst, wenn der Benutzer auf das Expand-Icon klickt, um die Größe des Schedulers von 'Vollbild' zurück auf die ursprüngliche Größe zu ändern."
---

# onBeforeCollapse

### Description

@short: Wird ausgelöst, wenn der Benutzer auf das Expand-Icon klickt, um die Größe des Schedulers von „Vollbild" zurück auf die ursprüngliche Größe zu ändern.

@signature: onBeforeCollapse: () =\> void

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder gestoppt wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeCollapse",function(){
    //fügen Sie hier benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

:::note
 Dieses Event erfordert die aktive [expand](guides/extensions-list.md#expand) Erweiterung. 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
