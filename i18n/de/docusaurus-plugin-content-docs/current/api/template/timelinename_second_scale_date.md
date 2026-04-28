---
sidebar_label: "TIMELINE_second_scale_date"
title: "TIMELINE_second_scale_date template"
description: "definiert die Elemente, die auf der sekundären X-Achse angezeigt werden"
---

# TIMELINE_second_scale_date
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert die Elemente, die auf der sekundären X-Achse angezeigt werden

@signature: TIMELINE_second_scale_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Inhalt, der für das Rendering im Scheduler verwendet wird

### Example

~~~jsx
scheduler.templates.timeline_second_scale_date = function(date){
    const timeline = scheduler.matrix.timeline;
    const func = scheduler.date.date_to_str(
        (timeline.second_scale && timeline.second_scale.x_date)?
        timeline.second_scale.x_date:scheduler.config.hour_date
    );
    return func(date);
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

### Related Guides
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
