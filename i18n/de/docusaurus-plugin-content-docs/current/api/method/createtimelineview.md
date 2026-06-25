--- 
sidebar_label: createTimelineView
title: "createTimelineView Methode"
description: "Erstellt die Timeline-Ansicht im Scheduler" 
---

# createTimelineView
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Erzeugt die Timeline-Ansicht im Scheduler.

@signature: createTimelineView: (config: any) => void

### Parameters

- `config` - (required) *object* - das Konfigurationsobjekt der Timeline-Ansicht

### Example

~~~jsx
// the time scale from 8 AM to 8 PM with a 30-minute step
scheduler.createTimelineView({
    name: "timeline",
    x_unit: "minute",
    x_date: "%H:%i",
    x_step: 30,
    x_size: 24,
    x_start: 16,
    x_length: 48,
    fit_events_offset: 15,
    y_unit: [
        { key: 1, label: "Section A" },
        { key: 2, label: "Section B" },
        { key: 3, label: "Section C" },
        { key: 4, label: "Section D" }
    ],
    y_property: "section_id",
    render: "bar"
});
~~~

**Anwendbare Ansichten:** [Timeline-Ansicht](views/timeline.md)

### Related samples
- [Zellen-Modus](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)
- [Bar-Modus](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)
- [Baum-Modus](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)
- [Tage als Timeline-Reihen](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)

### Details

:::note
 Die Methode erfordert, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist.
 :::

The configuration object of the Timeline view can have the following properties:

- `name` - (*string*) die ID der Ansicht. Wenn Sie den Namen einer bereits bestehenden Timeline-Ansicht angeben, wird sie überschrieben
- `render` - (*'cell', 'bar', 'tree', 'days'*) der Modus der Ansicht. Standardmäßig 'cell'
- `y_property` - (*string*) der Name einer Daten-Eigenschaft, die verwendet wird, um Ereignisse bestimmten Abschnitten zuzuordnen
- `y_unit` - (*array of objects*) definiert Abschnitte der Ansicht. Jedes Objekt im Array gibt einen einzelnen Abschnitt an und besitzt diese Eigenschaften:
    - `children` - (*array*) ein Array verschachtelter Objekte (nur im 'Tree'-Modus)
    - `key` - (*string*) die ID des Abschnitts. Dieses Attribut wird mit der Ereignis-Daten-Eigenschaft verglichen, um das Ereignis zu einem Abschnitt zuzuordnen
    - `label` - (*string*) die Beschriftung des Abschnitts
    - `open` - (*boolean*) gibt an, ob der Abschnitt initial geöffnet sein wird (nur im 'Tree'-Modus)
- `days` - (*number*) eine Anzahl von Items (Tagen) auf der Y-Achse. Anwendbar nur im 'Days'-Modus
- `x_unit` - (*minute, hour, day, week, month, year*) die Messeinheit der X-Achse. Standardmäßig 'minute'
- `x_date` - (*string*) das Datumsformat der [X-Achse](guides/settings-format.md). Falls nicht angegeben, wird das [`hour_date`](api/config/hour_date.md) Format verwendet
- `x_step` - (*number*) der X-Achsen-Schritt in `x_unit`s. Standardmäßig 1
- `x_start` - (*number*) der X-Achsen-Versatz in `x_unit`s. Standardmäßig 0
- `x_size` - (*number*) die X-Achsen-Länge, angegeben als Gesamtzahl der `x_step`s. Standardmäßig 24
- `x_length` - (*number*) die Anzahl von `x_step`s, die beim Scrollen mit dem 'next'-Knopf im Scheduler-Header verschoben wird. Optional. Standardmäßig 1.
Es ist ein etwas kniffliger Parameter, und um Fehler zu vermeiden, beachten Sie Folgendes:
    - Sie können den Parameter nur verwenden, wenn `x_unit='minute'` oder `x_unit='hour'` ist. In anderen Fällen muss der Parameter überhaupt nicht angegeben werden.
    - Wenn `x_unit='minute'` oder `x_unit='hour'` und Sie `x_length` nicht angeben, zeigt die X-Achse den durch die verbleibenden Skalenparameter (`x_start`, `x_step`, `x_size`) definierten Zeitabschnitt an (nicht den ganzen Tag, wie üblich). Dies ermöglicht es, einen Tag in gleiche Zeitintervalle zu unterteilen und diese mit dem 'Next'-Knopf zu scrollen.
    - Wenn `x_unit='minute'` oder `x_unit='hour'` und Sie sich entscheiden, den Parameter zu setzen, setzen Sie ihn auf den ganzen Tag (d. h. `x_length` sollte der Anzahl der `x_steps` entsprechen, die nötig ist, um den ganzen Tag zu füllen), um die korrekte Funktionsweise des 'Next'-Knopfs zu gewährleisten.
- `first_hour` - (*number*) legt die Startstunde des Zell-Zeitfensters fest. Das Attribut gilt nur, wenn `x_unit="day"`
- `last_hour` - (*number*) legt die Endstunde des Zell-Zeitfensters fest. Das Attribut gilt nur, wenn `x_unit="day"`
- `show_unassigned` - (*boolean*) wenn false, werden Ereignisse, die keiner Sektion zugeordnet sind, nicht angezeigt. Wenn true - solche Ereignisse werden in die erste Sektion platziert. Standardmäßig false. Optional
- `section_autoheight` - (*boolean*) aktiviert eine automatische Höhenanpassung der Zellen. Standardmäßig true
- `dy` - (*number*) die minimale Höhe der Zellen (wenn die Eigenschaft `section_autoheight` den Wert false hat, entspricht die Höhe der Zellen `dy`; andernfalls wird die Höhe der Zellen erhöht, um freien Platz zu füllen). Standard 50
- `dx` - (*number*) die Breite der Spalte mit den Namen der Abschnitte. Standard 200
- `event_dy` - (*number/string*) die Höhe der Ereignisse. Kann den Wert `full` annehmen und die gesamte Zelle einnehmen. Standard: gleich `scheduler.xy.bar_height-5`
- `event_min_dy` - (*number*) die minimale Ereignishöhe. Standard: gleich `scheduler.xy.bar_height-5`
- `resize_events` - (*boolean*) gibt an, ob die Höhe einzelner Ereignisse verringert werden soll, um die Gesamthöhe auf die Höhe eines einzelnen Ereignisses zu reduzieren (aber nicht unter den Wert von `event_min_dy`). Standard: true
- `fit_events` - (*boolean*) gibt an, ob die Höhe der Abschnitte erhöht werden soll, um alle Ereignisse in diesem Abschnitt unterzubringen, oder ob sie fest (durch den Parameter `dy`) bleiben soll. Verfügbar seit Version 3.0. Standard: true
- `fit_events_offset` - (*number*) fügt zusätzlichen Abstand (in Pixeln) unter dem letzten Ereignis hinzu. Wird angewendet, wenn `fit_events` auf true gesetzt ist
- `round_position` - (*boolean*) 'dehnt' die Ereignisse über die gesamte Zellbreite hinweg, unabhängig davon, wie lange das Ereignis dauert. Standard: false. Nur für Modus 'Bar' und 'Tree'
- `folder_events_available` - (*boolean*) sollte auf true gesetzt werden, wenn Sie die Möglichkeit haben möchten, Ereignisse nicht nur für einen einzelnen Halter, sondern auch für den gesamten Ordner (jede Ebene) zu spezifizieren. Gültig nur im Modus 'Tree'. Standard: false
- `folder_dy` - (*number*) die Höhe von Ordnern in Pixeln (Ordner sind Abschnitte, die untergeordnete Abschnitte haben). Gültig nur im Modus 'Tree'
- `second_scale` - (*object*) fügt eine zweite X-Achse oben der Standardachse hinzu und dient dazu, Zeitintervalle auf der Original-Skala zu gruppieren. Optional. Verfügbar ab Version 3.0. Das Scale-Objekt hat folgende Eigenschaften:
    - `x_unit` - (*minute, hour, day, week, month, year*) die Messeinheit der Achse. Standardmäßig 'minute'
    - `x_date` - (*string*) das Datumsformat der [Achse](guides/settings-format.md). Falls nicht angegeben, wird das [`hour_date`](api/config/hour_date.md) Format verwendet
- `scrollable` - (*boolean*) aktiviert horizontales Scrollen in der Timeline-Ansicht, standardmäßig false. Wenn false oder undefiniert, schrumpfen Datum-Spalten, um die Zeitachse an die Anzeigebreite anzupassen.
Wenn true, schrumpfen Datum-Spalten nicht unter den Wert von `column_width`, eine horizontale Bildlaufleiste erscheint bei Bedarf.
- `column_width` - (*number*) definiert die minimale Breite der Timeline-Datum-Spalten, standardmäßig 100
- `scroll_position` - (*Date*) rendert die Timeline mit gescrollter Position zu einem bestimmten Datum, verwendet dieselben Argumente wie `timeline.scrollTo()`, d. h. das Datum, zu dem die Timeline nach dem Rendering gescrollt werden soll
- `autoscroll` - (*object*) ermöglicht das Konfigurieren der Empfindlichkeit und Geschwindigkeit des Autoscrollings. Das Autoscroll-Objekt hat die folgenden Eigenschaften:
    - `range_x` - (*number*) horizontale Autoscroll-Distanz zum Rand des Datenbereichs
    - `range_y` - (*number*) vertikale Autoscroll-Distanz zum Rand des Datenbereichs
    - `speed_x` - (*number*) horizontale Autoscroll-Geschwindigkeit
    - `speed_y` - (*number*) vertikale Autoscroll-Geschwindigkeit
- `cell_template` - (*boolean*) aktiviert das Rendern einer für eine Timeline festgelegten Vorlage
- `smart_rendering` - (*boolean*) aktiviert die Smart-Rendering-Funktionalität in einer Timeline (erlaubt das Rendern nur der sichtbaren Zeilen, Spalten und Ereignisse, während andere Elemente beim Scrollen der Timeline gerendert werden). Beachten Sie, dass in einer [scrollbaren Timeline](views/timeline.md#horizontal-scroll) diese Einstellung standardmäßig aktiviert ist.
- `columns` - (*array*) eine Liste von Spalten für das linke Panel. Falls nicht angegeben, wird die Vorlage [`timeline_scale_label`](api/template/timelinename_scale_label.md) für den Inhalt des Panels verwendet.

## Dynamic change of properties

Alle definierten Timeline-Objekte werden im `scheduler.matrix`-Objekt gespeichert.
Sie können die Konfiguration einer Timeline-Ansicht anhand ihres Namens abrufen und jede Eigenschaft ändern. Änderungen werden angewendet, sobald Sie den Scheduler mit `setCurrentView()` aktualisieren:

~~~js
scheduler.getView('timeline').x_size = 12;
scheduler.setCurrentView(); // redraws scheduler
~~~

where "timeline" is the name of the timeline view as specified in the [`createTimelineView()`](api/method/createtimelineview.md) method:

~~~js
scheduler.createTimelineView({
    name: "timeline",
    ...
});
~~~