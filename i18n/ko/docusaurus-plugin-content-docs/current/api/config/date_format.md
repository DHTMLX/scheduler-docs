---
sidebar_label: "date_format"
title: "date_format config"
description: "데이터 세트에서 데이터를 파싱하고 서버로 날짜를 전송할 때 사용하는 날짜 형식을 정의합니다."
---

# date_format

### Description

@short: 데이터 세트에서 데이터를 파싱하고 서버로 날짜를 전송할 때 사용하는 날짜 형식을 정의합니다.

@signature: date_format: string

### Example

~~~jsx
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(2019,0,10),"week");
scheduler.load("/data/events");
~~~

**Default value:** "%Y-%m-%d %H:%i"

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Details

이 설정 옵션은 [parse_date](api/template/parse_date.md) 및 [format_date](api/template/format_date.md) 템플릿 함수를 생성하는 역할을 합니다. 
사용자 지정 형식을 사용하려면 이 설정을 업데이트하거나 **parse_date** 및 **format_date** 템플릿을 직접 오버라이드할 수 있습니다.

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- ["날짜 형식 지정"](guides/settings-format.md)
