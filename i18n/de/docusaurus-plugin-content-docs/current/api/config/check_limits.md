---
sidebar_label: "check_limits"
title: "check_limits config"
description: "Schaltet die Limit-Überprüfung ein oder aus"
---

# check_limits

### Description

@short: Schaltet die Limit-Überprüfung ein oder aus

@signature: check_limits: boolean

### Example

~~~jsx
scheduler.config.check_limits = false;
...
scheduler.init('scheduler_here',new Date(2013,7,6),"week");
~~~

**Default value:** true

### Details

:::note
 Die Eigenschaft erfordert, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

Diese Option ist seit Version 3.5 verfügbar.

Das Deaktivieren dieser Einstellung kann nützlich sein, wenn keine Limits gesetzt sind und nur Hervorhebungen oder die Markierung der aktuellen Zeit benötigt werden, da dies die Performance verbessern kann. Sind jedoch Limits definiert, führt das Abschalten auch zum Deaktivieren aller „Blocking"-Funktionen.

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md)
