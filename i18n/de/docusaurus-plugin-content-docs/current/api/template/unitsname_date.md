---
sidebar_label: "UNITS_date"
title: "UNITS_date template"
description: "Legt das im Header der Ansicht angezeigte Datum fest"
---

# UNITS_date
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Legt das im Header der Ansicht angezeigte Datum fest

@signature: UNITS_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - Das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.unit_date = function(date){
        return scheduler.templates.day_date(date);
};
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 Die Vorlage erfordert, dass das [units](guides/extensions-list.md#units) Plugin aktiviert ist. 
:::

### Related Guides
- [Units View Templates](views/units-view-templates.md)
