---
sidebar_label: "onExpand"
title: "onExpand event"
description: "当用户点击展开图标，将调度器的大小从原始状态切换到'全屏'时触发。"
---

# onExpand

### Description

@short: 当用户点击展开图标，将调度器的大小从原始状态切换到"全屏"时触发。

@signature: onExpand: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onExpand",function(){
    //在此处添加自定义逻辑
});
~~~

### Details

:::note
 该事件需要启用 [expand](guides/extensions-list.md#expand) 扩展。 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
