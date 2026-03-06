---
sidebar_label: "year_scale_date"
title: "year_scale_date template"
description: "definiert den Namen des Tages, der im Unterkopf innerhalb eines Monatsblocks der Ansicht angezeigt wird"
---

# year_scale_date

### Description

@short: Definiert den Namen des Tages, der im Unterkopf innerhalb eines Monatsblocks der Ansicht angezeigt wird

@signature: year_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das zu formatierende Datum

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
const formatScaleDate = scheduler.date.date_to_str("%D");
scheduler.templates.year_scale_date = function(date){
    return formatScaleDate(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Diese Vorlage erfordert, dass das [year_view](guides/extensions-list.md#year) Plugin aktiviert ist. 
:::

### Related Guides
- [Jahresansicht-Vorlagen](views/year-view-templates.md)
