---
sidebar_label: parse_exact_format
title: "parse_exact_format config"
description: "определяет, будет ли планировщик автоматически распознавать формат данных"
---

# parse_exact_format

### Description

@short: Определяет, будет ли планировщик автоматически распознавать формат данных

@signature: parse_exact_format: boolean

### Example

~~~jsx
scheduler.config.parse_exact_format = true;
const parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// строка с датой должна точно соответствовать указанному формату

parseDate("2027-01-15 12:00");
// -> Tue Jan 15 2027 12:00:00

parseDate("15-01-2027 12:00");
// -> Sun Jul 11 2720 12:00:00 

parseDate("2027-01-15T12:00");
// -> Invalid Date


scheduler.config.parse_exact_format = false;
const parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// scheduler пытается распознать формат переданной строки с датой

parseDate("2027-01-15 12:00");
// -> Tue Jan 15 2027 12:00:00

parseDate("15-01-2027 12:00");
// -> Tue Jan 15 2027 12:00:00  

parseDate("2027-01-15T12:00");
// -> Tue Jan 15 2027 12:00:00
~~~

**Значение по умолчанию:** false

### Details

По умолчанию Scheduler пытается автоматически определить формат дат, переданных пользователем для парсинга (во встроенном методе [scheduler.date.str_to_date()](api/other/date.md)). 
Если вы хотите применить точный формат, указанный пользователем во время парсинга, включите конфигурацию **parse_exact_format**, установив её в *true*.

### Related Guides
- [Операции с датами](guides/date-formats.md)