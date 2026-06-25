---
sidebar_label: load_format
title: "load_format template"
description: "specifies the format of requests in the dynamic loading mode"
---

# load_format

### Description

@short: Specifies the format of requests in the dynamic loading mode

@signature: load_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.load_format = function(date){
    const dateToStr_func = scheduler.date.date_to_str(scheduler.config.load_date);
    return  dateToStr_func(date);
    
}
~~~

### Details

The default format of requests is:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

where DATEHERE - a valid date value in the format defined by the [load_date](api/config/load_date.md) option *(according to the default definition of the **load_format** template).*

### Related API
- [setLoadMode](api/method/setloadmode.md)
- [load_date](api/config/load_date.md)

### Related Guides
- [Loading Data](guides/loading-data.md#dynamic-loading)
