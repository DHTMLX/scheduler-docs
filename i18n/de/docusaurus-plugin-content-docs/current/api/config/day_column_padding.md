---
sidebar_label: "day_column_padding"
title: "day_column_padding config"
description: "fügt einer View-Spalte Padding hinzu"
---

# day_column_padding

### Description

@short: Fügt einer View-Spalte Padding hinzu

@signature: day_column_padding: number

### Example

~~~jsx
scheduler.config.day_column_padding = 20;
~~~

**Default value:** 8

### Details

Events können sich über die gesamte Breite der View-Spalten erstrecken. Die Einstellung `day_column_padding` begrenzt die maximale Breite, die Events innerhalb jeder Zelle einnehmen dürfen. Auf diese Weise bleibt an den Seiten der Spalte immer etwas leerer Platz, der es Nutzern ermöglicht, durch Doppelklick in diese freien Bereiche neue Events zu erstellen.

**Padding deaktiviert**
~~~
scheduler.config.day_column_padding = 0;
~~~

![Scheduler - kein Padding in day columns](/img/day_column_padding_none.png)


**Padding aktiviert**
~~~
scheduler.config.day_column_padding = 8;
~~~
![Scheduler - Padding innerhalb der day columns](/img/day_column_padding_set.png)

### Change log
- hinzugefügt in v7.0
