---
sidebar_label: parse_exact_format
title: "parse_exact_format config"
description: "defines whether scheduler automatically identifies the format of data"
---

# parse_exact_format

### Description

@short: Defines whether scheduler automatically identifies the format of data

@signature: parse_exact_format: boolean

### Example

~~~jsx
scheduler.config.parse_exact_format = true;
const parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// the date string must match the exact format

parseDate("2027-01-15 12:00");
// -> Tue Jan 15 2027 12:00:00

parseDate("15-01-2027 12:00");
// -> Sun Jul 11 1920 12:00:00 

parseDate("2027-01-15T12:00");
// -> Invalid Date


scheduler.config.parse_exact_format = false;
const parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// scheduler will try to detect the provided date string format

parseDate("2027-01-15 12:00");
// -> Tue Jan 15 2027 12:00:00

parseDate("15-01-2027 12:00");
// -> Tue Jan 15 2027 12:00:00  

parseDate("2027-01-15T12:00");
// -> Tue Jan 15 2027 12:00:00
~~~

**Default value:** false

### Details

By default Scheduler tries to automatically identify the format of dates passed by the user for parsing (into the [scheduler.date.str_to_date()](api/other/date.md) method). 
In case you want to apply the exact format specified by the user during parsing, you should enable the **parse_exact_format** config by setting it to *true*.

### Related Guides
- [Operations with Dates](guides/date-formats.md)
