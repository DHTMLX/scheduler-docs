---
sidebar_label: "onExpand"
title: "onExpand event"
description: "Wird ausgelöst, wenn ein Benutzer auf das Expand-Symbol klickt, um die Größe des Schedulers vom Originalzustand auf 'Vollbild' zu wechseln."
---

# onExpand

### Description

@short: Wird ausgelöst, wenn ein Benutzer auf das Expand-Symbol klickt, um die Größe des Schedulers vom Originalzustand auf „Vollbild" zu wechseln.

@signature: onExpand: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onExpand",function(){
    //any custom logic here
});
~~~

### Details

:::note
 Das Event benötigt die aktivierte [expand](guides/extensions-list.md#expand) Erweiterung. 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
