---
sidebar_label: "createTimelineView"
title: "createTimelineView method"
description: "richtet die Timeline-Ansicht im Scheduler ein"
---

# createTimelineView
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Richtet die Timeline-Ansicht im Scheduler ein

@signature: createTimelineView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - Das Konfigurationsobjekt für die Timeline-Ansicht

### Example

~~~jsx
// Zeitskala von 8 Uhr bis 20 Uhr mit 30-Minuten-Intervallen
scheduler.createTimelineView({
    name: "timeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    30,
    x_size:    24,
    x_start: 16,
    x_length: 48,
    fit_events_offset: 15,
    y_unit:[    
         {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"},
        {key:4, label:"Section D"}    
    ],
    y_property: "section_id",
    render:    "bar"
});
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Related samples
- [Cell mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)
- [Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)
- [Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)
- [Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)

### Details

:::note
 Die Methode setzt voraus, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::


Das Konfigurationsobjekt der Timeline-Ansicht unterstützt folgende Eigenschaften:

- <b>name</b>- (<i>string</i>) der Bezeichner der Ansicht. Die Definition eines Namens, der mit einer bestehenden Timeline-Ansicht übereinstimmt, überschreibt diese
- <b>render</b> - (<i>'cell', 'bar', 'tree', 'days'</i>) definiert den Modus der Ansicht. Standard ist 'cell'
- <b>y_property</b> - (<i>string</i>) die Dateneigenschaft, die verwendet wird, um Events bestimmten Abschnitten zuzuordnen
- <b>y_unit</b> - (<i>Array von Objekten</i>) definiert die Abschnitte in der Ansicht.<br> Jedes Objekt repräsentiert einen Abschnitt mit folgenden Eigenschaften:
    - <b>children</b> - (<i>Array</i>) verschachtelte Einträge nur für den 'Tree'-Modus
    - <b>key</b> - (<i>string</i>) die ID des Abschnitts, die mit der Event-Eigenschaft abgeglichen wird, um Events zuzuordnen
    - <b>label</b> - (<i>string</i>) die Anzeige-Bezeichnung des Abschnitts
    - <b>open</b> - (<i>boolean</i>) ob der Abschnitt initial geöffnet ist (für 'Tree'-Modus)
- <b>days</b> - (<i>number</i>) Anzahl der Elemente (Tage) auf der Y-Achse, relevant nur für den 'Days'-Modus
- <b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) Maßeinheit für die X-Achse. Standard ist 'minute'
- <b>x_date</b> - (<i>string</i>) Datumsformat für die X-Achse (siehe [Datumsformat-Spezifikation](guides/settings-format.md)). Falls nicht gesetzt, wird das Format aus [hour_date](api/config/hour_date.md) verwendet
- <b>x_step</b> - (<i>number</i>) Schrittgröße auf der X-Achse in Einheiten von <b>'x_unit'</b>. Standard ist 1
- <b>x_start</b> - (<i>number</i>) Offset auf der X-Achse in Einheiten von <b>'x_unit'</b>. Standard ist 0
- <b>x_size</b> - (<i>number</i>) Gesamtlänge der X-Achse, ausgedrückt als Anzahl von <b>'x_step'</b>-Schritten. Standard ist 24
- <b>x_length</b> - (<i>number</i>) Anzahl der <b>'x_step'</b>-Schritte, die beim Klick auf den 'next'-Button im Scheduler-Header gescrollt werden. Optional, Standard ist 1.  
Dieser Parameter ist etwas komplex; beachten Sie:
    - Er gilt nur, wenn <b>x_unit='minute'</b> oder <b>x_unit='hour'</b> gesetzt ist. Andernfalls kann er weggelassen werden.
    - Ohne gesetztes <b>x_length</b> für diese Einheiten zeigt die Timeline ein Teilintervall des Tages basierend auf anderen Skalierungsparametern (<b>x_start</b>, <b>x_step</b>, <b>x_size</b>) und ermöglicht das Scrollen durch Tagesabschnitte.
    - Wird <b>x_length</b> gesetzt, sollte es den gesamten Tag abdecken (Anzahl der <b>x_steps</b>, die den Tag füllen), damit der 'next'-Button korrekt funktioniert.
- <b>first_hour</b> - (<i>number</i>) Startstunde des Zeitintervalls in einer Zelle, nur verwendet wenn <b>x_unit="day"</b> ist
- <b>last_hour</b> - (<i>number</i>) Endstunde des Zeitintervalls in einer Zelle, nur verwendet wenn <b>x_unit="day"</b> ist
- <b>show_unassigned</b> (<i>boolean</i>) wenn false, werden Events ohne Abschnittszuordnung nicht angezeigt; wenn true, erscheinen diese Events im ersten Abschnitt. Standard ist false. Optional
- <b>section_autoheight</b> - (<i>boolean</i>) aktiviert automatische Höhenanpassung der Zellen. Standard ist true 
- <b>dy</b> - (<i>number</i>) minimale Zellhöhe (wenn <b>section_autoheight</b> false ist, haben Zellen diese feste Höhe; sonst dehnt sich die Höhe aus, um den Raum zu füllen). Standard ist 50
- <b>dx</b> - (<i>number</i>) Breite der Spalte, die Abschnittsnamen anzeigt. Standard ist 200 
- <b>event_dy</b> - (<i>number/string</i>) Höhe der Events; kann 'full' sein, um die gesamte Zelle auszufüllen. Standard ist <b>scheduler.xy.bar_height-5</b> 
- <b>event_min_dy</b> - (<i>number</i>) minimale Event-Höhe. Standard ist <b>scheduler.xy.bar_height-5</b> 
- <b>resize_events</b> - (<i>boolean</i>) ob einzelne Event-Höhen verkleinert werden können, um in eine einzelne Event-Höhe zu passen (nicht kleiner als <b>event_min_dy</b>). Standard ist true 
- <b>fit_events</b> - (<i>boolean</i>) ob die Abschnittshöhe erweitert wird, um alle Events aufzunehmen, oder ob sie fix bleibt (<b>dy</b>). Verfügbar seit Version 3.0. Standard ist true
- <b>fit_events_offset</b> - (<i>number</i>) zusätzlicher Abstand (Pixel) unter dem letzten Event, angewandt wenn <b>fit_events</b> true ist
- <b>round_position</b> - (<i>boolean</i>) dehnt Events über die gesamte Zellbreite aus, unabhängig von der Dauer. Standard ist false. Gilt nur für 'Bar' und 'Tree' Modi 
- <b>folder_events_available</b> - (<i>boolean</i>) erlaubt das Zuweisen von Events an ganze Ordner (beliebige Ebene), nicht nur an einzelne Holder. Nur für 'Tree'-Modus. Standard ist false 
- <b>folder_dy</b> - (<i>number</i>) Höhe in Pixel von Ordnern (Abschnitte mit Kindabschnitten). Nur für 'Tree'-Modus 
- <b>second_scale</b> - (<i>object</i>) fügt eine zweite X-Achse oberhalb der Standardachse hinzu, um Zeitintervalle zu gruppieren. Optional. Verfügbar ab Version 3.0. <br> Dieses Objekt beinhaltet:
    - <b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) Maßeinheit. Standard ist 'minute'
    - <b>x_date</b> - (<i>string</i>) Datumsformat (siehe [Datumsformat-Spezifikation](guides/settings-format.md)). Falls nicht gesetzt, wird das Format aus [hour_date](api/config/hour_date.md) verwendet
- <b>scrollable</b> - (<i>boolean</i>) aktiviert horizontales Scrollen in der Timeline-Ansicht; standardmäßig false. Wenn false oder undefiniert, schrumpfen die Datums-Spalten, um in die Viewport-Breite zu passen. Wenn true, schrumpfen die Spalten nicht unter <b>column_width</b> und eine horizontale Scrollbar erscheint bei Bedarf.
- <b>column_width</b> - (<i>number</i>) minimale Breite der Timeline-Datumsspalten; Standard ist 100
- <b>scroll_position</b> - (<i>Date</i>) scrollt die Timeline nach dem Rendern zu einem bestimmten Datum; akzeptiert dieselben Argumente wie <b>timeline.scrollTo()</b>
- <b>autoscroll</b> - (<i>object</i>) konfiguriert Empfindlichkeit und Geschwindigkeit des Autoscrolls mit folgenden Eigenschaften:
    - <b>range_x</b> - (<i>number</i>) horizontaler Autoscroll-Abstand von den Rändern des Datenbereichs
    - <b>range_y</b> - (<i>number</i>) vertikaler Autoscroll-Abstand von den Rändern des Datenbereichs
    - <b>speed_x</b> - (<i>number</i>) horizontale Autoscroll-Geschwindigkeit
    - <b>speed_y</b> - (<i>number</i>) vertikale Autoscroll-Geschwindigkeit
- <b>cell_template</b> - (<i>boolean</i>) aktiviert das Rendern einer benutzerdefinierten Vorlage für Timeline-Zellen
- **smart_rendering** - (*boolean*) aktiviert Smart Rendering, das nur sichtbare Reihen, Spalten und Events rendert und andere beim Scrollen lädt. Standardmäßig in scrollbaren Timelines aktiviert.
- <b>columns</b>- (<i>array</i>) definiert Spalten für das linke Panel. Wenn nicht angegeben, wird die [timeline_scale_label](api/template/timelinename_scale_label.md) Vorlage verwendet.


## Dynamische Änderung von Eigenschaften

Alle Timeline-Views werden in **scheduler.matrix** gespeichert.
Sie können jede Timeline-View-Konfiguration über ihren Namen abrufen und ändern. Die Änderungen werden nach dem Neuzeichnen des Schedulers wirksam:

~~~js
scheduler.getView('timeline').x_size = 12;
scheduler.setCurrentView(); // zeichnet den Scheduler neu
~~~


Hier ist "timeline" der Name, der der Timeline-Ansicht in der [createTimelineView](api/method/createtimelineview.md) Methode zugewiesen wurde:

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
});
~~~
