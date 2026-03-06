---
sidebar_label: "onBeforeExpand"
title: "onBeforeExpand event"
description: "当用户点击展开图标，将调度器从原始大小切换到'全屏'时触发。"
---

# onBeforeExpand

### Description

@short: 当用户点击展开图标，将调度器从原始大小切换到"全屏"时触发。

@signature: onBeforeExpand: () =\> boolean

### Returns
- ` result` - (boolean) - 指示默认事件动作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeExpand",function(){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

:::note
 该事件需要启用 [expand](guides/extensions-list.md#expand) 插件。 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
