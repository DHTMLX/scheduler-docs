---
sidebar_label: "toICal"
title: "toICal method"
description: "wandelt Scheduler-Daten in das ICal-Format um"
---

# toICal

### Description

@short: Wandelt Scheduler-Daten in das ICal-Format um

@signature: toICal: (header?: string) =\> string

### Parameters

- `header` - (optional) *string* - legt den Wert des Header-Feldes des Inhalts fest

### Returns
- ` string` - (string) - einen String, der die Daten im ICal-Format enthält

### Example

~~~jsx
var str = scheduler.toICal();
//oder
var str = scheduler.toICal("Mein Kalender");
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 Die Methode erfordert, dass das [serialize](guides/extensions-list.md#serialize) Plugin aktiviert ist. 
:::

:::note

Benutzerdefinierte Attribute werden nicht unterstützt.
 
:::

### Related Guides
- [Daten-Serialisierung nach XML, JSON, iCal](export/serialization.md)
