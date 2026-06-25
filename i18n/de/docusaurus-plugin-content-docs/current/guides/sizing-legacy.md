---
title: "Größenanpassung von Skalen- und Ereignisboxen (v6.0)"
sidebar_label: "Größenanpassung von Skalen- und Ereignisboxen (v6.0)"
---

# Größenanpassung von Skalen- und Ereignisboxen (v6.0)

*Der Artikel bezieht sich auf dhtmlxScheduler 6.0 oder früher. Wenn Sie dhtmlxScheduler 7.0+ verwenden, siehe Details [hier](guides/sizing.md).*

In diesem Artikel möchten wir das Größenverhalten von Skala und Ereignisboxen anhand der Lösung von 4 Problemen betrachten:

**Problem 1:** [Ereignisse, die weniger als 1 Stunde dauern, sehen im Scheduler genauso aus wie die 1-Stunden-Ereignisse. Ich möchte, dass kurze Ereignisse in die Skala passen.](guides/sizing-legacy.md#how-to-make-short-events-fit-the-scale)
  
**Problem 2:** [Ereignisse, die weniger als 1 Stunde dauern und zu unterschiedlichen Zeiten, aber innerhalb einer Stunde, auftreten, überlappen. Ich möchte, dass solche kurzen Ereignisse sich nicht überlappen.](guides/sizing-legacy.md#preventing-short-events-from-overlapping)
  
**Problem 3:** [Ich ändere die Höhe der Skalen-Einheit und möchte den gestreiften Hintergrund entsprechend anpassen.](guides/sizing-legacy.md#how-to-change-the-background-according-to-the-set-scale)
  
**Problem 4:** [Der Standardabstand der Skala beträgt 1 Stunde. Ich möchte ihn ändern und beispielsweise 30 Minuten festlegen.](guides/sizing-legacy.md#how-to-change-the-scale-spacing)

## Wie kurze Ereignisse in die Skala passen

Zuerst schauen wir uns das Standardverhalten der Ereignisboxen an:

+ Die Standardhöhe der Skalen-Einheit beträgt 44px (oder die Stundenhöhe)
+ Die minimale Höhe der Ereignisbox beträgt 44px
+ Ereignisse, die weniger als 1 Stunde dauern, nehmen 44px Platz ein. Also sehen 15-Minuten- und 1-Stunden-Ereignisse im Scheduler gleich aus
+ Ereignisse, die länger als 1 Stunde dauern, erhalten ihre Höhe entsprechend der Seiten-Skala (angenommen, 1 Stunde entspricht 44px – ein 90-Minuten-Ereignis wird 63px hoch sein)

Angenommen, Sie möchten, dass 30-Minuten-Ereignisse in die Skala passen. Dann gibt es 2 Lösungen:

- Die Höhe der Skalen-Einheit erhöhen
- Die Ereignisbox anpassen

![30-minute_custom_event.png](/img/30-minute_custom_event.png)

### Lösung 1. Änderung der Höhe der Skalen-Einheit

Um die Höhe der Skalen-Einheit zu ändern, sollten Sie die Konfigurationsoption [hour_size_px](api/config/hour_size_px.md) verwenden.
  
Beispiel: Um die Höhe der Einheit zweimal zu erhöhen, rufen Sie die Option wie folgt auf:

~~~js
scheduler.config.hour_size_px = 88;

scheduler.init(...);
~~~

Nun beträgt die Höhe der Skalen-Einheit 88 px und das 30-Minuten-Ereignis, das 44px groß ist, wird die 30-Minuten-Höhe einnehmen, wie gewünscht.


[Ändern des Y-Achsen-Schritts](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


### Lösung 2. Anpassen der Ereignisbox

Um die Anzeige der Ereignisboxen anzupassen, verwenden Sie die [renderEvent](api/method/renderevent.md) Methode, die Ihnen erlaubt, Ihre eigene Vorlage für die Ereignisse festzulegen.

~~~js
scheduler.renderEvent = function(container, ev) {
    //Ihr Anpassungscode
}
~~~

Lesen Sie die Details im entsprechenden Kapitel - [Eigene Ereignisbox](guides/custom-events-display.md).


[Eigene Ereignisbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## Verhindern des Überlappens kurzer Ereignisse

Um kurze Ereignisse separat anzuzeigen und die Möglichkeit ihres Überlappens zu vermeiden, setzen Sie die Option [separate_short_events](api/config/separate_short_events.md) auf *true*:

~~~js
scheduler.config.separate_short_events = true;
~~~

![overlapping.png](/img/overlapping.png)

## Hintergrund entsprechend der festgelegten Skala ändern

Der Scheduler-Hintergrund wird durch ein einfaches Bild festgelegt. Um das Hintergrundbild zu ändern, definieren Sie die zugehörige CSS-Klasse neu, die **.dhx_scale_holder** lautet:

~~~html
<style>
.dhx_scale_holder {
     background-image: url("imgs/myNewImage.png");
}
</style>
~~~

~~~js
scheduler.init(...);
~~~

![changing_background.png](/img/changing_background.png)

## Wie der Skalenabstand geändert wird

Um den Standard-Skalenabstand zu ändern, muss die [hour_scale](api/template/hour_scale.md) Vorlage neu geschrieben werden. Um den Skalenabstand auf 30 Minuten festzulegen, schreiben Sie die Vorlage wie folgt neu:

~~~js
const format = scheduler.date.date_to_str("%H:%i");
const step = 30;
        
scheduler.templates.hour_scale = function(date){
    let html="";
    for (let i = 0; i < 60/step; i++){
        html += "<div style='height:22px;line-height:22px;'>" + format(date) + "</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}

~~~

![scale_spacing.png](/img/scale_spacing.png)

**Verwandte Beispiele:** [Benutzerdefinierte Y-Achse](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)