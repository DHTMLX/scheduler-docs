---
title: "Größe der Skalen- und Ereignisboxen anpassen"
sidebar_label: "Größe der Skalen- und Ereignisboxen anpassen"
---

# Größe der Skalen- und Ereignisboxen anpassen 

*Wenn Sie mit dhtmlxScheduler 6.0 oder einer früheren Version arbeiten, finden Sie die Details [hier](guides/sizing-legacy.md).*

Dieser Artikel erklärt, wie Sie die Größe der Ereignisboxen und der Zeitskala anpassen können.

## Anzeige von kurzen Ereignissen

Schauen wir uns zunächst an, wie sich Ereignisboxen standardmäßig verhalten:

+ Die Standardhöhe einer Skaleneinheit beträgt 44px (entspricht einer Stunde), wie in [hour_size_px](api/config/hour_size_px.md) beschrieben.
+ Die Mindesthöhe für eine Ereignisbox beträgt 20px, festgelegt durch die **scheduler.xy.min_event_height** Konfiguration.
+ Da Ereignisse nicht kürzer als 20px sein können, haben sowohl 15-Minuten- als auch 5-Minuten-Ereignisse die gleiche Höhe.
+ Ereignisse mit einer Höhe unter 42px verwenden einen speziellen Anzeigemodus und erhalten eine zusätzliche CSS-Klasse zur Handhabung kürzerer Ereignisse:
    + `.dhx_cal_event--small` für Ereignisse unter 42px
    + `.dhx_cal_event--xsmall` für Ereignisse unter 30px

![30_minute_short_event](/img/30_minute_short_event.png)

Um diese kurzen Ereignisse besser sichtbar zu machen, können Sie die Höhe der Zeitskala erhöhen:

~~~js
scheduler.config.hour_size_px = 90;
scheduler.render();// oder scheduler.init(...)
~~~

![30_minute_long_event](/img/30_minute_long_event.png)

### Anpassung der Ereignisbox

Sie haben die Möglichkeit, das Rendering der Ereignisboxen vollständig anzupassen, indem Sie die Renderfunktion überschreiben. Dies kann mit der [renderEvent](api/method/renderevent.md) Methode erfolgen, mit der Sie Ihre eigene Ereignisvorlage definieren können:

~~~js
scheduler.renderEvent = function(container, ev) {
    //Ihr Anpassungscode
}
~~~

Weitere Informationen finden Sie im entsprechenden Kapitel - [Benutzerdefiniertes Ereignisfeld](guides/custom-events-display.md).


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## Überlappung von kurzen Ereignissen verhindern

Um kurze Ereignisse voneinander zu trennen und Überlappungen zu vermeiden, setzen Sie die Option [separate_short_events](api/config/separate_short_events.md) auf *true*:

~~~js
scheduler.config.separate_short_events = true;
~~~

:::note
Ab Version 7.0 ist diese Einstellung standardmäßig aktiviert. Sie müssen sie nur manuell aktivieren, wenn Sie eine ältere Scheduler-Version verwenden.
:::

## Wie man den Skalenabstand ändert

Um den Standardabstand der Skala anzupassen, können Sie die [hour_scale](api/template/hour_scale.md) Vorlage überschreiben. Zum Beispiel, um den Skalenabstand auf 30 Minuten zu setzen, schreiben Sie die Vorlage wie folgt um:

~~~js
var format = scheduler.date.date_to_str("%H:%i");
var step = 30;
        
scheduler.templates.hour_scale = function(date){
    var html="";
    for (var i="0;" i<60/step; i++){
        html+="<div>"+format(date)+"</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}

~~~

![scale_spacing.png](/img/scale_spacing.png)

**Zugehörige Beispiele:**


[Custom Y-Axis](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)
