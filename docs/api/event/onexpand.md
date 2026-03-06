---
sidebar_label: onExpand
title: "onExpand event"
description: "fires when a user clicks on the expand icon to change the scheduler's size from original to 'full screen'."
---

# onExpand

### Description

@short: Fires when a user clicks on the expand icon to change the scheduler's size from original to 'full screen'.

@signature: onExpand: () =\> void


### Example

~~~jsx
scheduler.attachEvent("onExpand",function(){
    //any custom logic here
});
~~~

### Details

:::note
 The event requires the [expand](guides/extensions-list.md#expand) extension to be enabled. 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
