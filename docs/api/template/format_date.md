---
sidebar_label: format_date
title: "format_date template"
description: "сonverts date object to a date string. Used to send data back to the server"
---

# format_date

### Description

@short: Сonverts date object to a date string. Used to send data back to the server

@signature: format_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - a text representation of the date

### Example

~~~jsx
const dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

### Details

Check [Date Format Specification](guides/settings-format.md).

### Related Guides
- [Loading Data](guides/loading-data.md)
- [Operations with Dates](guides/date-formats.md)
- [Server-Side Integration](guides/server-integration.md)
- [Date Format Specification](guides/settings-format.md)
