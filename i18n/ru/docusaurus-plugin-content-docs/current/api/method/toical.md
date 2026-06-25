---
sidebar_label: toICal
title: "toICal метод"
description: "преобразует данные планировщика в формат iCal"
---

# toICal

### Description

@short: Преобразует данные планировщика в формат iCal

@signature: toICal: (header?: string) =\> string

### Parameters
- `header` - (optional) *string* - устанавливает значение для поля заголовка содержимого

### Returns
- ` string` - (string) - строка данных в формате iCal

### Example

~~~jsx
var str = scheduler.toICal();
//или
var str = scheduler.toICal("My calendar");
~~~

### Related samples
- [Сериализация событий планировщика](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
Метод требует включения плагина [serialize](guides/extensions-list.md#serialize).
:::

:::note

Пользовательские атрибуты не поддерживаются.
 
:::

### Related Guides
- [Сериализация данных в XML, JSON, iCal](export/serialization.md)