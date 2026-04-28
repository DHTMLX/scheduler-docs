---
sidebar_label: "toJSON"
title: "toJSON method"
description: "Wandelt die Daten des Schedulers in einen JSON-formatierten String um"
---

# toJSON

### Description

@short: Wandelt die Daten des Schedulers in einen JSON-formatierten String um

@signature: toJSON: () =\> string

### Returns
- `string` - (string) - Ein String, der die Daten im JSON-Format enthält

### Example

~~~jsx
const str = scheduler.toJSON();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 Die Methode erfordert, dass das [serialize](guides/extensions-list.md#serialize) Plugin aktiviert ist. 
:::

Sie können bei Bedarf [benutzerdefinierte Attribute konfigurieren](export/serialization.md).

### Related Guides
- [Daten-Serialisierung nach XML, JSON, iCal](export/serialization.md)
