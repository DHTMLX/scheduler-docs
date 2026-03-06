---
sidebar_label: "TIMELINE_second_scalex_class"
title: "TIMELINE_second_scalex_class template"
description: "Legt den Namen einer CSS-Klasse fest, die zu Elementen auf der zweiten X-Achse hinzugefügt wird."
---

# TIMELINE_second_scalex_class
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Legt den Namen einer CSS-Klasse fest, die zu Elementen auf der zweiten X-Achse hinzugefügt wird.

@signature: TIMELINE_second_scalex_class: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` css_class` - (string) - die CSS-Klasse für das entsprechende Element

### Example

~~~jsx
scheduler.templates.timeline_second_scalex_class = function(date){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Die Template-Funktion erfordert, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

### Related Guides
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
