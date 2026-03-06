---
sidebar_label: "tooltip_text"
title: "tooltip_text template"
description: "Legt den Text fest, der in Tooltips angezeigt wird"
---

# tooltip_text

### Description

@short: Legt den Text fest, der in Tooltips angezeigt wird

@signature: tooltip_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - Das Datum, an dem das Event beginnt  
- `end` - (required) *Date* - Das Datum, an dem das Event endet  
- `event` - (required) *object* - Das Event-Objekt selbst

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler Tooltip angezeigt wird

### Example

~~~jsx
scheduler.templates.tooltip_text = function(start,end,ev){  
    return "<b>Event:</b> "+ev.text+"<br/><b>Start date:</b> " +   
    scheduler.templates.tooltip_date_format(start)+   
    "<br/><b>End date:</b> "+scheduler.templates.tooltip_date_format(end);  
};
~~~

**Applicable views:** [Agenda view](views/agenda.md), [Day view](views/day.md), [Map view](views/map.md), [Month view](views/month.md), [Week view](views/week.md), [Week Agenda view](views/weekagenda.md), [Units view](views/units.md)

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. 
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- [Allgemeine Vorlagen](guides/common-templates.md#tooltips)
