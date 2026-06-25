---
sidebar_label: invertZones
title: "invertZones метод"
description: "инвертирует указанные часовые пояса"
---

# invertZones

### Description

@short: Инвертирует указанные часовые пояса

@signature: invertZones: (zones: any[]) =\> void

### Parameters

- `zones` - (required) *массив* - массив **[start_minute,end_minute,..,start_minute_N,end_minute_N]** <br >где каждая пара задаёт определённый диапазон ограничений (в минутах). Массив может содержать любое <br> количество таких пар

### Example

~~~jsx
const zones = scheduler.invertZones([500, 1000]); // => [0, 500, 1000, 1440]
~~~

### Details

:::note

Доступно с версии 3.5
 
:::  

:::note
 Метод требует активации плагина [limit](guides/extensions-list.md#limit). 
:::