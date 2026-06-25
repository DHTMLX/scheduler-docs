---
sidebar_label: "positive_closing"
title: "positive_closing config"
description: "steuert das 'Speichern'-Verhalten, wenn der Benutzer den Text eines Events direkt innerhalb des Event-Boxes bearbeitet"
---

# positive_closing

### Description

@short: Steuert das „Speichern"-Verhalten, wenn der Benutzer den Text eines Events direkt innerhalb des Event-Boxes bearbeitet

@signature: positive_closing: boolean

### Example

~~~jsx
scheduler.config.positive_closing = true;
...
scheduler.init('scheduler_here', new Date(2027,05,11), "week");
~~~

**Default value:** false

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

Das Klicken auf den Edit-Button in der Select-Leiste öffnet ein Formular, um den Text des Events zu bearbeiten. Normalerweise schließt das Klicken außerhalb des Formulars dieses und verwirft alle Änderungen. Wenn diese Option auf *true* gesetzt wird, werden Änderungen stattdessen gespeichert, wenn man außerhalb des Formulars klickt.

![positiveClosing_property](/img/positiveClosing_property.png)
