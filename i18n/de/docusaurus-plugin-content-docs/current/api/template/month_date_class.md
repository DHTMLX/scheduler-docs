---
sidebar_label: "month_date_class"
title: "month_date_class template"
description: "definiert die CSS-Klasse, die einer Tageszelle zugewiesen wird"
---

# month_date_class

### Description

@short: Definiert die CSS-Klasse, die einer Tageszelle zugewiesen wird

@signature: month_date_class: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` css_class` - (string) - die CSS-Klasse für das entsprechende Element

### Example

~~~jsx
scheduler.templates.month_date_class = function(date){
    return "";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
