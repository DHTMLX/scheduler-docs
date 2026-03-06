---
sidebar_label: "recurring_overflow_instances"
title: "recurring_overflow_instances config"
description: "steuert, wie Wiederholungen, die in den nächsten Monat übergehen, behandelt werden"
---

# recurring_overflow_instances
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Steuert, wie Wiederholungen, die in den nächsten Monat übergehen, behandelt werden

@signature: recurring_overflow_instances: string

### Example

~~~jsx
scheduler.config.recurring_overflow_instances = "lastDay";
~~~

**Default value:** undefined

### Details

:::note
 Diese Eigenschaft erfordert die Aktivierung der [recurring](guides/extensions-list.md#recurring) Erweiterung. 
:::

Betrachten Sie ein Ereignis, das jeden Monat am 30. geplant ist, und wie es sich im Februar mit den jeweiligen Einstellungen verhält:

- **"skip"** - das Ereignis an einem nicht existierenden Datum wird übersprungen. *Das Ereignis findet also im Februar nicht statt.* 
- **"lastDay"** - das Ereignis an einem nicht existierenden Datum wird auf den letzten Tag des Monats verschoben. *In diesem Fall findet es am 28. Februar statt.*
- **"none"** - das Ereignis an einem nicht existierenden Datum wird auf den ersten Tag des folgenden Monats verschoben. *Hier findet das Ereignis am 1. März statt.*

Wenn keine Option angegeben ist, ist das Standardverhalten "skip".

### Change log
- hinzugefügt in v5.3.11
