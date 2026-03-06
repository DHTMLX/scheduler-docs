---
sidebar_label: "agenda_date"
title: "agenda_date template"
description: "definiert das Datum, das im Header der Ansicht angezeigt wird"
---

# agenda_date

### Description

@short: Definiert das Datum, das im Header der Ansicht angezeigt wird

@signature: agenda_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - das Anfangsdatum der Ansicht
- `end` - (required) *Date* - das Enddatum der Ansicht

### Returns
- ` text` - (string) - der HTML-Inhalt, der angezeigt wird

### Example

~~~jsx
// Standarddefinition
scheduler.templates.agenda_date = function(start, end) {
     return '';
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 Dieses Template funktioniert nur, wenn das [agenda_view](guides/extensions-list.md#agenda-view) Plugin aktiviert ist. 
:::

### Related Guides
- [Agenda-Ansicht-Vorlagen](views/agenda-view-templates.md)
