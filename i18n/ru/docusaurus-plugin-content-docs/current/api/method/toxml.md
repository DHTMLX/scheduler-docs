---
sidebar_label: toXML
title: "Метод toXML"
description: "преобразует данные планировщика в XML-формат"
---

# toXML

### Description

@short: Преобразует данные планировщика в формат XML

@signature: toXML: () =\> string

### Returns
- ` string` - (string) - строка данных в формате XML

### Example

~~~jsx
const str = scheduler.toXML();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 Метoд требует включения плагина [serialize](guides/extensions-list.md#serialize) для его включения.
:::

- Пользовательские атрибуты [can be configured](export/serialization.md) можно настроить по мере необходимости.
- Метод можно использовать с повторяющимися событиями.