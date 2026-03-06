---
title: "Größenanpassung von Skalen- und Ereignisboxen (v6.0)"
sidebar_label: "Größenanpassung von Skalen- und Ereignisboxen (v6.0)"
---

# Größenanpassung von Skalen- und Ereignisboxen (v6.0)

*Dieser Artikel behandelt dhtmlxScheduler Version 6.0 und früher. Für Versionen 7.0 und höher finden Sie Details [hier](guides/sizing.md).*

Hier liegt der Fokus darauf, die Größe von Skalen-Einheiten und Ereignisboxen anzupassen. Es werden vier typische Szenarien behandelt:

**Problem 1:** [Ereignisse, die kürzer als 1 Stunde sind, erscheinen im Scheduler genauso groß wie 1-stündige Ereignisse. Ziel ist es, dass kurze Ereignisse richtig zur Skala passen.](guides/sizing-legacy.md#howtomakeshorteventsfitthescale)
  
**Problem 2:** [Kurze Ereignisse, die zu unterschiedlichen Zeiten innerhalb derselben Stunde stattfinden, überlappen sich. Ziel ist es, eine solche Überlappung zu verhindern.](guides/sizing-legacy.md#preventingshorteventsfromoverlapping)
  
**Problem 3:** [Nach dem Ändern der Skalenhöhe muss der gestreifte Hintergrund entsprechend angepasst werden.](guides/sizing-legacy.md#howtochangethebackgroundaccordingtothesetscale)
  
**Problem 4:** [Der Standardabstand der Skala beträgt 1 Stunde, soll aber beispielsweise auf 30 Minuten geändert werden.](guides/sizing-legacy.md#howtochangethescalespacing)

## Wie man kurze Ereignisse passend zur Skala darstellt {#howtomakeshorteventsfitthescale}

Sehen wir uns zunächst das Standardverhalten der Ereignisboxen an:

+ Die Standardhöhe für jede Skalen-Einheit (Stunde) beträgt 44px.
+ Die Mindesthöhe für eine Ereignisbox beträgt 44px.
+ Ereignisse, die kürzer als 1 Stunde sind, werden mit einer Höhe von 44px angezeigt, sodass ein 15-minütiges Ereignis genauso aussieht wie ein 1-stündiges Ereignis.
+ Ereignisse, die länger als 1 Stunde sind, haben eine zur Skala proportionale Höhe (z.B. ist ein 90-minütiges Ereignis 63px hoch, wenn 1 Stunde 44px entspricht).

Wenn das Ziel ist, dass 30-minütige Ereignisse richtig zur Skala passen, gibt es zwei Möglichkeiten:

- Die Höhe der Skalen-Einheiten erhöhen.
- Das Erscheinungsbild der Ereignisboxen anpassen.

![30-minute_custom_event.png](/img/30-minute_custom_event.png)

### Lösung 1. Ändern der Skalen-Einheitshöhe

Die Höhe der Skalen-Einheiten kann mit der Konfigurationsoption `scheduler.config.hour_size_px` angepasst werden.
  
Um beispielsweise die Einheitshöhe zu verdoppeln, stellen Sie diese wie folgt ein:

~~~js
scheduler.config.hour_size_px = 88;

scheduler.init(...);
~~~

Damit beträgt die Skalenhöhe 88px, sodass ein 30-minütiges Ereignis 44px hoch ist und damit zur Skala passt.


[Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


### Lösung 2. Anpassen der Ereignisbox

Um das Erscheinungsbild der Ereignisboxen zu verändern, verwenden Sie die Methode `scheduler.renderEvent`. Damit können Sie eine eigene Vorlage für Ereignisse bereitstellen.

~~~js
scheduler.renderEvent = function(container, ev) {
    // Ihr Anpassungscode hier
}
~~~

Weitere Details finden Sie im Kapitel [Benutzerdefiniertes Ereignisfeld](guides/custom-events-display.md).


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## Verhindern, dass kurze Ereignisse sich überlappen {#preventingshorteventsfromoverlapping}

Um sicherzustellen, dass kurze Ereignisse getrennt angezeigt werden und sich nicht überlappen, aktivieren Sie die Option `scheduler.config.separate_short_events`:

~~~js
scheduler.config.separate_short_events = true;
~~~

![overlapping.png](/img/overlapping.png)

## Wie man den Hintergrund entsprechend der Skala anpasst {#howtochangethebackgroundaccordingtothesetscale}

Der Hintergrund des Schedulers wird über ein Bild gesteuert. Um ihn zu aktualisieren, überschreiben Sie die CSS-Klasse **.dhx_scale_holder** wie folgt:

~~~html
<style>
.dhx_scale_holder {
     background-image: url("imgs/myNewImage.png");
}
</style>
~~~

Initialisieren Sie anschließend den Scheduler:

~~~js
scheduler.init(...);
~~~

![changing_background.png](/img/changing_background.png)

## Wie man den Skalenabstand ändert {#howtochangethescalespacing}

Um den Standard-Skalenabstand zu ändern, überschreiben Sie das Template `scheduler.templates.hour_scale`. Für einen 30-minütigen Abstand kann das Template wie folgt angepasst werden:

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
