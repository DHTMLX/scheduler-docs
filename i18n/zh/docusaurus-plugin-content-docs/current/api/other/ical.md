---
sidebar_label: "ical"
title: "ical config"
description: "指定 ICal 的序列化和解析"
---

# ical

### Description

@short: 指定 ICal 的序列化和解析

@signature: ical: any

### Example

~~~jsx
const icalString = scheduler.ical.parse(
    `BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//dhtmlXScheduler//NONSGML v2.2//EN
    DESCRIPTION:
    BEGIN:VEVENT
    DTSTART:20270411T140000
    DTEND:20270411T170000
    SUMMARY:Meeting
    END:VEVENT
    BEGIN:VEVENT
    DTSTART:20270415
    DTEND:20270418
    SUMMARY:Conference
    END:VEVENT
    BEGIN:VEVENT
    DTSTART:20270424T090000
    DTEND:20270424T100000
    SUMMARY:Interview
    END:VEVENT
    END:VCALENDAR`
);
~~~

### Details

**ical** 对象包含一个方法 *parse()*，用于处理调度器如何解析格式为 ICal 的数据。

要加载这些数据，应使用 [scheduler.parse(icalString)](api/method/parse.md) 方法。

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [데이터 포맷 예시](guides/data-formats.md)
