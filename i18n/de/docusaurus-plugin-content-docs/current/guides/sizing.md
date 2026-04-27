---
title: "Größe der Skalen- und Ereignisboxen anpassen"
sidebar_label: "Größe der Skalen- und Ereignisboxen anpassen"
---

# Größe der Skalen- und Ereignisboxen anpassen 

*Wenn Sie dhtmlxScheduler 6.0 oder früher verwenden, finden Sie Details [hier](guides/sizing-legacy.md).*

In diesem Artikel betrachten wir, wie Sie die Größen von Ereignissen und der Zeitachse verwalten können.

## Kurze Ereignis-Anzeige

Zunächst lernen wir das Standardverhalten der Ereignisboxen kennen:

+ die Standardhöhe der Skalen-Einheit beträgt 44px (oder die Stundenhöhe), definiert durch [hour_size_px](api/config/hour_size_px.md)
+ die minimale Höhe der Ereignisbox beträgt 20px, festgelegt durch die Einstellung **scheduler.xy.min_event_height**
+ da ein Ereignis nicht weniger als 20px hoch sein kann, haben sowohl 15-Minuten- als auch 5-Minuten-Ereignisse dieselbe Höhe
+ Ereignisse, die weniger als 42px hoch sind, verwenden einen speziellen Anzeigemodus und erhalten eine zusätzliche CSS-Klasse, um die Anzeige kürzerer Ereignisse zu ermöglichen:
  + `.dhx_cal_event--small` - Ereignisse unter 42px
  + `.dhx_cal_event--xsmall` - Ereignisse unter 30px

![30_minute_short_event](/img/30_minute_short_event.png)

Sie können die Höhe der Zeitachse erhöhen, um die Sichtbarkeit solcher Ereignisse zu verbessern:

~~~js
scheduler.config.hour_size_px = 90;
scheduler.render();// oder scheduler.init(...)
~~~

![30_minute_long_event](/img/30_minute_long_event.png)

### Anpassung der Ereignisbox

Es ist möglich, die Render-Funktion der Ereignisbox vollständig zu überschreiben. Dazu sollten Sie die [renderEvent](api/method/renderevent.md) Methode verwenden, die es Ihnen ermöglicht, Ihre eigene Vorlage für die Ereignisse festzulegen:

~~~js
scheduler.renderEvent = function(container, ev) {
    //your customizing code
}
~~~

Lesen Sie die Details im entsprechenden Kapitel - [Eigene Ereignisbox](guides/custom-events-display.md).


[Beispiel einer eigenen Ereignisbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## Verhindern von Überschneidungen kurzer Ereignisse

Um kurze Ereignisse separat anzuzeigen und die Möglichkeit ihrer Überschneidung zu eliminieren, sollten Sie die Option [separate_short_events](api/config/separate_short_events.md) auf *true* setzen:

~~~js
scheduler.config.separate_short_events = true;
~~~

:::note
Diese Konfiguration ist standardmäßig ab Version v7.0 aktiviert. Falls Sie eine frühere Version des Schedulers verwenden, müssen Sie sie manuell aktivieren.
:::

## Wie man den Skalenabstand ändert

Um den Standard-Skalenabstand zu ändern, müssen Sie die [hour_scale](api/template/hour_scale.md) Vorlage neu schreiben.
Um den Skalenabstand auf 30 Minuten festzulegen, können Sie die Vorlage wie folgt neu schreiben:

~~~js
const format = scheduler.date.date_to_str("%H:%i");
const step = 30;
        
scheduler.templates.hour_scale = function(date){
    let html="";
    for (let i = 0; i < 60/step; i++){
        html += "<div style='height:22px;line-height:22px;'>"+format(date)+"</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}
~~~

![scale_spacing.png](/img/scale_spacing.png)

**Verwandte Beispiele:** [Benutzerdefinierte Y-Achse](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)