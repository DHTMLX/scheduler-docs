---
sidebar_label: "onBeforeEventDelete"
title: "onBeforeEventDelete event"
description: "在用户点击删除按钮（无论是在事件栏还是详情窗口）后立即触发"
---

# onBeforeEventDelete

### Description

@short: 在用户点击删除按钮（无论是在事件栏还是详情窗口）后立即触发

@signature: onBeforeEventDelete: (id: string, ev: object) =\> boolean

### Parameters

- `id` - (required) *string* - 事件的id
- `ev` - (required) *object* - 事件的数据对象

### Returns
- ` result` - (boolean) - 决定默认事件操作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDelete", function(id,ev){
    // 在这里放置任何自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回 *false* 将停止默认的删除流程。
