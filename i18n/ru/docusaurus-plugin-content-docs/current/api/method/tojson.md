---
sidebar_label: "toJSON"
title: "toJSON method"
description: "преобразует данные планировщика в строку в формате JSON"
---

# toJSON

### Description

@short: Преобразует данные планировщика в строку в формате JSON

@signature: toJSON: () =\> string

### Returns
- `string` - (string) - строка, содержащая данные в формате JSON

### Example

~~~jsx
var str = scheduler.toJSON();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 Метод требует включения плагина [serialize](guides/extensions-list.md#serialize). 
:::

При необходимости вы можете [настроить пользовательские атрибуты](export/serialization.md).

### Related Guides
- [Сериализация данных в XML, JSON, iCal](export/serialization.md)
