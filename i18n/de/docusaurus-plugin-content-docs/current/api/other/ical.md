---
sidebar_label: "ical"
title: "ical config"
description: "Gibt die ICal-Serialisierung und das Parsen an"
---

# ical

### Description

@short: Gibt die ICal-Serialisierung und das Parsen an

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

Das **ical**-Objekt enthält eine einzelne Methode, *parse()*, die steuert, wie der Scheduler Daten im ICal-Format verarbeitet.

Um diese Daten zu laden, sollte die Methode [scheduler.parse(icalString)](api/method/parse.md) verwendet werden.

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [Beispiele für Datenformate](guides/data-formats.md)
