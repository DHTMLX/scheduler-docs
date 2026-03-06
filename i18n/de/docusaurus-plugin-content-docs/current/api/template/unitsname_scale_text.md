---
sidebar_label: "UNITS_scale_text"
title: "UNITS_scale_text template"
description: "definiert die Elemente, die auf der X-Achse angezeigt werden"
---

# UNITS_scale_text
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert die Elemente, die auf der X-Achse angezeigt werden

@signature: UNITS_scale_text: (key: string, label: string, unit: object, date: Date) =\> string;

### Parameters

- `key` - (required) *string* - der Bezeichner der Einheit
- `label` - (required) *string* - die Beschriftung der Einheit
- `unit` - (required) *object* - ein Objekt, das die Einheit repräsentiert, einschließlich 'key' und 'label'
- `date` - (required) *Date* - das Datum, das einer Spalte entspricht (nützlich für Mehrtagesansichten der Units)

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.unit_scale_text = function(key, label, unit, date) {
    if (option.css) {
        return "<span class='" + option.css + "'>" + label + "</span>";
    } else {
        return label;
    }
};
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 Diese Vorlage erfordert, dass das [units](guides/extensions-list.md#units) Plugin aktiviert ist. 
:::

### Related Guides
- [Units View Templates](views/units-view-templates.md)
