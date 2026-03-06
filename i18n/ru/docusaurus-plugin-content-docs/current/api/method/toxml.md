---
sidebar_label: "toXML"
title: "toXML method"
description: "преобразует данные планировщика в формат XML"
---

# toXML

### Description

@short: Преобразует данные планировщика в формат XML

@signature: toXML: () =\> string

### Returns
- ` string` - (string) - строка, содержащая данные в формате XML

### Example

~~~jsx
var str = scheduler.toXML();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 Для работы метода требуется включенный плагин [serialize](guides/extensions-list.md#serialize). 
:::

- При необходимости можно настроить пользовательские атрибуты [как описано здесь](export/serialization.md).
- Этот метод поддерживает работу с повторяющимися событиями.
