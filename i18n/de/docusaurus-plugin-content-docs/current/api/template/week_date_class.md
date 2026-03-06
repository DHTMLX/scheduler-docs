---
sidebar_label: "week_date_class"
title: "week_date_class template"
description: "definiert die CSS-Klasse, die einer Tageszelle zugewiesen wird"
---

# week_date_class

### Description

@short: Definiert die CSS-Klasse, die einer Tageszelle zugewiesen wird

@signature: week_date_class: (start: Date, today: Date) =\> string

### Parameters

- `start` - (required) *Date* - Das Startdatum der Spalte
- `today` - (required) *Date* - Das aktuelle Datum

### Returns
- ` css_class` - (string) - CSS-Klasse für das entsprechende Element

### Example

~~~jsx
scheduler.templates.week_date_class = function(start, today){
    return "";
};
~~~

**Applicable views:** [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Week-View-Vorlagen](views/week-view-templates.md)
