---
sidebar_label: addEventNow
title: "addEventNow method"
description: "adds a new event and opens the lightbox to confirm"
---

# addEventNow

### Description

@short: Adds a new event and opens the lightbox to confirm

@signature: addEventNow: (event: any) =\> string

### Parameters

- `event` - (required) *object* - the event object

### Returns
- ` id` - (string) - the event's id

### Example

~~~jsx
scheduler.addEventNow();
//or
scheduler.addEventNow({
    start_date: new Date(2013,0,10,8,30),
    end_date:     new Date(2013,0,10,10,30),
    text:    "Meeting",
    holder:    "John", //userdata
    room:    "5"     //userdata
});
~~~

### Related samples
- [Default values for lightbox controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/28_lightbox_default_value.html)
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- [Material skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/02_material.html)

### Details

The event object can have the following properties:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>start_date</b></td>
  <td>(<i>Date, string</i>) the date, when the event is scheduled to begin. By default, the current date. <br> <br> If the property is specified as a string, the '%d-%m-%Y %H:%i' format should be used (to change the default format, use the [api_date](api/config/api_date.md) option)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end_date</b></td>
  <td>(<i>Date, string</i>) the date, when the event is scheduled to be completed. By default, the current date + [time_step](api/config/time_step.md) value. <br> <br> If the property is specified as a string, the '%d-%m-%Y %H:%i' format should be used (to change the default format, use the [api_date](api/config/api_date.md) option)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>text</b></td>
  <td>(<i>string</i>) the event's text</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>id</b></td>
  <td>(<i>string</i>) the event's id. If not specified, the id for the event will be generated automatically</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>userdata</b></td>
  <td>(<i>hash</i>) a collection of custom properties presented as 'key-value' pairs </td>
  </tr>
  </tbody>
</table>

<br>

### Related API
- [api_date](api/config/api_date.md)
- [time_step](api/config/time_step.md)
- [addEvent](api/method/addevent.md)

### Related Guides
- [Adding/Deleting Events](guides/adding-events.md)
