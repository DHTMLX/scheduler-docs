---
sidebar_label: "preserve_length"
title: "preserve_length config"
description: "hält die sichtbare Länge eines Events beim Ziehen entlang einer nicht-linearen Zeitskala konstant"
---

# preserve_length

### Description

@short: Hält die sichtbare Länge eines Events beim Ziehen entlang einer nicht-linearen Zeitskala konstant

@signature: preserve_length: boolean

### Example

~~~jsx
scheduler.config.preserve_length = true;
~~~

**Default value:** true

**Applicable views:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Details

Dieser Modus ist standardmäßig aktiviert.

Mit aktiviertem Modus behält ein Event während des Drag-and-Drop seine sichtbare Länge bei, anstatt seine tatsächliche Länge, die durch Start- und Enddatum definiert ist.
<br> Zum Beispiel: Wenn ein zweitägiges Event in der Monatsansicht angezeigt wird und Wochenenden ausgeblendet sind, führt das Ziehen des Events, sodass es Freitag und Montag umfasst, zu einer tatsächlichen Dauer von 4 Tagen zwischen Start und Ende. Der Scheduler hält jedoch die sichtbare Länge bei 2 Tagen.
