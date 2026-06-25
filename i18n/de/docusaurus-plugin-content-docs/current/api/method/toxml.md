---
sidebar_label: "toXML"
title: "toXML method"
description: "wandelt die Daten des Schedulers in das XML-Format um"
---

# toXML

### Description

@short: Wandelt die Daten des Schedulers in das XML-Format um

@signature: toXML: () =\> string

### Returns
- ` string` - (string) - einen String, der die Daten im XML-Format enthält

### Example

~~~jsx
const str = scheduler.toXML();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 Die Methode erfordert, dass das [serialize](guides/extensions-list.md#serialize) Plugin aktiviert ist. 
:::

- Benutzerdefinierte Attribute [können bei Bedarf konfiguriert werden](export/serialization.md).
- Diese Methode unterstützt die Verwendung mit wiederkehrenden Ereignissen.
