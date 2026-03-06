---
sidebar_label: "event_bar_date"
title: "event_bar_date template"
description: "Wird verwendet, um das Datum für ein Event festzulegen. Dies gilt nur für Events, die einen einzelnen Tag dauern."
---

# event_bar_date

### Description

@short: Wird verwendet, um das Datum für ein Event festzulegen. Dies gilt nur für Events, die einen einzelnen Tag dauern.

@signature: event_bar_date: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - Das Datum, an dem das Event beginnt  
- `end` - (required) *Date* - Das Datum, an dem das Event endet
- `event` - (required) *object* - Das Event-Objekt selbst

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.event_bar_date = function(start,end,ev){
     return "• <b>"+scheduler.templates.event_date(start)+"</b> ";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
