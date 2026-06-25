---
title: "Benutzerdefinierte Ereignis-Box"
sidebar_label: "Benutzerdefinierte Ereignis-Box"
---

# Benutzerdefinierte Ereignis-Box

dhtmlxScheduler bietet die Möglichkeit, eine benutzerdefinierte Anzeige für Ereignisse zu definieren.

:::note
Gilt nur für die Day View, Week View und Units View
:::

## Technik

Die Anpassung von Ereignissen erfolgt mit Hilfe der Methode **renderEvent**:

~~~js
scheduler.renderEvent = function(container, ev) {
    // your customizing code
}
~~~

- **_container_** - der Container des Ereignisses
- **_ev_** - das Ereignisobjekt


[Benutzerdefinierte Ereignis-Box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## Wichtige Hinweise

- Die Rückgabe von **_true_** wendet die benutzerdefinierte Logik an, die Rückgabe von **_false_** wendet die Standardlogik an.
- Einige CSS-Klassen haben eine spezielle Funktion (sie müssen zuerst im className des Elements stehen):
  - **_dhx_event_move_** - Ein Element mit diesem Stil kann gezogen werden (in der Regel ist es der Ereignis-Header).
  - **_dhx_event_resize_** - Das Ziehen eines Elements mit diesem Stil ändert die Dauer des Ereignisses.

~~~js
const html = "<div class='dhx_event_move my_event_move' "
~~~

## Beispiel

Hier ist ein Beispiel für ein benutzerdefiniertes Aussehen:

![custom_event_box](/img/custom_event_box.png)

[Festlegen eines benutzerdefinierten Aussehens für die Ereignis-Box](Specifying a custom look for the event's box)
~~~js
scheduler.templates.event_class = function(start, end, event) {
    return "my_event";
};

scheduler.renderEvent = function(container, ev) {
    const container_width = container.style.width; // z.B. "105px"

    // Verschiebebereich
    let html = "<div class='dhx_event_move my_event_move' style='width: " + 
    container_width + "'></div>";

    // Container für den Inhalt des Ereignisses
    html+= "<div class='my_event_body'>";
    html += "<span class='event_date'>";
    //zwei Optionen hier: Nur das Startdatum für kurze Ereignisse oder Start-+Enddatum für längere
    if ((ev.end_date - ev.start_date)/60000>40){ // wenn das Ereignis länger als 40 Minuten dauert
        html += scheduler.templates.event_header(ev.start_date, ev.end_date, ev);
        html += "</span>

";
    } else {
        html += scheduler.templates.event_date(ev.start_date) + "</span>";
    }
    // Anzeige des Texts des Ereignisses
    html += "<span>" + scheduler.templates.event_text(ev.start_date,ev.end_date,ev)+
    "</span>" + "</div>";

    // der Bereich zur Größenänderung
    html += "<div class='dhx_event_resize my_event_resize' style='width: " +
    container_width + "'></div>";

    container.innerHTML = html;
    return true; //erforderlich, true - um ein benutzerdefiniertes Formular anzuzeigen, false - das Standardformular
};
~~~

und das dazugehörige CSS lautet Folgendes:

~~~html
<style type="text/css" >
    /* der Hintergrundfarbe für den ganzen Container und dessen Rand*/
    .my_event {
        background: #add8e6;
        color: black;
        border: 1px solid #778899;
        overflow: hidden;
        display: block;
    }

    .dhx_cal_event_clear.my_event {
        height: 22px;
    }

    /* Stile für den Inhalt des Ereignisses */
    .dhx_cal_event.my_event .my_event_body {
        padding-top: 3px;
        padding-left: 5px;
    }
    /* Informationen zum Datum des Ereignisses */
    .my_event .event_date {
        font-weight: bold;
        padding-right: 5px;
    }
    /* Bereich zur Größenänderung des Ereignisses */
    .my_event_resize {
        height: 3px;
        position: absolute;
        bottom: -1px;
    }
    /* Bereich zum Verschieben des Ereignisses */
    .my_event_move {
        position: absolute;
        top: 0;
        height: 10px;
        cursor: pointer;
    }
</style>
~~~

Sie können auch CSS-Variablen anstelle fester Farbwerte verwenden, wie folgt:

~~~html
<style>
.my_event {
    --dhx-scheduler-event-background: #add8e6;
    --dhx-scheduler-event-color: black;
    --dhx-scheduler-event-border: 1px solid #778899;

    overflow: hidden;
    display: block;
}
</style>
~~~


[Benutzerdefinierte Ereignis-Box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)