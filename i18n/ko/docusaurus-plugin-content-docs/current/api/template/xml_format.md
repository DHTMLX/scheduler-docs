---
sidebar_label: "xml_format"
title: "xml_format template"
description: "날짜 객체를 특정 템플릿에 따라 문자열로 변환합니다. 주로 서버로 데이터를 전송할 때 사용됩니다."
---

# xml_format
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 날짜 객체를 특정 템플릿에 따라 문자열로 변환합니다. 주로 서버로 데이터를 전송할 때 사용됩니다.

@signature: xml_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜 객체

### Returns
- ` text` - (string) - 날짜의 문자열 버전

### Example

~~~jsx
const cfg = scheduler.config;
const    date_to_str = scheduler.date.date_to_str(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_format = function(date){
    return date_to_str(date);
};
~~~

### Details

:::note
 이 템플릿은 더 이상 사용되지 않습니다. 대신 [format_date](api/template/format_date.md) 문서를 참고하세요: 
:::

~~~js
var dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md)
- ["Server-Side Integration"](guides/server-integration.md)

### Change log
- v5.2 버전부터 deprecated 되었습니다.
