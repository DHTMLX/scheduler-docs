---
title: "Drag-and-Drop-Operationen"
sidebar_label: "Drag-and-Drop-Operationen"
---

# Drag-and-Drop-Operationen

Die Bibliothek enthält die **outerdrag**-Erweiterung, mit der es möglich ist, neue Ereignisse zu erstellen, indem Elemente aus externen DHTMLX-Komponenten oder anderen Schedulern per Drag-and-Drop eingefügt werden.

## Ziehen aus externen Komponenten {#draggingfromexternalcomponents}

Wenn ein Element aus einer externen Quelle in den Scheduler gezogen wird, öffnet der Scheduler automatisch das Lightbox-Formular, um ein neues Ereignis zu erstellen.


![external_dnd](/img/external_dnd.png)


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


So funktioniert das externe Drag-and-Drop mit der <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree-Komponente</a>.

Um den Scheduler mit <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree</a> zu integrieren, gehen Sie wie folgt vor:

1. Laden Sie das dhtmlxTree-Paket herunter und entpacken Sie dessen Inhalt in das Stammverzeichnis Ihrer Anwendung.
2. Binden Sie die benötigten js- und css-Dateien auf Ihrer Seite ein:
~~~html
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>
...
~~~
3. Aktivieren Sie die outerdrag-Erweiterung:
~~~js
scheduler.plugins({
    outerdrag: true
});
~~~
4. Initialisieren Sie die dhtmlxTree-Komponente (Anleitung hier):
~~~js
var tree = new dhtmlXTreeObject("treebox", "100%", "100%", 0);
tree.setImagePath("../common/dhtmlxTree/imgs/csh_yellowbooks/");
tree.loadXML("./data/tree.xml");
~~~
5. Aktivieren Sie Drag-and-Drop in der dhtmlxTree-Komponente (Anleitung hier):
~~~js
tree.enableDragAndDrop(true);
~~~
6. Initialisieren und konfigurieren Sie den Scheduler:
~~~js
...
scheduler.init('scheduler_here', new Date(2019, 5, 30), "timeline");
~~~
7. Fügen Sie einen Handler für das [onExternalDragIn](api/event/onexternaldragin.md)-Event hinzu, um festzulegen, wie der Text des gezogenen Elements dem Ereignis zugewiesen wird:
~~~js
scheduler.attachEvent("onExternalDragIn", function(id, source, event){
    var label = tree.getItemText(tree._dragged[0].id);
    scheduler.getEvent(id).text = label;
    return true;
});
~~~


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


Nach dieser Konfiguration ist das Erstellen neuer Ereignisse mit Daten aus dem Tree ganz einfach - ziehen Sie einfach den gewünschten Knoten per Drag-and-Drop.

## Drag-and-Drop zwischen Schedulern {#drag-and-drop-between-schedulers}

:::note
Dieses Feature ist nur für Commercial (seit 6. Oktober 2021), Enterprise und Ultimate Lizenzen verfügbar.
:::

Wenn [mehrere Scheduler auf einer Seite](guides/multiple-per-page.md) angezeigt werden, kann Drag-and-Drop zwischen ihnen aktiviert werden, sodass Ereignisse nahtlos von einem Scheduler in einen anderen verschoben werden können.

Um Drag-and-Drop-Unterstützung zwischen Schedulern zu aktivieren, binden Sie die "**drag_between**"-Erweiterung ein:

~~~js title="Aktivieren von Drag-and-Drop-Unterstützung für mehrere Scheduler"
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
scheduler.plugins({
    drag_between: true
});

scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
</script>
~~~

Ein Beispiel finden Sie unter **"samples/20_multiple/06_drag_between_layout.html"** im [Scheduler PRO-Paket](https://dhtmlx.com/docs/products/dhtmlxScheduler/).

### Dragging von Ereignissen zu/von einem Scheduler einschränken
Um das Herausziehen von Ereignissen aus einem Scheduler zu verhindern, setzen Sie die [drag_out](api/config/drag_out.md)-Eigenschaft auf *false*:

~~~js
scheduler.config.drag_out = false; // Dragging von Ereignissen aus diesem Scheduler deaktivieren /*!*/
scheduler.init('scheduler_here',new Date(2019, 5,30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~


Um das Hineinziehen von Ereignissen in einen Scheduler zu verhindern, setzen Sie die [drag_in](api/config/drag_in.md)-Eigenschaft auf *false*:

~~~js
scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2.config.drag_in = false; // Dragging von Ereignissen in diesen Scheduler deaktivieren /*!*/
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~

Das Beispiel **"samples/20_multiple/06_drag_between_layout.html"** ist im [Scheduler PRO-Paket](https://dhtmlx.com/docs/products/dhtmlxScheduler/) enthalten.

### Drag-Events

- [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) - wird ausgelöst, bevor ein Ereignis aus dem Scheduler gezogen wird
- [onEventDragOut](api/event/oneventdragout.md) - wird ausgelöst, wenn ein Ereignis aus dem Scheduler gezogen wird
- [onBeforeEventDragIn](api/event/onbeforeeventdragin.md) - wird ausgelöst, bevor ein gezogenes Ereignis in den Scheduler gelangt
- [onEventDragIn](api/event/oneventdragin.md) - wird ausgelöst, wenn ein gezogenes Ereignis über den Scheduler bewegt wird
- [onEventDropOut](api/event/oneventdropout.md) - wird ausgelöst, wenn ein gezogenes Ereignis außerhalb des Scheduler-Bereichs abgelegt wird
