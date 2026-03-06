---
sidebar_label: parse
title: "parse method"
description: "loads data from a client-side resource"
---

# parse

### Description

@short: Loads data from a client-side resource

@signature: parse: (data: any) =\> void

### Parameters

- `data` - (required) *object* - a string or object which represents data

### Example

~~~jsx
scheduler.parse([
     { start_date:"2020-05-13 6:00", end_date:"2020-05-13 8:00", text:"Event 1"},
     { start_date:"2020-06-09 6:00", end_date:"2020-06-09 8:00", text:"Event 2"}
]);
~~~

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

## Migration

In v5.2 and upper, scheduler detects the format of data automatically. 

But before v5.2, the method included two parameters:

- **data** - (*object*)    a string or object which represents data;
- **type** - (*string*)    optional, (<i>'json', 'xml', 'ical'</i>) the data type. The default value - <i>'xml'</i>

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [parse_date](api/template/parse_date.md)

### Related Guides
- [Examples of Data Formats](guides/data-formats.md)

### Change log
- The second **type** parameter of the method has been removed in v5.2.
