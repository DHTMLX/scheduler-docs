---
sidebar_label: onBeforeExpand
title: "onBeforeExpand event"
description: "fires when a user clicks on the expand icon to change the scheduler's size from original to 'full screen'."
---

# onBeforeExpand

### Description

@short: Fires when a user clicks on the expand icon to change the scheduler's size from original to 'full screen'.

@signature: onBeforeExpand: () =\> boolean

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeExpand",function(){
    //any custom logic here
    return true;
});
~~~

### Details

:::note
 The event requires the [expand](guides/extensions-list.md#expand) plugin to be enabled. 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
