ical
=============
@short:specifies ICal serialization and parsing
	

@type:object

@example:
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

@template:	api_config


@descr:
The **ical** object contains the only member - the *parse()* method which defines how the scheduler will parse data in the ICal format.

To load data, use the [scheduler.parse(icalString)](api/scheduler_parse.md) method.

@relatedapi:
api/scheduler_parse.md

@related: data_formats.md


