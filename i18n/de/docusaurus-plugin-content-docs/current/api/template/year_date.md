---
sidebar_label: "year_date"
title: "year_date template"
description: "setzt das Datum, das im Header der Ansicht angezeigt wird"
---

# year_date

### Description

@short: Setzt das Datum, das im Header der Ansicht angezeigt wird

@signature: year_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - HTML-Text, der für das Rendering im Scheduler verwendet wird

### Example

~~~jsx
var date_to_str=scheduler.date.date_to_str(scheduler.locale.labels.year_tab +" %Y");

scheduler.templates.year_date = function(date){
    return date_to_str(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Diese Vorlage erfordert, dass das [year_view](guides/extensions-list.md#year) Plugin aktiviert ist. 
:::

### Related Guides
- [Jahresansicht-Vorlagen](views/year-view-templates.md)
