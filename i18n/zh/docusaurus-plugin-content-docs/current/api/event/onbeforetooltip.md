---
sidebar_label: "onBeforeTooltip"
title: "onBeforeTooltip event"
description: "在 tooltip 即将显示于某个数据项之前触发（仅当启用 'tooltip' 扩展时生效）"
---

# onBeforeTooltip

### Description

@short: 在 tooltip 即将显示于某个数据项之前触发（仅当启用 'tooltip' 扩展时生效）

@signature: onBeforeTooltip: (id: string) =\> boolean

### Parameters

- `id` - (required) *string* - 即将显示 tooltip 的数据项的 ID

### Returns
- ` result` - (boolean) - 决定默认事件动作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeTooltip", function (id){
    // 在这里编写自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回 *false* 将阻止 tooltip 的显示。
