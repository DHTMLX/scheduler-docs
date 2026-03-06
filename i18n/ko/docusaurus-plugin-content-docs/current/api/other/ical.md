---
sidebar_label: "ical"
title: "ical config"
description: "ICal 직렬화 및 파싱 지정"
---

# ical

### Description

@short: ICal 직렬화 및 파싱 지정

@signature: ical: any

### Example

~~~jsx
const icalString = scheduler.ical.parse(
    `BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//dhtmlXScheduler//NONSGML v2.2//EN
    DESCRIPTION:
    BEGIN:VEVENT
    DTSTART:20220411T140000
    DTEND:20220411T170000
    SUMMARY:Meeting
    END:VEVENT
    BEGIN:VEVENT
    DTSTART:20220415
    DTEND:20220418
    SUMMARY:Conference
    END:VEVENT
    BEGIN:VEVENT
    DTSTART:20220424T090000
    DTEND:20220424T100000
    SUMMARY:Interview
    END:VEVENT
    END:VCALENDAR`
);
~~~

### Details

**ical** 객체는 ICal 형식으로 된 데이터를 스케줄러가 처리하는 방식을 담당하는 단일 메서드 *parse()*를 포함합니다.

이 데이터를 로드하려면 [scheduler.parse(icalString)](api/method/parse.md) 메서드를 사용해야 합니다.

### Related API
- [parse](api/method/parse.md)

### Related Guides
- ["데이터 포맷 예시"](guides/data-formats.md)
