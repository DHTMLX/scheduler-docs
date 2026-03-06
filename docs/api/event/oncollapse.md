---
sidebar_label: onCollapse
title: "onCollapse event"
description: "fires when a user clicks on the expand icon to change the scheduler's size from 'full screen' to original."
---

# onCollapse

### Description

@short: Fires when a user clicks on the expand icon to change the scheduler's size from 'full screen' to original.

@signature: onCollapse: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onCollapse",function(){
    //any custom logic here
});
~~~

### Details

:::note
 The event requires the [expand](guides/extensions-list.md#expand) extension to be enabled. 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
