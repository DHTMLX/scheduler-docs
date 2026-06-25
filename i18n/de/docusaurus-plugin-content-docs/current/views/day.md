---
title: "Tagesansicht"
sidebar_label: "Tagesansicht"
---

# Tagesansicht

Die Tagesansicht zeigt den Kalender für einen einzelnen Tag an.

![day_view](/img/day_view.png)


## Initialisierung

Die Tagesansicht ist standardmäßig im [Grund-Markup des Schedulers](guides/scheduler-markup.md) enthalten. Das bedeutet, dass keine zusätzliche Codezeile erforderlich ist, um diese Ansicht im Scheduler zu aktivieren.

~~~js
//Standard-Initialisierung. Die Tagesansicht ist automatisch enthalten
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Entfernen des Tagesansicht-Tabs

Wenn Sie den Tab für die Tagesansicht aus dem Scheduler entfernen möchten, löschen Sie einfach das entsprechende div aus dem [Scheduler-Markup](guides/scheduler-markup.md):

~~~js
//Dieses div entfernen, um den Day-Tab auszublenden
<div class="dhx_cal_tab" name="day_tab"></div>
~~~

## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [Day-Ansicht Vorlagen](views/day-view-templates.md)
- [Daten laden](guides/loading-data.md)
- [Event-Objekt-Operationen](guides/event-object-operations.md)
- [Blockieren und Markieren von Daten](guides/limits.md)
- [Skins](guides/skins.md)
