---
sidebar_label: "toICal"
title: "toICal method"
description: "将调度器数据转换为ICal格式"
---

# toICal

### Description

@short: 将调度器数据转换为ICal格式

@signature: toICal: (header?: string) =\> string

### Parameters

- `header` - (optional) *string* - 设置内容的header字段值

### Returns
- ` string` - (string) - 包含ICal格式数据的字符串

### Example

~~~jsx
var str = scheduler.toICal();
//或者
var str = scheduler.toICal("My calendar");
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 该方法需要启用[serialize](guides/extensions-list.md#serialize)插件。 
:::

:::note

不支持自定义属性。
 
:::

### Related Guides
- [데이터 직렬화: XML, JSON, iCal](export/serialization.md)
