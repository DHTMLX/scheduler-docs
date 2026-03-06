---
title: "Benutzerdefiniertes Ereignisfeld"
sidebar_label: "Benutzerdefiniertes Ereignisfeld"
---

# Benutzerdefiniertes Ereignisfeld 

dhtmlxScheduler ermöglicht es Ihnen, die Darstellung von Ereignissen individuell anzupassen.

:::note
Diese Funktion ist nur mit [Tagesansicht](views/day.md), [Week-Ansicht](views/week.md) und [Units-Ansicht](views/units.md) verfügbar.
:::

## Technik

Sie können Ereignisse mit der Methode [renderEvent](api/method/renderevent.md) anpassen:

~~~js
scheduler.renderEvent = function(container, ev) {
    // Ihr Anpassungscode
}
~~~

- **_container_** - das Containerelement für das Ereignis
- **_ev_** - das Ereignisobjekt selbst


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## Wichtige Hinweise

- Wenn Sie _true_ zurückgeben, wird Ihr benutzerdefiniertes Rendering angewendet. Wenn Sie _false_ zurückgeben, wird das Standard-Rendering verwendet.
- Einige CSS-Klassen haben spezielle Funktionen und sollten als erste in der className des Elements stehen:
  - **_dhx_event_move_** - macht das Element verschiebbar (normalerweise der Ereignis-Header).
  - **_dhx_event_resize_** - ermöglicht es, die Dauer des Ereignisses durch Ziehen des Elements zu ändern.

~~~js
var html = "<div class='dhx_event_move my_event_move' "
~~~

## Beispiel

Hier sehen Sie ein Beispiel für eine benutzerdefinierte Darstellung eines Ereignisses:

![custom_event_box](/img/custom_event_box.png)

~~~js title="Definieren eines benutzerdefinierten Aussehens für das Ereignisfeld"
scheduler.templates.event_class = function(start, end, event) {
    return "my_event";
};

scheduler.renderEvent = function(container, ev) {
    var container_width = container.style.width; // z.B. "105px"

    // Verschiebebereich
    var html = "<div class='dhx_event_move my_event_move' style='width: " + 
    container_width + "'></div>";

    // Container für den Inhalt des Ereignisses
    html += "<div class='my_event_body'>";
    html += "<span class='event_date'>";
    // Zwei Optionen: nur das Startdatum für kurze Ereignisse oder Start+Ende für längere anzeigen
    if ((ev.end_date - ev.start_date)/60000 > 40) { // wenn das Ereignis länger als 40 Minuten dauert
        html += scheduler.templates.event_header(ev.start_date, ev.end_date, ev);
        html += "</span>

";
    } else {
        html += scheduler.templates.event_date(ev.start_date) + "</span>";
    }
    // Anzeige des Ereignistexts
    html += "<span>" + scheduler.templates.event_text(ev.start_date, ev.end_date, ev) +
    "</span></div>";

    // Bereich für die Größenanpassung
    html += "<div class='dhx_event_resize my_event_resize' style='width: " +
    container_width + "'></div>";

    container.innerHTML = html;
    return true; // wichtig: true für benutzerdefiniertes Rendering, false für Standard
};
~~~

Das zugehörige CSS sieht so aus:

~~~html
<style type="text/css" >
    /* Hintergrund und Rahmen für den gesamten Container */
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

    /* Stile für den Ereignisinhalt */
    .dhx_cal_event.my_event .my_event_body {
        padding-top: 3px;
        padding-left: 5px;
    }
    /* Styling für das Ereignisdatum */
    .my_event .event_date {
        font-weight: bold;
        padding-right: 5px;
    }
    /* Bereich für die Größenanpassung */
    .my_event_resize {
        height: 3px;
        position: absolute;
        bottom: -1px;
    }
    /* Bereich zum Verschieben */
    .my_event_move {
        position: absolute;
        top: 0;
        height: 10px;
        cursor: pointer;
    }
</style>
~~~

Alternativ können Sie anstelle von festen Farben auch CSS-Variablen verwenden, zum Beispiel so:

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


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)
