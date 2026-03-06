---
sidebar_label: "toICal"
title: "toICal method"
description: "преобразует данные планировщика в формат ICal"
---

# toICal

### Description

@short: Преобразует данные планировщика в формат ICal

@signature: toICal: (header?: string) =\> string

### Parameters

- `header` - (optional) *string* - устанавливает значение поля заголовка содержимого

### Returns
- ` string` - (string) - строка, содержащая данные в формате ICal

### Example

~~~jsx
var str = scheduler.toICal();
//или
var str = scheduler.toICal("My calendar");
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 Метод требует включения плагина [serialize](guides/extensions-list.md#serialize). 
:::

:::note

Пользовательские атрибуты не поддерживаются.
 
:::

### Related Guides
- [Сериализация данных в XML, JSON, iCal](export/serialization.md)
