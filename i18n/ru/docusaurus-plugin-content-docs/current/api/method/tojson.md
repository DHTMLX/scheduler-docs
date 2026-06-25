--- 
sidebar_label: toJSON
title: "Метод toJSON"
description: "преобразует данные планировщика в формат JSON"
---

# toJSON

### Description

@short: Преобразует данные планировщика в формат JSON

@signature: toJSON: () =\> string

### Returns
- `string` - (string) - строка данных в формате JSON

### Example

~~~jsx
const str = scheduler.toJSON();
~~~

### Related samples
- [Сериализация событий планировщика](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 Метод требует включенного плагина [serialize](guides/extensions-list.md#serialize) для работы.
:::

Пользовательские атрибуты [могут быть настроены](export/serialization.md), если это необходимо.

### Related Guides
- [Сериализация данных в XML, JSON, iCal](export/serialization.md)