---
sidebar_label: "ical"
title: "ical config"
description: "определяет сериализацию и парсинг ICal"
---

# ical

### Description

@short: Определяет сериализацию и парсинг ICal

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

Объект **ical** содержит единственный метод *parse()*, который отвечает за обработку данных в формате ICal в планировщике.

Для загрузки таких данных следует использовать метод [scheduler.parse(icalString)](api/method/parse.md).

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [Примеры форматов данных](guides/data-formats.md)
