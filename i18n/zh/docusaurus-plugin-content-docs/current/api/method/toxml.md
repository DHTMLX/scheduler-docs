---
sidebar_label: "toXML"
title: "toXML method"
description: "将调度器的数据转换为XML格式"
---

# toXML

### Description

@short: 将调度器的数据转换为XML格式

@signature: toXML: () =\> string

### Returns
- ` string` - (string) - 一个包含XML格式数据的字符串

### Example

~~~jsx
const str = scheduler.toXML();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 该方法需要启用[serialize](guides/extensions-list.md#serialize) 插件。 
:::

- 如有需要，可以[配置](export/serialization.md)自定义属性。
- 此方法支持与重复事件一起使用。
