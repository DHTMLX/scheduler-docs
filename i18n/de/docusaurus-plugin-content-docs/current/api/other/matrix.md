---
sidebar_label: "matrix"
title: "matrix config"
description: "Speichert die Konfigurationsobjekte aller auf der Seite definierten Timelines"
---

# matrix

### Description

@short: Speichert die Konfigurationsobjekte aller auf der Seite definierten Timelines

@signature: matrix: any

### Example

~~~jsx
scheduler.createTimelineView({
    name:    "myTimeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    30,
    x_size:    24,
    x_start: 16,
    x_length:    48,
    y_unit:    sections,
    y_property:    "section_id",
    render:"bar"
});

var configObj = scheduler.matrix;
~~~

### Related samples
- [Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)

### Details

Die Variable **configObj** enthält die folgende Struktur:

~~~js
{
    myTimeline:{
        name:    "myTimeline",
        x_unit:    "minute",
        ...
    }
}
~~~

:::note

Diese Eigenschaft ermöglicht es, die Timeline-Konfiguration zur Laufzeit anzupassen. <br>
Wenn Sie jedoch größere Änderungen an der Konfiguration vornehmen möchten, ist es meist besser, mehrere Konfigurationsobjekte zu definieren und die aktuelle Timeline auszutauschen, anstatt die **matrix**-Eigenschaft direkt zu verändern.
 
:::

Beispielsweise, wenn Sie die Werte für x_step, x_size und x_start der oben gezeigten Timeline aktualisieren möchten:

~~~
//eine Möglichkeit ist diese:
configObj.x_step = 50;
configObj.x_size = 28;
configObj.x_start = 20;
scheduler.updateView();

//aber eine effektivere Methode ist:

scheduler.createTimelineView({
    name:    "myTimeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    50,
    x_size: 28,
    x_start: 20,
    x_length:    48,
    y_unit:    sections,
    y_property:    "section_id",
    render:"bar"
});
~~~
*Wenn eine Timeline mit einem bereits existierenden Namen erstellt wird, fügt der scheduler keine neue Timeline hinzu, sondern aktualisiert die bestehende.*
