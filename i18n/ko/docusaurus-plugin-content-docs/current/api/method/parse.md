---
sidebar_label: "parse"
title: "parse method"
description: "클라이언트 측 리소스에서 데이터를 로드하는 기능을 처리합니다."
---

# parse

### Description

@short: 클라이언트 측 리소스에서 데이터를 로드하는 기능을 처리합니다.

@signature: parse: (data: any) =\> void

### Parameters

- `data` - (required) *object* - 데이터가 포함된 문자열 또는 객체

### Example

~~~jsx
scheduler.parse([
     { start_date:"2020-05-13 6:00", end_date:"2020-05-13 8:00", text:"Event 1"},
     { start_date:"2020-06-09 6:00", end_date:"2020-06-09 8:00", text:"Event 2"}
]);
~~~

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

### 마이그레이션

버전 5.2부터 스케줄러는 데이터 형식을 자동으로 감지합니다.

이전 버전(5.2 이전)에서는 메서드가 두 개의 매개변수를 받았습니다:

- **data** - (*object*)    데이터가 포함된 문자열 또는 객체;
- **type** - (*string*)    선택 사항이며, (<i>'json', 'xml', 'ical'</i>) 데이터 유형을 지정합니다. 기본값은 <i>'xml'</i>이었습니다.

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [parse_date](api/template/parse_date.md)

### Related Guides
- ["데이터 포맷 예시"](guides/data-formats.md)

### Change log
- 두 번째 **type** 매개변수는 버전 5.2에서 제거되었습니다.
