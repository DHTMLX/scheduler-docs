---
sidebar_label: "onEventLoading"
title: "onEventLoading event"
description: "当事件从数据源加载时触发"
---

# onEventLoading

### Description

@short: 当事件从数据源加载时触发

@signature: onEventLoading: (ev: object) =\> boolean;

### Parameters

- `ev` - (required) *object* - 事件对象（表示数据项）

### Returns
- ` result` - (boolean) - 决定默认事件操作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onEventLoading", function(ev){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

- 此事件可以被阻止。返回 *false* 会阻止该数据项加载到 scheduler 中。
- 每个数据源中的数据项都会触发此事件。
