---
sidebar_label: "time_slot_class"
title: "time_slot_class template"
description: "definiert die CSS-Klasse für Hintergrundzellen in den Day- und Week-Views"
---

# time_slot_class

### Description

@short: Definiert die CSS-Klasse für Hintergrundzellen in den Day- und Week-Views

@signature: time_slot_class: () =\> void

### Example

~~~jsx
scheduler.templates.time_slot_class=function(date){
    if(date.getHours() < 7 || date.getHours() > 18){
        return "custom_color";    
    }
    
};
~~~

### Details

![time_slot_template](/img/time_slot_template.png)

Die Day- und Week-Views zeigen ihren Hintergrund in 30-Minuten-Segmenten an. Dieses Template ermöglicht es, jeder Hintergrundzelle im Kalender eine benutzerdefinierte CSS-Klasse zuzuweisen.

### Related API
- [time_slot_text](api/template/time_slot_text.md)

### Change log
- hinzugefügt in v7.0
