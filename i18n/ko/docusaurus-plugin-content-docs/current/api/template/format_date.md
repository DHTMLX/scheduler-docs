---
sidebar_label: "format_date"
title: "format_date template"
description: "날짜 객체를 포맷된 날짜 문자열로 변환합니다. 이는 서버로 날짜 데이터를 전송할 때 유용합니다."
---

# format_date

### Description

@short: 날짜 객체를 포맷된 날짜 문자열로 변환합니다. 이는 서버로 날짜 데이터를 전송할 때 유용합니다.

@signature: format_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷이 필요한 날짜 객체

### Returns
- ` text` - (string) - 날짜를 문자열로 표현한 값

### Example

~~~jsx
var dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

자세한 내용은 ["날짜 형식 지정"](guides/settings-format.md)를 참고하세요.

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md)
- ["날짜 작업"](guides/date-formats.md)
- ["Server-Side Integration"](guides/server-integration.md)
- ["날짜 형식 지정"](guides/settings-format.md)
