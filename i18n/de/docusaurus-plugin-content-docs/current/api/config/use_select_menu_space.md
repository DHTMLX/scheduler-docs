---
sidebar_label: "use_select_menu_space"
title: "use_select_menu_space config"
description: "definiert, ob Events die gesamte Breite der Zelle einnehmen"
---

# use_select_menu_space

### Description

@short: Definiert, ob Events die gesamte Breite der Zelle einnehmen

@signature: use_select_menu_space: boolean

### Example

~~~jsx
scheduler.config.use_select_menu_space = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

Standardmäßig erstrecken sich Events über die volle Breite der Zelle. Wenn diese Option auf *false* gesetzt wird, nimmt das Event nur einen Teil der Zellbreite ein und lässt auf der linken Seite Platz für das Menü.

### Change log
- Diese Eigenschaft ist seit Version 3.5 verfügbar.
