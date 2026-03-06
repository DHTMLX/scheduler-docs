---
sidebar_label: "onBeforeCollapse"
title: "onBeforeCollapse event"
description: "当用户点击展开图标，将调度器的大小从'全屏'切换回其原始大小时触发。"
---

# onBeforeCollapse

### Description

@short: 当用户点击展开图标，将调度器的大小从"全屏"切换回其原始大小时触发。

@signature: onBeforeCollapse: () =\> void

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeCollapse",function(){
    //在此处添加任何自定义逻辑
    return true;
});
~~~

### Details

:::note
 此事件需要启用 [expand](guides/extensions-list.md#expand) 扩展。 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
