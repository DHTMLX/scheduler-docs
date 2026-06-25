---
sidebar_label: date
title: "date config"
description: "a set of date formatting methods"
---

# date

### Description

@short: A set of date formatting methods

@signature: date: SchedulerDateHelpers


### Details

The `date` object provides the following methods:

- `add()` - adds/subtracts the specified time interval to/from the date
    - `date` - (<i>Date</i>) the date object that you need to add time to/subtract time from
    - `number` - (<i>number</i>) the number of units to add. If this number is positive, the time will be added to the date; if negative, the time will be subtracted
    - `unit` - (<i>'minute', 'hour', 'day', 'week', 'month', 'year'</i>) the time unit

~~~js
// adds 1 year to the specified date: 29 June, 2027 -> 29 June, 2028
const newDate = scheduler.date.add(new Date(2027, 5, 29), 1, 'year');
~~~

- `convert_to_utc()` - converts local time to UTC
    - `date` - (<i>Date</i>) the date object to convert
  
~~~js
// 29 June, 2027 14:00 (local time) -> 29 June, 2027 12:00 (UTC)
const time = scheduler.date.convert_to_utc(new Date(2027, 5, 29, 14, 0));
~~~

- `copy()` - makes a copy of a Date object
    - `date` - (<i>Date</i>) the date object to copy
  
~~~js
const copy = scheduler.date.copy(new Date(2027, 5, 29)); // -> 29 June, 2027
~~~
  
- `date_part()` - resets the time part of the provided date to 00:00:00
    - `date` - (<i>Date</i>) the date object to format
  
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 00:00:00
const date = scheduler.date.date_part(new Date(2027, 5, 29, 14, 30, 10));
~~~
  
- `date_to_str()` - returns a function that converts a Date object to a string of the specified format
Parameters: `format` - (<i>string</i>) the date format (see [Date Format Specification](guides/settings-format.md))
`utc` - (<i>boolean</i>) specifies whether local time should be converted to UTC
  
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 5, 29)); // -> "29/06/2027"
~~~
  
- `day_start()` - resets the time part of the provided date to 00:00:00. Alias of the `date_part()` method. Used by the Day view to set the display date and can be redefined to provide the default behavior
Parameters: `date` - (<i>Date</i>) the date object to format

~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 00:00:00
const date = scheduler.date.day_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

> **Note**, the date passed to the method will actually be changed. You may prevent the original date from being changed by wrapping the input date with `new Date()`. For instance:

~~~js
const originalDate = new Date(2027, 5, 29, 14, 30, 10);
const dayStartDate = scheduler.date.day_start(new Date(originalDate));
~~~

- `getISOWeek()` - returns the week number of the date
    - `date` - (<i>Date</i>) the date object to format

~~~js
const week = scheduler.date.getISOWeek(new Date(2027, 5, 29)); // -> 26
~~~

- `getUTCISOWeek()` - returns the week number of the date, but previously converts local time to UTC
    - `date` - (<i>Date</i>) the date object to format

~~~js
const week = scheduler.date.getUTCISOWeek(new Date(2027, 5, 29)); // -> 26
~~~

- `month_start()` - returns a Date object of the first day of the month for the specified date and clears the time part to zero
    - `date` - (<i>Date</i>) the date object to format
  
~~~js
// 29 June, 2027 14:30 -> 01 June, 2027 00:00
const firstDay = scheduler.date.month_start(new Date(2027, 5, 29, 14, 30));
~~~

<span id="strtodate"></span>
- `str_to_date()` - returns a function that converts a string of the specified format to a Date object
Parameters: `format` - (<i>string</i>) the date format (see [Date Format Specification](guides/settings-format.md))
`utc` - (<i>boolean</i>) specifies whether local time should be converted to UTC
`parseExact` - (<i>boolean</i>) defines whether Scheduler identifies the format of a date automatically (*false*, default) or uses the format passed by a user (*true*)
~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 29 June, 2027 00:00:00
~~~

- `time_part()` - returns the time of a Date object as a number of seconds counted from midnight (00:00:00)
    - `date` - (<i>Date</i>) the date object to format
~~~js
const time = scheduler.date.time_part(new Date(2027, 5, 29, 14, 30, 10));
// time -> 52210
~~~

- `to_fixed()` - adds the leading zero to numbers less than 10 and returns the result as a string. Doesn't affect numbers from 10
    - `num` - (<i>number</i>) the number to format

~~~js
const num1 = scheduler.date.to_fixed(2); // -> "02"
const num2 = scheduler.date.to_fixed(10); // -> 10
~~~
  
- `week_start()` - returns a Date object of the first day of the week for the specified date and clears the time part to zero
    - `date` - (<i>Date</i>) the date object to format

~~~js
// 29 June, 2027 14:30 -> 28 June, 2027 00:00
const weekStart = scheduler.date.week_start(new Date(2027, 5, 29, 14, 30));
~~~
  
- `year_start()` - returns a Date object of the first day of the year for the specified date and clears the time part to zero
    - `date` - (<i>Date</i>) the date object to format
  
~~~js
// 29 June, 2027 14:30 -> 01 January, 2027 00:00
const yearStart = scheduler.date.year_start(new Date(2027, 5, 29, 14, 30));
~~~
