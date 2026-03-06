---
sidebar_label: onBeforeCollapse
title: "onBeforeCollapse event"
description: "fires when a user clicks on the expand icon to change the scheduler's size from 'full screen' to original."
---

# onBeforeCollapse

### Description

@short: Fires when a user clicks on the expand icon to change the scheduler's size from 'full screen' to original.

@signature: onBeforeCollapse: () =\> void

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeCollapse",function(){
    //any custom logic here
    return true;
});
~~~

### Details

:::note
 The event requires the [expand](guides/extensions-list.md#expand) extension to be enabled. 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
