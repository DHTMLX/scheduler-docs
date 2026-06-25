---
sidebar_label: parse
title: "parse 메서드"
description: "클라이언트 측 리소스에서 데이터를 로드합니다"
---

# parse

### Description

@short: 클라이언트 측 리소스에서 데이터를 로드합니다

@signature: parse: (data: any) => void

### Parameters

- `data` - (required) *object* - 데이터를 나타내는 문자열 또는 객체

### Example

~~~jsx
scheduler.parse([
    { start_date: "2027-05-13 6:00", end_date: "2027-05-13 8:00", text: "Event 1" },
    { start_date: "2027-06-09 6:00", end_date: "2027-06-09 8:00", text: "Event 2" }
]);
~~~

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

## Migration

v5.2 이상 버전에서 Scheduler는 데이터 형식을 자동으로 감지합니다.

하지만 v5.2 이전 버전에서는 이 메서드에 두 개의 매개변수가 포함되어 있었습니다:

- `data` - (*object*) 데이터를 나타내는 문자열 또는 객체
- `type` - (*string*) 선택적, (*'json', 'xml', 'ical'*) 데이터 형식. 기본값은 *'xml'*

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [parse_date](api/template/parse_date.md)

### Related Guides
- [Examples of Data Formats](guides/data-formats.md)

### Change log
- 메서드의 두 번째 `type` 매개변수는 v5.2에서 제거되었습니다.