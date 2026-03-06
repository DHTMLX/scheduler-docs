---
sidebar_label: "onCollapse"
title: "onCollapse event"
description: "当用户点击展开图标，将调度器从'全屏'切换回原始大小时触发。"
---

# onCollapse

### Description

@short: 当用户点击展开图标，将调度器从"全屏"切换回原始大小时触发。

@signature: onCollapse: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onCollapse",function(){
    //在这里编写自定义逻辑
});
~~~

### Details

:::note
 该事件需要启用[expand](guides/extensions-list.md#expand)扩展。 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
