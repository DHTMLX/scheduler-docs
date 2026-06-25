---
title: "Tooltips"
sidebar_label: "Tooltips"
---

# Tooltips 

*Wenn Sie dhtmlxScheduler 6.0 oder früher verwenden, finden Sie Details [hier](guides/tooltips-legacy.md).*

Um Tooltips für Ereignisse anzuzeigen, sollten Sie die **Tooltip**-Erweiterung einmal auf der Seite aktivieren.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

Danach werden Tooltips mit den Standard-Einstellungen angezeigt.

![tooltip](/img/tooltip.png)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


Sobald die Erweiterung aktiviert ist, werden Tooltips automatisch mit den Standard-Einstellungen angezeigt.


## Benutzerdefinierter Text 

Standardmäßig zeigen Tooltips drei Eigenschaften eines Ereignisses an:

1. Das Startdatum eines Ereignisses.
2. Das Enddatum eines Ereignisses.
3. Der Text des Ereignisses.

Um benutzerdefinierten Text für Tooltips festzulegen, verwenden Sie die [tooltip_text](api/template/tooltip_text.md) Vorlage:

~~~js
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+
    scheduler.templates.tooltip_date_format(start)+"

"+
    "<b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};
~~~


## Tooltip API

### Tooltip-Objekt

Sie können auf das Tooltip-Objekt als **scheduler.ext.tooltips.tooltip** zugreifen. Dieses Objekt ermöglicht die Steuerung von Position, Inhalt und Sichtbarkeit des Tooltips über eine Reihe von Methoden:

- **getNode()** - gibt das HTML-Element des Tooltips zurück  
- **setViewport()** - fixiert die Position des Tooltips an die Grenzen des angegebenen HTML-Elements
    - **node** - (*HTMLElement*) das betreffende HTML-Element
- **show()** - zeigt den Tooltip an bestimmten Koordinaten (bezugnehmend auf document.body). Die Methode kann je nach gewünschter Position unterschiedliche Parameter übernehmen:
    - Um den Tooltip an bestimmten Koordinaten (bezugnehmend auf document.body) anzuzeigen, übergeben Sie: 
        - **left** - (*number*) die X-Koordinate
        - **top** - (*number*) die Y-Koordinate 
    - Um den Tooltip an den Koordinaten des Mausereignisses anzuzeigen (tooltip_offset_x/y und Viewport werden berücksichtigt), übergeben Sie:
        - **event** - (*Event*) das Maus-Ereignis-Objekt  
- **hide()** - versteckt das Tooltip-Element
- **setContent()**- fügt HTML-Inhalt in den Tooltip ein. Als Parameter wird übergeben:
    - **html** - (*string*) ein String mit HTML-Inhalt für den Tooltip

### Methoden

Es gibt mehrere Methoden, die das Verhalten des Tooltips beim Überfahren von DOM-Elementen steuern können.

<h4 id="attach">scheduler.ext.tooltips.attach()</h4>

fügt einen Tooltip mit erweiterter Konfiguration hinzu. Die Methode nimmt ein Objekt mit den Tooltip-Einstellungen als Parameter entgegen. Zu den via der Methode einstellbaren Einstellungen gehören die folgenden:

- **selector** - (*string*) definiert einen CSS-Selektor für die Elemente, auf denen Mausereignisse überwacht werden sollen
- **onmouseenter** - (*function*) ein Handler, der aufgerufen wird, wenn der Mauszeiger das Element betritt. Die Parameter sind:
     - **event** - (*Event*) das native Maus-Ereignis
    - **node** -  (*HTMLElement*) der HTML-Knoten
- **onmousemove** - (*function*) ein Handler, der aufgerufen wird, wenn sich der Mauszeiger innerhalb des Elements bewegt. Die Parameter sind:
    - **event** - (*Event*) das native Maus-Ereignis
    - **node** -  (*HTMLElement*) der HTML-Knoten
- **onmouseleave** - (*function*) ein Handler, der aufgerufen wird, wenn der Mauszeiger das Element verlässt. Die Parameter sind:    
    - **event** - (*Event*) das native Maus-Ereignis
    - **node** -  (*HTMLElement*) der HTML-Knoten
- **global** - (*boolean*) definiert, ob das Modul Mausereignisse auf der ganzen Seite (*true*) oder nur innerhalb eines Scheduler-Elements (*false*) überwacht. Standardmäßig ist die Option auf *false* gesetzt.

<h4 id="tooltipfor">scheduler.ext.tooltips.tooltipFor()</h4>

fügt einen Tooltip für das angegebene Scheduler-Element hinzu. Es handelt sich um eine vereinfachte Version der Methode **attach()**. Die Methode nimmt als Parameter ein Objekt mit den Tooltip-Details entgegen. Dieses Objekt hat die folgenden Eigenschaften:

- **selector** - (*string*) der CSS-Selektor des Scheduler-Elements, dem ein Tooltip hinzugefügt werden soll
- **html** - (*function*) eine Vorlage für den Tooltip. Die Vorlagenfunktion nimmt zwei Parameter der Reihenfolge nach entgegen:
    - **event** - (*Event*) das native Maus-Ereignis
    - **node** -  (*HTMLElement*) der HTML-Knoten
  und gibt eine Zeichenfolge mit einer Vorlage zurück.
- **global** - (*boolean*) optional, definiert, ob das Modul Mausereignisse auf der ganzen Seite (*true*) oder nur innerhalb eines Scheduler-Elements (*false*) überwacht. Standardmäßig ist die Option auf *false* gesetzt. 

<h4 id="detach">scheduler.ext.tooltips.detach()</h4> 

entfernt einen Tooltip. Als Parameter nimmt die Methode Folgendes entgegen:

- **selector** - (*string*) der CSS-Selektor eines Scheduler-Elements


## Tooltips für unterschiedliche Elemente

Standardmäßig werden Tooltips nur zu Scheduler-Ereignissen hinzugefügt, Sie können jedoch auch Tooltips für jedes andere Scheduler-Element festlegen.

Es gibt hierfür zwei entsprechende Methoden in der [tooltip API](#tooltip-api):

- die [**scheduler.ext.tooltips.tooltipFor()**](#methods) Methode

Hinweis: Die [scheduler.ext.tooltips.tooltipFor()](#methods) Methode muss nach Abschluss der Scheduler-Initialisierung aufgerufen werden. Zum Beispiel können Sie die Methode im [onSchedulerReady](api/event/onschedulerready.md) Ereignishandler wie folgt verwenden:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    scheduler.ext.tooltips.tooltipFor({
        selector: ".dhx_matrix_scell",
        html: function (event, node) {
            const sectionId = scheduler.getActionData(event).section;
            const timeline = scheduler.getView("timeline");
            const section = timeline.y_unit[timeline.order[sectionId]];
            return `Tooltip for <b>${section.label}</b>`;
        }
    });
});

~~~


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/06_timeline/12_section_tooltip.html)


Oder Sie können es wie folgt verwenden:

~~~js
scheduler.init("scheduler_here");

scheduler.ext.tooltips.tooltipFor({
    selector: ".dhx_matrix_scell",
    html: function (event, node) {
        const sectionId = scheduler.getActionData(event).section;
        const timeline = scheduler.getView("timeline");
        const section = timeline.y_unit[timeline.order[sectionId]];
        return `Tooltip for <b>${section.label}</b>`;
    }
});
~~~

Ein auf diese Weise hinzugefügter Tooltip folgt dem Mauszeiger und verwendet die Einstellungen *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)* und
[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md).

- die [**scheduler.ext.tooltips.attach()**](#methods) Methode 

Diese Methode ermöglicht das Hinzufügen eines Tooltips mit einer erweiterten Konfiguration, um das Tooltip-Verhalten an die Bewegung des Mauszeigers anzupassen.

## Anpassung des Tooltip-Verhaltens

Es besteht die Möglichkeit, das Standardverhalten des Tooltips zu ändern. Dies kann erreicht werden, indem der integrierte Tooltip-Handler entfernt und durch einen benutzerdefinierten ersetzt wird. Befolgen Sie die folgenden Schritte:

- Entfernen Sie den integrierten Tooltip-Handler aus Aufgaben mit der [**scheduler.ext.tooltips.detach**](#methods) Methode:

~~~js
// remove the built-in tooltip handler from tasks
scheduler.ext.tooltips.detach(`[${scheduler.config.event_attribute}]`);
~~~

- Fügen Sie das gewünschte Tooltip-Verhalten über die [**scheduler.ext.tooltips.attach()**](#methods) Methode hinzu. Im untenstehenden Beispiel wird der Tooltip nur oberhalb der Tabelle angezeigt:

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

Sie können die Anzeigen- und Verbergungszeit von Tooltips über die entsprechenden Einstellungen konfigurieren.

Um den Zeitraum (in Millisekunden) vor dem Erscheinen eines Tooltips für eine Aufgabe festzulegen, verwenden Sie die Eigenschaft [tooltip_timeout](api/config/tooltip_timeout.md):

~~~js
scheduler.config.tooltip_timeout = 50;
scheduler.init("scheduler_here");
~~~


Um festzulegen, wie lange (in Millisekunden) ein Tooltip nach dem Bewegen des Cursors an eine andere Position angezeigt wird, verwenden Sie die Eigenschaft [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md):

~~~js
scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init("scheduler_here");
~~~

## Position

Die Position eines Tooltips kann durch Ändern der Offsets seiner Standardposition über die beiden Konfigurations-Eigenschaften festgelegt werden:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - legt den horizontalen Versatz der Tooltip-Position fest
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - legt den vertikalen Versatz der Tooltip-Position fest

~~~js
scheduler.config.tooltip_offset_x = 30;
scheduler.config.tooltip_offset_y = 40;
 
scheduler.init("scheduler_here");
~~~

## Anzeigebereich

Standardmäßig sind Tooltips an **document.body** angehängt. Falls nötig, können Sie das Anzeigen von Tooltips auf den Container vor der Initialisierung des Schedulers beschränken, indem Sie den folgenden Code verwenden:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){
    const tooltips = scheduler.ext.tooltips;
     tooltips.tooltip.setViewport(container);
});

scheduler.init("scheduler_here");
~~~