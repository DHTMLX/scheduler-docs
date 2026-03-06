---
sidebar_label: "onLimitViolation"
title: "onLimitViolation event"
description: "当用户尝试为事件分配一个当前受限或被阻止的时间时触发"
---

# onLimitViolation

### Description

@short: 当用户尝试为事件分配一个当前受限或被阻止的时间时触发

@signature: onLimitViolation: (id: string, obj: object) =\> void;

### Parameters

- `id` - (required) *string* - 事件的id
- `obj` - (required) *object* - 事件对象

### Example

~~~jsx
scheduler.attachEvent("onLimitViolation", function  (id, obj){
    //这里可以添加自定义逻辑
});
~~~

### Details

每当用户尝试将事件的时间设置为受限或被阻止的时间段时，此事件就会触发。这些限制可以通过以下方式配置:

- [limit_start](api/config/limit_start.md) 和 [limit_end](api/config/limit_end.md) 选项
- [addMarkedTimespan](api/method/addmarkedtimespan.md) 方法

:::note

从此事件处理程序返回 'true'，允许事件绕过限制并被分配到不允许的时间。
 
:::
