---
sidebar_label: "TIMELINE_scalex_class"
title: "TIMELINE_scalex_class template"
description: "Definiert den Namen einer CSS-Klasse, die den Elementen auf der X-Achse zugewiesen wird"
---

# TIMELINE_scalex_class
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert den Namen einer CSS-Klasse, die den Elementen auf der X-Achse zugewiesen wird

@signature: TIMELINE_scalex_class: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - Das Datum, das formatiert werden soll

### Returns
- ` css_class` - (string) - CSS-Klasse für das entsprechende Element

### Example

~~~jsx
scheduler.templates.timeline_scalex_class = function(date){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Diese Vorlage erfordert, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

### Related Guides
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
