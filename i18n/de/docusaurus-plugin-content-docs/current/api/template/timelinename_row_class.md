---
sidebar_label: "TIMELINE_row_class"
title: "TIMELINE_row_class template"
description: "definiert die CSS-Klasse, die einer Zeile in der Timeline-Ansicht zugewiesen wird"
---

# TIMELINE_row_class
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert die CSS-Klasse, die einer Zeile in der Timeline-Ansicht zugewiesen wird

@signature: TIMELINE_row_class: (section: object, timeline: object) =\> string;

### Parameters

- `section` - (required) *object* - das Section-Objekt
- `timeline` - (required) *object* - das Timeline-Objekt

### Returns
- ` css_class` - (string) - CSS-Klasse für das entsprechende Element

### Example

~~~jsx
scheduler.templates.timeline_row_class = function(section, timeline){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Diese Vorlage erfordert, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

Die Standard-Implementierung der Vorlage sieht wie folgt aus:

~~~js
scheduler.templates.TIMELINE_row_class = function(section, timeline){
    if(timeline.folder_events_available && section.children){
        return "folder";
    }
    return "";
};
~~~

### Related API
- [TIMELINE_cell_class](api/template/timelinename_cell_class.md)
- [TIMELINE_cell_value](api/template/timelinename_cell_value.md)

### Related Guides
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)

### Change log
- hinzugefügt in v5.3.9
