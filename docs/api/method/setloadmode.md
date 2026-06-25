---
sidebar_label: setLoadMode
title: "setLoadMode method"
description: "sets the mode that allows loading data by parts (enables the dynamic loading)"
---

# setLoadMode

### Description

@short: Sets the mode that allows loading data by parts (enables the dynamic loading)

@signature: setLoadMode: (mode: string) =\> void

### Parameters

- `mode` - (required) *string* - the loading mode

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";
scheduler.init('scheduler_here',new Date(2027,10,1),"month");

scheduler.setLoadMode("month")
scheduler.load("data/events.php");
~~~

### Related samples
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

:::note

The method should be called after the **scheduler.init()** call, but before loading data into the scheduler.
 
:::

By default, scheduler loads all data at once. But it may become problematic, when you are using big event collections. In such situations, you should load data by parts, necessary to fill the viewable area of the scheduler.

The **mode** parameter can take only one of the predefined set of values. The predefined values are:

- day;  
- week;
- month;
- year.


For example, if you set the 'month' mode, the scheduler will request data just for the current month and load the remaining ones on demand. 
[Read more about the loading modes](guides/loading-data.md#dynamic-loading).

#### Request

Generated requests look like this:

~~~php
Data?from=DATEHERE&to=DATEHERE
~~~

*where DATEHERE - a valid date value in the format defined by the [load_date](api/config/load_date.md) option.*

<br>

If you are using [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) on the server side, you don't need to do any additional server-side operations to parse data.

### Related API
- [load_date](api/config/load_date.md)
- [load_format](api/template/load_format.md)

### Related Guides
- [Loading Data](guides/loading-data.md#dynamic-loading)
