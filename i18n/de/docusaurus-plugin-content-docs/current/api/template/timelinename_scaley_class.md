---
sidebar_label: "TIMELINE_scaley_class"
title: "TIMELINE_scaley_class template"
description: "Definiert den CSS-Klassennamen, der den Elementen auf der Y-Achse zugewiesen wird"
---

# TIMELINE_scaley_class
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert den CSS-Klassennamen, der den Elementen auf der Y-Achse zugewiesen wird

@signature: TIMELINE_scaley_class: (key: string, label: string, section: object) =\> string;

### Parameters

- `key` - (required) *string* - Der Bezeichner des Abschnitts
- `label` - (required) *string* - Das Label des Abschnitts
- `section` - (required) *object* - Ein Objekt, das den Abschnitt repräsentiert und die Eigenschaften 'key' und 'label' enthält

### Returns
- ` css_class` - (string) - CSS-Klasse, die auf das entsprechende Element angewendet wird

### Example

~~~jsx
scheduler.templates.timeline_scaley_class = function(key, label,  section){ 
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
