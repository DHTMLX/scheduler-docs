---
sidebar_label: "destructor"
title: "destructor method"
description: "entfernt eine Scheduler-Instanz"
---

# destructor

### Description

@short: Entfernt eine Scheduler-Instanz

@signature: destructor: () =\> void

### Example

~~~jsx
const myScheduler = Scheduler.getSchedulerInstance();
 
// Entfernen einer Scheduler-Instanz
myScheduler.destructor();
~~~

### Details

Diese Methode entfernt eine Scheduler-Instanz und löst das [onDestroy](api/event/ondestroy.md) Event aus.

Wenn der destructor aufgerufen wird, wird er:

- alle in die Scheduler-Instanz geladenen Daten löschen
- den [DataProcessor](api/method/dataprocessor.md) zerstören, falls dieser mit dem Scheduler verknüpft ist
- den Scheduler aus dem DOM entfernen
- alle über die [event](api/method/event.md) Methode gebundenen DOM-Events lösen

:::note

Für Pakete, die keine mehreren Scheduler-Instanzen unterstützen (GPL- oder Individual-Editionen), wird durch den Aufruf des destructors der Scheduler bis zum Neuladen der Seite nicht mehr verfügbar sein.
 
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- [Mehrere Scheduler auf einer Seite erstellen](guides/multiple-per-page.md#destructor-of-scheduler-and-dataprocessor-instances)

### Change log
- hinzugefügt in Version 6.0
