---
sidebar_label: "parse_date"
title: "parse_date template"
description: "날짜 문자열을 Date 객체로 변환합니다"
---

# parse_date

### Description

@short: 날짜 문자열을 Date 객체로 변환합니다

@signature: parse_date: (date: string) =\> Date

### Parameters

- `date` - (required) *string* - 변환이 필요한 문자열

### Returns
- ` date` - (Date) - Date 객체

### Example

~~~jsx
const cfg = scheduler.config;
const strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);

scheduler.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Details

이 함수는 **scheduler.load()** 또는 **scheduler.parse()**가 이벤트의 *start_date/end_date* 속성을 문자열로 파싱할 때 호출됩니다. 
기본 파서가 작동하지 않거나 날짜 형식이 다를 경우 이 함수를 오버라이드할 수 있습니다. 자세한 내용은 ["날짜 형식 지정"](guides/settings-format.md)를 참고하세요.

[Date 객체에 대해 더 읽어보기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md)
- ["날짜 형식 지정"](guides/settings-format.md)
- ["Server-Side Integration"](guides/server-integration.md)
