---
sidebar_label: "invertZones"
title: "invertZones method"
description: "kehrt die angegebenen Zeitzonen um"
---

# invertZones

### Description

@short: Kehrt die angegebenen Zeitzonen um

@signature: invertZones: (zones: any[]) =\> void

### Parameters

- `zones` - (required) *array* - ein Array **[start_minute,end_minute,..,start_minute_N,end_minute_N]** <br> wobei jedes Paar einen bestimmten Zeitbereich (in Minuten) definiert. Das Array kann eine beliebige <br> Anzahl dieser Paare enthalten

### Example

~~~jsx
var zones = scheduler.invertZones([500, 1000]); // => [0, 500, 1000, 1440]
~~~

### Details

:::note

Verfügbar ab Version 3.5
 
:::

:::note
 Diese Methode benötigt das aktivierte [limit](guides/extensions-list.md#limit) Plugin. 
:::
