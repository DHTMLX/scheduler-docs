---
sidebar_label: "onConfirmedBeforeEventDelete"
title: "onConfirmedBeforeEventDelete event"
description: "当用户点击删除按钮并确认删除（无论是在事件条还是详情窗口中）后立即触发"
---

# onConfirmedBeforeEventDelete

### Description

@short: 当用户点击删除按钮并确认删除（无论是在事件条还是详情窗口中）后立即触发

@signature: onConfirmedBeforeEventDelete: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 事件的ID
- `e` - (required) *Event* - 一个原生事件对象

### Returns
- ` result` - (boolean) - 决定默认事件操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onConfirmedBeforeEventDelete", function(id,e){
    // 可以在这里放置自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回 *false* 将阻止默认行为的发生。
