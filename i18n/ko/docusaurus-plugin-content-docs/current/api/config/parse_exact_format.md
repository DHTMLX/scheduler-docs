---
sidebar_label: "parse_exact_format"
title: "parse_exact_format config"
description: "스케줄러가 파싱 시 날짜 형식을 엄격하게 일치시키도록 제어합니다."
---

# parse_exact_format

### Description

@short: 스케줄러가 파싱 시 날짜 형식을 엄격하게 일치시키도록 제어합니다.

@signature: parse_exact_format: boolean

### Example

~~~jsx
scheduler.config.parse_exact_format = true;
var parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// 날짜 문자열이 지정된 형식과 정확히 일치해야 합니다.

parseDate("2019-01-15 12:00");
// -> Tue Jan 15 2019 12:00:00

parseDate("15-01-2019 12:00");
// -> Sun Jul 11 1920 12:00:00 

parseDate("2019-01-15T12:00");
// -> Invalid Date


scheduler.config.parse_exact_format = false;
var parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// 스케줄러가 제공된 날짜 문자열의 형식을 인식하려 시도합니다.

parseDate("2019-01-15 12:00");
// -> Tue Jan 15 2019 12:00:00

parseDate("15-01-2019 12:00");
// -> Tue Jan 15 2019 12:00:00  

parseDate("2019-01-15T12:00");
// -> Tue Jan 15 2019 12:00:00
~~~

**Default value:** false

### Details

기본적으로 Scheduler는 [scheduler.date.str_to_date()](api/other/date.md) 메서드에 전달된 날짜의 형식을 자동으로 감지하려고 시도합니다. 
사용자가 제공한 형식에 따라 파싱을 엄격하게 적용하려면 **parse_exact_format** 옵션을 *true*로 설정하여 활성화하세요.

### Related Guides
- ["날짜 작업"](guides/date-formats.md)
