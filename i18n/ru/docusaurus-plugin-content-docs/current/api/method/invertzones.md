---
sidebar_label: "invertZones"
title: "invertZones method"
description: "инвертирует заданные часовые пояса"
---

# invertZones

### Description

@short: Инвертирует заданные часовые пояса

@signature: invertZones: (zones: any[]) =\> void

### Parameters

- `zones` - (required) *array* - массив **[start_minute,end_minute,..,start_minute_N,end_minute_N]** <br>каждая пара в котором определяет конкретный временной диапазон (в минутах). Массив может содержать любое <br>количество таких пар

### Example

~~~jsx
var zones = scheduler.invertZones([500, 1000]); // => [0, 500, 1000, 1440]
~~~

### Details

:::note

Доступно начиная с версии 3.5
 
:::

:::note
 Этот метод требует включенного плагина [limit](guides/extensions-list.md#limit). 
:::
