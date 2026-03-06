---
sidebar_label: "parse_exact_format"
title: "parse_exact_format config"
description: "控制调度器在解析日期时是否严格匹配日期格式"
---

# parse_exact_format

### Description

@short: 控制调度器在解析日期时是否严格匹配日期格式

@signature: parse_exact_format: boolean

### Example

~~~jsx
```javascript
scheduler.config.parse_exact_format = true;
var parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// 日期字符串必须完全匹配指定的格式

parseDate("2019-01-15 12:00");
// -> Tue Jan 15 2019 12:00:00

parseDate("15-01-2019 12:00");
// -> Sun Jul 11 1920 12:00:00 

parseDate("2019-01-15T12:00");
// -> Invalid Date


scheduler.config.parse_exact_format = false;
var parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// 调度器尝试识别传入日期字符串的格式

parseDate("2019-01-15 12:00");
// -> Tue Jan 15 2019 12:00:00

parseDate("15-01-2019 12:00");
// -> Tue Jan 15 2019 12:00:00  

parseDate("2019-01-15T12:00");
// -> Tue Jan 15 2019 12:00:00  
```
~~~

**Default value:** false

### Details

默认情况下，Scheduler 会尝试自动检测传递给 [scheduler.date.str_to_date()](api/other/date.md) 方法的日期格式。 
如果您希望严格按照用户提供的格式进行解析，可以通过将 **parse_exact_format** 选项设置为 *true* 来启用此功能。

### Related Guides
- [날짜 작업](guides/date-formats.md)
