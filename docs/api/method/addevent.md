---
sidebar_label: addEvent
title: "addEvent method"
description: "adds a new event"
---

# addEvent

### Description

@short: Adds a new event

@signature: addEvent: (event: any) =\> string

### Parameters

- `event` - (required) *object* - the event object

### Returns
- `id` - (string) - the event's id

### Example

~~~jsx
scheduler.addEvent({
    start_date: "2027-06-16 09:00",
    end_date: "2027-06-16 12:00",
    text: "Meeting",
    holder: "John", // userdata
    room: "5" // userdata
});
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

:::note

The method invokes the [`onEventAdded`](api/event/oneventadded.md) or [`onEventChanged`](api/event/oneventchanged.md) event.

:::

The event object can have the following properties:

- `start_date` - (*Date,string*) the date when the event is scheduled to begin. If the property is specified as a string, the "%d-%m-%Y %H:%i" format should be used (to change the default format, use the [`api_date`](api/config/api_date.md) option). For [recurring events](guides/recurring-events.md), the value of the `start_date` property must have the Date type.
- `end_date` - (*Date,string*) the date when the event is scheduled to be completed. If the property is specified as a string, the "%d-%m-%Y %H:%i" format should be used (to change the default format, use the [`api_date`](api/config/api_date.md) option). For [recurring events](guides/recurring-events.md), the value of the `end_date` property must have the Date type.
- `text` - (*string*) the event's text.
- `id` - (*string*) the event's id. If not specified, the id for the event will be generated automatically.
- `userdata` - (*hash*) a collection of custom properties presented as 'key-value' pairs.

### Related API
- [api_date](api/config/api_date.md)
- [addEventNow](api/method/addeventnow.md)
- [deleteEvent](api/method/deleteevent.md)

### Related Guides
- [Adding/Deleting Events](guides/adding-events.md)
