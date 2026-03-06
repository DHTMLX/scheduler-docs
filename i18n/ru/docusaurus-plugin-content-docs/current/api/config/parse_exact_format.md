---
sidebar_label: "parse_exact_format"
title: "parse_exact_format config"
description: "управляет строгим соответствием формата даты при разборе в scheduler"
---

# parse_exact_format

### Description

@short: Управляет строгим соответствием формата даты при разборе в scheduler

@signature: parse_exact_format: boolean

### Example

~~~jsx
scheduler.config.parse_exact_format = true;
var parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// строка с датой должна точно соответствовать указанному формату

parseDate("2019-01-15 12:00");
// -> Tue Jan 15 2019 12:00:00

parseDate("15-01-2019 12:00");
// -> Sun Jul 11 1920 12:00:00 

parseDate("2019-01-15T12:00");
// -> Invalid Date


scheduler.config.parse_exact_format = false;
var parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// scheduler пытается распознать формат переданной строки с датой

parseDate("2019-01-15 12:00");
// -> Tue Jan 15 2019 12:00:00

parseDate("15-01-2019 12:00");
// -> Tue Jan 15 2019 12:00:00  

parseDate("2019-01-15T12:00");
// -> Tue Jan 15 2019 12:00:00
~~~

**Default value:** false

### Details

По умолчанию Scheduler пытается автоматически определить формат дат, передаваемых в метод [scheduler.date.str_to_date()](api/other/date.md). 
Если вы хотите обеспечить строгий разбор даты согласно формату, предоставленному пользователем, включите опцию **parse_exact_format**, установив её в *true*.

### Related Guides
- [Операции с датами](guides/date-formats.md)
