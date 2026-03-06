---
sidebar_label: "time_slot_text"
title: "time_slot_text template"
description: "definiert, was in den Hintergrundzellen in den Day/Week-Ansichten angezeigt wird"
---

# time_slot_text

### Description

@short: Definiert, was in den Hintergrundzellen in den Day/Week-Ansichten angezeigt wird

@signature: time_slot_text: () =\> void

### Example

~~~jsx
scheduler.templates.time_slot_text=function(date){
    if(date.getHours() >= 12 && date.getHours() < 13){
        return "Lunch break";    
    }            
};
~~~

### Details

![time_slot_template](/img/time_slot_template.png)


In den Day/Week-Ansichten ist der Hintergrund in 30-Minuten-Abschnitte unterteilt. Dieses Template ermöglicht es, den HTML-Inhalt festzulegen, der in jedem dieser Blöcke im Kalender angezeigt wird.

### Related API
- [time_slot_class](api/template/time_slot_class.md)

### Change log
- hinzugefügt in v7.0
