---
sidebar_label: invertZones
title: "invertZones method"
description: "inverts the specified time zones"
---

# invertZones

### Description

@short: Inverts the specified time zones

@signature: invertZones: (zones: any[]) =\> void

### Parameters

- `zones` - (required) *array* - an array **[start_minute,end_minute,..,start_minute_N,end_minute_N]** <br >where each pair sets a certain limit range (in minutes). The array can have any <br> number of such pairs

### Example

~~~jsx
var zones = scheduler.invertZones([500, 1000]); // => [0, 500, 1000, 1440]
~~~

### Details

:::note

Available from version 3.5
 
:::

:::note
 The method requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::
