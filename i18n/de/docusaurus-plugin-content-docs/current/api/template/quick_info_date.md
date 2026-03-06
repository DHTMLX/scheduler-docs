---
sidebar_label: "quick_info_date"
title: "quick_info_date template"
description: "definiert das Datum, das im Pop-up Bearbeitungsformular angezeigt wird"
---

# quick_info_date

### Description

@short: Definiert das Datum, das im Pop-up Bearbeitungsformular angezeigt wird

@signature: quick_info_date: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - der Starttermin des Events
- `end` - (required) *Date* - der Endtermin des Events
- `event` - (required) *object* - die Eventdetails

### Returns
- ` text` - (string) - html-Text, der zur Anzeige im scheduler verwendet wird

### Example

~~~jsx
scheduler.templates.quick_info_date = function(start, end, ev){
    if (scheduler.isOneDayEvent(ev)){
        return scheduler.templates.day_date(start, end, ev) + " " +
            scheduler.templates.event_header(start, end, ev);
    }else{
        return scheduler.templates.week_date(start, end, ev);
    }
};
~~~

### Details

:::note
 Die Vorlage funktioniert nur, wenn das [quick_info](guides/extensions-list.md#quick-info) Plugin aktiviert ist. 
:::

### Related Guides
- [Allgemeine Vorlagen](guides/common-templates.md#touch-support)
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)
