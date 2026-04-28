---
title: "Monatsansicht"
sidebar_label: "Monatsansicht"
---

# Monatsansicht

Die Monatsansicht zeigt einen einzelnen Kalendermonat an.

![month_view](/img/month_view.png)

## Initialisierung {#initialization}

Die Monatsansicht ist standardmäßig in das [Grund-Layout des Schedulers](guides/scheduler-markup.md) integriert, daher sind keine zusätzlichen Schritte erforderlich, um sie hinzuzufügen.

~~~js
// Standard-Initialisierung; die Monatsansicht ist automatisch enthalten
scheduler.init('scheduler_here', new Date(2027,0,10), "month");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Entfernen des Tabs für die Monatsansicht {#removingthemonthviewtab}

Wenn Sie den Tab für die Monatsansicht entfernen möchten, löschen Sie einfach das entsprechende div aus dem [Scheduler-Markup](guides/scheduler-markup.md):

~~~js
// Entfernen Sie dieses div, um den Monatstab zu entfernen
<div class="dhx_cal_tab" name="month_tab"></div>
~~~

## Begrenzung der Anzahl von Ereignissen in einer Zelle {#limiting-the-number-of-events-in-a-cell}

Standardmäßig passt der Scheduler die Zellenhöhe so an, dass alle Ereignisse hineinpassen.

Ab Version 4.0 können Sie steuern, wie viele Ereignisse in jeder Zelle angezeigt werden, was auch die Zellenhöhe begrenzt.

Um die maximale Anzahl von Ereignissen pro Zelle festzulegen, verwenden Sie die Option [max_month_events](api/config/max_month_events.md):

~~~js
scheduler.config.max_month_events = 3;
..
scheduler.init('scheduler_here', new Date(2027,5,30), "month");
~~~

Wenn mehr Ereignisse als das festgelegte Limit vorhanden sind, erscheint ein "Mehr anzeigen"-Link. Beim Anklicken wird der Benutzer zur Tagesansicht weitergeleitet, in der alle Ereignisse vollständig angezeigt werden.


['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)


## Ausblenden von Tagen auf der X-Achse der Ansicht {#hidingdaysinthexaxisoftheview}

Um bestimmte Tage aus der Skala auszuschließen - zum Beispiel nur Arbeitstage anzuzeigen und Wochenenden auszublenden - verwenden Sie die Methode **ignore_month()**. 


Diese Funktion erhält das Datum der Zelle als Parameter. Geben Sie *true* für jeden Tag zurück, den Sie ausblenden möchten.

~~~js
// 0 ist Sonntag, 6 ist Samstag
scheduler.ignore_month = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) // blendet Samstage und Sonntage aus
        return true;
};
~~~


[Hiding week days in the scale of Month view](https://docs.dhtmlx.com/scheduler/samples/11_scales/01_month_ignore.html)


## Tageszahlen als anklickbare Links darstellen {#presenting-days-numbers-as-clickable-links}

Die Tageszahlen in der Monatsansicht können anklickbar gemacht werden, um den entsprechenden Tag in einer ausgewählten Ansicht zu öffnen.

So machen Sie die Tageszahlen anklickbar:

1. Aktivieren Sie die active_links-Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    active_links: true
});
~~~
2. (Optional) Legen Sie die Option [active_link_view](api/config/active_link_view.md) fest, um zu bestimmen, welche Ansicht beim Anklicken eines Tages geöffnet wird. Standardmäßig wird die [Tagesansicht](views/day.md) geöffnet:
~~~js
// Beim Anklicken eines Tages wird die Wochenansicht geöffnet
scheduler.config.active_link_view = "week";
...
scheduler.init('scheduler_here', new Date(2027,7,6), "month");
~~~


[Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)


## Events per Drag-and-Drop in der Größe verändern (ab Version 4.1) {#resizing-events-by-drag-n-drop-ver-41}

Standardmäßig ist das Größenändern von Ereignissen in der Monatsansicht per Drag-and-Drop nicht aktiviert (nur über das Bearbeitungsformular möglich).

Um das Größenändern von mehrtägigen Ereignissen per Drag-and-Drop zu ermöglichen, aktivieren Sie die Option [resize_month_events](api/config/resize_month_events.md):

~~~js
// Aktiviert das Größenändern von mehrtägigen Ereignissen per Drag-and-Drop
scheduler.config.resize_month_events = true; /*!*/

scheduler.init('scheduler_here', new Date(2027,0,10), "month");
~~~

[Resizable events in Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/32_resizable_month_events.html)


Um das Größenändern sowohl für mehrtägige als auch für eintägige Ereignisse per Drag-and-Drop zu ermöglichen, setzen Sie zusätzlich die Option [resize_month_timed](api/config/resize_month_timed.md) auf *true*:

~~~js
// Aktiviert das Größenändern für ein- und mehrtägige Ereignisse per Drag-and-Drop
scheduler.config.resize_month_events = true;/*!*/
scheduler.config.resize_month_timed = true;  /*!*/
scheduler.init('scheduler_here', new Date(2027,0,10), "month");
~~~

**Bitte beachten Sie:**

- Die Option [resize_month_timed](api/config/resize_month_timed.md) funktioniert nur, wenn [resize_month_events](api/config/resize_month_events.md) aktiviert ist.
- Wenn [resize_month_timed](api/config/resize_month_timed.md) aktiviert ist, erhalten eintägige Ereignisse ein anderes Aussehen:

![resizemonthtimed_config](/img/resizemonthtimed_config.png)
  

## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [Month View Templates](views/month-view-templates.md)
- [Daten laden](guides/loading-data.md)
- [Event-Objekt-Operationen](guides/event-object-operations.md)
- [Blockieren und Markieren von Daten](guides/limits.md)
- [Skins](guides/skins.md)
