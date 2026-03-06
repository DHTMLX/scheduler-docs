---
sidebar_label: "xml_date"
title: "xml_date template"
description: "이 템플릿은 XML 파일에서 가져온 문자열을 지정된 형식에 따라 날짜 객체로 변환합니다."
---

# xml_date
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 이 템플릿은 XML 파일에서 가져온 문자열을 지정된 형식에 따라 날짜 객체로 변환합니다.

@signature: xml_date: (date: string) =\> Date

### Parameters

- `date` - (required) *string* - 파싱이 필요한 문자열

### Returns
- ` date` - (Date) - 날짜 객체

### Example

~~~jsx
var cfg = scheduler.config;
var str_to_date = scheduler.date.str_to_date(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_date = function(date){
    return str_to_date(date);
};
~~~

### Details

:::note
 이 템플릿은 더 이상 권장되지 않습니다. 대신 [parse_date](api/template/parse_date.md)를 참조하세요: 
:::

~~~js
var cfg = scheduler.config;
var strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
scheduler.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md)

### Change log
- v5.2부터 deprecated로 표시됨
