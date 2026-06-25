---
sidebar_label: toJSON
title: "toJSON method"
description: "converts scheduler's data into the JSON format"
---

# toJSON

### Description

@short: Converts scheduler's data into the JSON format

@signature: toJSON: () =\> string

### Returns
- `string` - (string) - a data string in the JSON format

### Example

~~~jsx
const str = scheduler.toJSON();
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 The method requires the [serialize](guides/extensions-list.md#serialize) plugin to be enabled. 
:::

Custom attributes [can be configured](export/serialization.md) if necessary.

### Related Guides
- [Data Serialization to XML, JSON, iCal](export/serialization.md)
