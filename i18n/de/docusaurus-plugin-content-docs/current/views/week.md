---
title: "Week-Ansicht"
sidebar_label: "Week-Ansicht"
---

# Week-Ansicht

Die Wochenansicht zeigt eine oder mehrere Wochen gleichzeitig an.

![week_view](/img/week_view.png)


## Initialisierung

Die Wochenansicht ist standardmäßig im [Grund-Markup des Schedulers]([Scheduler Markup](guides/scheduler-markup.md) enthalten. Es ist daher nicht notwendig, zusätzlichen Code hinzuzufügen, um diese Ansicht im Scheduler verfügbar zu machen.

~~~js
// Standard-Initialisierung. Die Wochenansicht wird automatisch hinzugefügt
scheduler.init('scheduler_here',new Date(2019,0,10),"week");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Entfernen des Week-View-Tabs

Wenn Sie den Tab für die Wochenansicht aus dem Scheduler entfernen möchten, löschen Sie einfach das entsprechende div aus dem [Scheduler-Markup](guides/scheduler-markup.md):

~~~js
// Entfernen Sie dieses div, um den Week-Tab zu löschen
<div class="dhx_cal_tab" name="week_tab"></div>
~~~


## Ausblenden von Tagen auf der X-Achse der Ansicht

Um bestimmte Tage aus der Zeitskala auszuschließen, beispielsweise um nur Arbeitstage anzuzeigen und Wochenenden auszublenden, verwenden Sie die Methode **ignore_week()**. 


Diese Methode ist eine Funktion, die das Datum erhält und *true* für die Tage zurückgeben sollte, die Sie ausblenden möchten.

~~~js
// 0 ist Sonntag, 6 ist Samstag
scheduler.ignore_week = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) // blendet Samstage und Sonntage aus
        return true;
};
~~~


[Hiding days in the scale of Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/02_week_ignore.html)


## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [Week-View-Vorlagen](views/week-view-templates.md)
- [Daten laden](guides/loading-data.md)
- [Event-Objekt-Operationen](guides/event-object-operations.md)
- [Blockieren und Markieren von Daten](guides/limits.md)
- [Skins](guides/skins.md)
