---
sidebar_label: agenda_text
title: "agenda_text template"
description: "specifies the text in the second column of the Agenda view"
---

# agenda_text

### Description

@short: Specifies the text in the second column of the Agenda view

@signature: agenda_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.agenda_text = function(start,end,ev){
     return ev.text;
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 The template requires the [agenda_view](guides/extensions-list.md#agenda-view) plugin to be activated. 
:::

Note, if the **agenda_text** template isn't specified, 
the 'd-m-y' part of the date will be set according to the [day_date](api/template/day_date.md) template.

### Related Guides
- [Agenda View Templates](views/agenda-view-templates.md)
