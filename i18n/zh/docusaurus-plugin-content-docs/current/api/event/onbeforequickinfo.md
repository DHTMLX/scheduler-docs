---
sidebar_label: "onBeforeQuickInfo"
title: "onBeforeQuickInfo event"
description: "在 Quick Info 弹出窗口显示之前触发的事件"
---

# onBeforeQuickInfo

### Description

@short: 在 Quick Info 弹出窗口显示之前触发的事件

@signature: onBeforeParse: (id: string | number) =\> void

### Parameters
- `id` - (required) *number | string* - 事件的 id

### Example

~~~jsx
scheduler.attachEvent("onBeforeQuickInfo", function(id) {
   if(scheduler.getEvent(id).readonly){
       return false;
   }
   
   return true;
});
~~~

### Details

此事件可以被阻止。返回 false 将阻止默认行为的执行。

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md#quickinfoextension)
