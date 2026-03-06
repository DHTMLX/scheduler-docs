---
sidebar_label: load
title: "load method"
description: "loads data to the scheduler from an external data source"
---

# load

### Description

@short: Loads data to the scheduler from an external data source

@signature: load: (url: string, callback?: SchedulerCallback) =\> void

### Parameters

- `url` - (required) *string* - the server-side URL (may be a static file or a server-side script which outputs data in one of the supported formats)
- `callback` - (optional) *function* - the callback function

### Example

~~~jsx
scheduler.load("data"); // the format of loaded data is auto-detected
// or
scheduler.load("data",function(){
    alert("Data has been successfully loaded");
});
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

Pay attention that in case of dynamic loading the callback function that is passed as a second parameter will be called only during the initial loading of data.
While next portions of data will be loaded later, the callback function won't be called anymore.

If you need to call the callback function each time data is loaded into Scheduler, you can make use of the [onLoadEnd](api/event/onloadend.md) event.

## Migration

In v5.2 and upper, scheduler detects the format of data automatically. 

But before v5.2, the method included three parameters:

- **url** - (*string*)  the server-side URL (may be a static file or a server-side script which outputs data as XML)
- **type** - (*string*) <i>('json', 'xml', 'ical')</i> the data type. The default value - <i>'xml'</i>
- **callback** - (*function*) the callback function

### Related API
- [onLoadEnd](api/event/onloadend.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [Examples of Data Formats](guides/data-formats.md)
- [Loading Data](guides/loading-data.md)

### Change log
- The second **type** parameter of the method has been removed in v5.2.
