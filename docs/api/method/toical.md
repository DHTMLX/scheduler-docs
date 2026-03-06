---
sidebar_label: toICal
title: "toICal method"
description: "converts scheduler's data to the ICal format"
---

# toICal

### Description

@short: Converts scheduler's data to the ICal format

@signature: toICal: (header?: string) =\> string

### Parameters
- `header` - (optional) *string* - sets the value for the content's header field

### Returns
- ` string` - (string) - a data string in the ICal format

### Example

~~~jsx
var str = scheduler.toICal();
//or
var str = scheduler.toICal("My calendar");
~~~

### Related samples
- [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)

### Details

:::note
 The method requires the [serialize](guides/extensions-list.md#serialize) plugin to be enabled. 
:::

:::note

Custom attributes are not supported.
 
:::

### Related Guides
- [Data Serialization to XML, JSON, iCal](export/serialization.md)
