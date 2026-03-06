---
sidebar_label: "toJSON"
title: "toJSON method"
description: "将调度器的数据转换为 JSON 格式的字符串"
---

# toJSON

### Description

@short: 将调度器的数据转换为 JSON 格式的字符串

@signature: toJSON: () =\> string

### Returns
- `string` - (string) - 包含 JSON 格式数据的字符串

### Example

~~~jsx
var str = scheduler.toJSON();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 该方法需要启用 [serialize](guides/extensions-list.md#serialize) 插件。 
:::

如果需要，您可以[配置自定义属性](export/serialization.md)。

### Related Guides
- [데이터 직렬화: XML, JSON, iCal](export/serialization.md)
