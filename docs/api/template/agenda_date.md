---
sidebar_label: agenda_date
title: "agenda_date template"
description: "specifies the date in the header of the view"
---

# agenda_date

### Description

@short: Specifies the date in the header of the view

@signature: agenda_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - the start date of the view
- `end` - (required) *Date* - the end date of the view

### Returns
- ` text` - (string) - the html text which will be rendered

### Example

~~~jsx
//default definition
scheduler.templates.agenda_date = function(start, end) {
     return '';
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 The template requires the [agenda_view](guides/extensions-list.md#agenda-view) plugin to be activated. 
:::

### Related Guides
- [Agenda View Templates](views/agenda-view-templates.md)
