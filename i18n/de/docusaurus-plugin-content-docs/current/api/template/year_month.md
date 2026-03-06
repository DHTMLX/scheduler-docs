---
sidebar_label: "year_month"
title: "year_month template"
description: "definiert den Monatsnamen, der im Header eines Monatsblocks innerhalb der Ansicht angezeigt wird."
---

# year_month

### Description

@short: Definiert den Monatsnamen, der im Header eines Monatsblocks innerhalb der Ansicht angezeigt wird.

@signature: year_month: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
const formatMonth = scheduler.date.date_to_str("%F");
scheduler.templates.year_month = function(date){
    return formatMonth(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Dieses Template benötigt das aktivierte [year_view](guides/extensions-list.md#year) Plugin. 
:::

### Related Guides
- [Jahresansicht-Vorlagen](views/year-view-templates.md)
