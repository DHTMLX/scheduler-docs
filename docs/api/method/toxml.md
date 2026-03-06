---
sidebar_label: toXML
title: "toXML method"
description: "converts scheduler's data into the XML format"
---

# toXML

### Description

@short: Converts scheduler's data into the XML format

@signature: toXML: () =\> string

### Returns
- ` string` - (string) - a data string in the XML format

### Example

~~~jsx
var str = scheduler.toXML();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 The method requires the [serialize](guides/extensions-list.md#serialize) plugin to be enabled. 
:::

- Custom attributes [can be configured](export/serialization.md) if necessary.
- The method can be used with recurring events.
