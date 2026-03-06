---
sidebar_label: "agenda_text"
title: "agenda_text template"
description: "definiert den Text, der in der zweiten Spalte der Agenda-Ansicht angezeigt wird"
---

# agenda_text

### Description

@short: Definiert den Text, der in der zweiten Spalte der Agenda-Ansicht angezeigt wird

@signature: agenda_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - das Datum, an dem das Ereignis beginnt
- `end` - (required) *Date* - das Datum, an dem das Ereignis endet
- `event` - (required) *object* - die Ereignisdaten

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.agenda_text = function(start,end,ev){
     return ev.text;
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 Die Vorlage erfordert, dass das [agenda_view](guides/extensions-list.md#agenda-view) Plugin aktiviert ist. 
:::

Wenn die **agenda_text** Vorlage nicht gesetzt ist, 
wird der Datumsanteil 'd-m-y' im Format der [day_date](api/template/day_date.md) Vorlage angezeigt.

### Related Guides
- [Agenda-Ansicht-Vorlagen](views/agenda-view-templates.md)
