---
sidebar_label: "year_tooltip"
title: "year_tooltip template"
description: "Definiert den Tooltip, der über einer Tageszelle angezeigt wird, die geplante Ereignisse enthält"
---

# year_tooltip

### Description

@short: Definiert den Tooltip, der über einer Tageszelle angezeigt wird, die geplante Ereignisse enthält

@signature: year_tooltip: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - Das Datum, an dem ein Ereignis beginnt
- `end` - (required) *Date* - Das Datum, an dem ein Ereignis endet
- `event` - (required) *object* - Das Ereignisobjekt

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler-Tooltip angezeigt wird

### Example

~~~jsx
scheduler.templates.year_tooltip = function(start,end,ev){
    return ev.text;
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [year_view](guides/extensions-list.md#year) Plugin aktiviert ist. 
:::

### Related Guides
- [Jahresansicht-Vorlagen](views/year-view-templates.md)
