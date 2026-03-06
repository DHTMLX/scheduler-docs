---
title: "Tooltips"
sidebar_label: "Tooltips"
---

# Tooltips 

*Wenn Sie dhtmlxScheduler 6.0 oder früher verwenden, finden Sie die Details [hier](guides/tooltips-legacy.md).*

Um Tooltips für Ereignisse anzuzeigen, muss die **Tooltip**-Erweiterung einmalig auf der Seite aktiviert werden.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

Nach der Aktivierung erscheinen Tooltips mit den Standardeinstellungen.

![tooltip](/img/tooltip.png)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


Nach der Aktivierung der Erweiterung werden Tooltips automatisch mit der Standardkonfiguration angezeigt.


## Eigener Text 

Standardmäßig zeigen Tooltips drei Eigenschaften eines Ereignisses an:

1. Das Startdatum des Ereignisses.
2. Das Enddatum des Ereignisses.
3. Den Text des Ereignisses.

Um den Tooltip-Text anzupassen, verwenden Sie die [tooltip_text](api/template/tooltip_text.md) Vorlage:

~~~js
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+
    scheduler.templates.tooltip_date_format(start)+"

"+
    "<b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};
~~~


## Tooltip API {#tooltipapi}

### Tooltip-Objekt

Das Tooltip-Objekt ist unter **scheduler.ext.tooltips.tooltip** verfügbar. Es bietet Methoden zur Steuerung der Position, des Inhalts und der Sichtbarkeit des Tooltips:

- **getNode()** - gibt das HTML-Element des Tooltips zurück  
- **setViewport()** - begrenzt die Tooltip-Position auf die Grenzen eines angegebenen HTML-Elements
    - **node** - (*HTMLElement*) das Containerelement
- **show()** - zeigt den Tooltip an den angegebenen Koordinaten relativ zu document.body an. Es akzeptiert verschiedene Parameter abhängig von der gewünschten Position:
    - Um an bestimmten Koordinaten anzuzeigen, übergeben Sie:
        - **left** - (*number*) X-Koordinate
        - **top** - (*number*) Y-Koordinate 
    - Um an den Koordinaten eines Mausereignisses anzuzeigen (berücksichtigt *tooltip_offset_x/y* und Viewport), übergeben Sie:
        - **event** - (*Event*) das Mausereignis-Objekt  
- **hide()** - blendet das Tooltip-Element aus
- **setContent()** - setzt den HTML-Inhalt des Tooltips. Der Parameter ist:
    - **html** - (*string*) HTML-String, der im Tooltip angezeigt wird

### Methoden

Mehrere Methoden helfen, das Tooltip-Verhalten beim Überfahren von DOM-Elementen zu steuern.

#### scheduler.ext.tooltips.attach() {#attach}

Fügt einen Tooltip mit detaillierter Konfiguration hinzu. Es akzeptiert ein Objekt mit Tooltip-Einstellungen, darunter:

- **selector** - (*string*) CSS-Selektor für Elemente, bei denen auf Mausereignisse gehört wird
- **onmouseenter** - (*function*) wird aufgerufen, wenn die Maus das Element betritt, mit den Parametern:
     - **event** - (*Event*) natives Mausereignis
    - **node** -  (*HTMLElement*) das Ziel-HTML-Element
- **onmousemove** - (*function*) wird aufgerufen, wenn die Maus sich im Element bewegt, mit den Parametern:
    - **event** - (*Event*) natives Mausereignis
    - **node** -  (*HTMLElement*) das Ziel-HTML-Element
- **onmouseleave** - (*function*) wird aufgerufen, wenn die Maus das Element verlässt, mit den Parametern:    
    - **event** - (*Event*) natives Mausereignis
    - **node** -  (*HTMLElement*) das Ziel-HTML-Element
- **global** - (*boolean*) gibt an, ob Mausereignisse auf der gesamten Seite (*true*) oder nur innerhalb des Scheduler-Elements (*false*) überwacht werden. Standard ist *false*.

#### scheduler.ext.tooltips.tooltipFor() {#tooltipfor}

Fügt einen Tooltip für ein bestimmtes Scheduler-Element hinzu. Dies ist eine einfachere Version von **attach()**. Es nimmt ein Objekt mit:

- **selector** - (*string*) CSS-Selektor für das Scheduler-Element, dem ein Tooltip hinzugefügt werden soll
- **html** - (*function*) Vorlagenfunktion für den Tooltip, die erhält:
    - **event** - (*Event*) natives Mausereignis
    - **node** -  (*HTMLElement*) das Ziel-HTML-Element
  gibt einen String mit dem Tooltip-Inhalt zurück.
- **global** - (*boolean*) optional, überwacht Mausereignisse auf der ganzen Seite (*true*) oder nur innerhalb des Scheduler-Elements (*false*). Standard ist *false*. 

#### scheduler.ext.tooltips.detach() {#detach}

Entfernt einen Tooltip. Es nimmt:

- **selector** - (*string*) CSS-Selektor des Scheduler-Elements


## Tooltips für verschiedene Elemente

Standardmäßig werden Tooltips nur für Scheduler-Ereignisse hinzugefügt, aber es ist möglich, Tooltips für jedes andere Scheduler-Element zu setzen.

Die relevanten Methoden in der [Tooltip API](#tooltipapi) sind:

- die Methode [**scheduler.ext.tooltips.tooltipFor()**](#tooltipfor) 

Beachten Sie, dass [scheduler.ext.tooltips.tooltipFor()](#tooltipfor) nach der Initialisierung des Schedulers aufgerufen werden sollte. Zum Beispiel kann dies im [onSchedulerReady](api/event/onschedulerready.md) Event-Handler platziert werden:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    scheduler.ext.tooltips.tooltipFor({
        selector: ".dhx_matrix_scell",
        html: function (event, node) {
            const sectionId = scheduler.getActionData(event).section;
            const timeline = scheduler.getView("timeline");
            var section = timeline.y_unit[timeline.order[sectionId]];
            return `Tooltip for <b>${section.label}</b>`;
        }
    });
});

~~~


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)


Alternativ können Sie diesen Ansatz verwenden:

~~~js
scheduler.init("scheduler_here");

scheduler.ext.tooltips.tooltipFor({
    selector: ".dhx_matrix_scell",
    html: function (event, node) {
        const sectionId = scheduler.getActionData(event).section;
        const timeline = scheduler.getView("timeline");
        var section = timeline.y_unit[timeline.order[sectionId]];
        return `Tooltip for <b>${section.label}</b>`;
    }
});
~~~

Tooltips, die auf diese Weise hinzugefügt werden, folgen dem Mauszeiger und berücksichtigen die Einstellungen *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)* und
[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md).

- die Methode [**scheduler.ext.tooltips.attach()**](#attach) 

Diese Methode bietet eine erweiterte Konfiguration für das Tooltip-Verhalten basierend auf Mausbewegungen.

## Anpassung des Tooltip-Verhaltens

Sie können das Standardverhalten der Tooltips ändern, indem Sie den eingebauten Handler entfernen und einen eigenen hinzufügen. So geht's:

- Entfernen Sie den Standard-Tooltip-Handler von Aufgaben mit [**scheduler.ext.tooltips.detach**](#detach):

~~~js
// remove the built-in tooltip handler from tasks
scheduler.ext.tooltips.detach(`[${scheduler.config.event_attribute}]`);
~~~

- Fügen Sie Ihr eigenes Tooltip-Verhalten über [**scheduler.ext.tooltips.attach()**](#attach) hinzu. Das folgende Beispiel zeigt einen Tooltip nur über der Tabelle:

~~~js
scheduler.ext.tooltips.tooltipFor({
  selector: `[${scheduler.config.event_attribute}]`,
  html: (event: MouseEvent) => {
     if (scheduler.config.touch && !scheduler.config.touch_tooltip) {
     return;
   }
 
   const evNode = event.target.closest(`[${scheduler.config.event_attribute}]`);
   const evId = evNode.getAttribute(scheduler.config.event_attribute);
   if(scheduler.getEvent(evId)){
     const ev = scheduler.getEvent(evId);
     return scheduler.templates.tooltip_text(ev.start_date, ev.end_date, ev);
   }
   return null;
  },
  global: false
});
~~~

## Timeout

Die Anzeigedauer und Ausblendzeit von Tooltips können über Einstellungen konfiguriert werden.

Um die Verzögerung (in Millisekunden) festzulegen, bevor ein Tooltip für eine Aufgabe angezeigt wird, verwenden Sie die Eigenschaft [tooltip_timeout](api/config/tooltip_timeout.md):

~~~js
scheduler.config.tooltip_timeout = 50;
scheduler.init("scheduler_here");
~~~


Um zu steuern, wie lange (in Millisekunden) ein Tooltip sichtbar bleibt, nachdem der Mauszeiger das Element verlassen hat, verwenden Sie die Eigenschaft [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md):

~~~js
scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init("scheduler_here");
~~~

## Position

Die Tooltip-Position kann angepasst werden, indem Sie die Standardabstände mit diesen Konfigurationseigenschaften ändern:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - horizontaler Abstand des Tooltips
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - vertikaler Abstand des Tooltips

~~~js
scheduler.config.tooltip_offset_x = 30;
scheduler.config.tooltip_offset_y = 40;
 
scheduler.init("scheduler_here");
~~~

## Anzeigebereich

Standardmäßig werden Tooltips an **document.body** angehängt. Bei Bedarf können Sie die Anzeige des Tooltips auf einen bestimmten Container beschränken, bevor Sie den Scheduler mit folgendem Befehl initialisieren:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    var tooltips = scheduler.ext.tooltips;
     tooltips.tooltip.setViewport(container);
});

scheduler.init("scheduler_here");
~~~
