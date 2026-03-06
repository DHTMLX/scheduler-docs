---
sidebar_label: api_date
title: "api_date template"
description: "specifies the format of dates that are set by means of API methods. Used to parse incoming dates"
---

# api_date

### Description

@short: Specifies the format of dates that are set by means of API methods. Used to parse incoming dates

@signature: api_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.api_date = function(date){
    return scheduler.date.str_to_date(scheduler.config.api_date);
};
~~~
