---
title: "Drag-and-Drop aus der DHTMLX Suite v5.x"
sidebar_label: "Drag-and-Drop aus der DHTMLX Suite v5.x"
---

# Drag-and-Drop-Operationen (legacy)

:::warning
Dieser Artikel beschreibt eine veraltete Integration. Wenn Sie neu anfangen, sehen Sie sich die Framework-Integrationen oder das Vanilla-JS-Setup an.
:::

Die Bibliothek bietet die **outerdrag**-Erweiterung, mit der neue Termine erstellt werden können, indem Elemente aus externen DHTMLX-Komponenten oder anderen Scheduler-Instanzen gezogen werden. 

## Drag-and-Drop von externen Komponenten

Sobald der Benutzer ein externes Element auf den Scheduler zieht, öffnet der Scheduler das Lightbox-Fenster zur Erstellung eines neuen Termins.


![external_dnd](/img/external_dnd.png)


[Integration mit dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


Betrachten wir externes Drag-and-Drop im Kontext der <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree-Komponente</a>.


Folgen Sie diesen Schritten, um den Scheduler mit der <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree</a> zu integrieren: 

1. <a href="https://dhtmlx.com/docs/download/">Laden Sie das dhtmlxTree-Paket herunter</a> und entpacken Sie dessen Inhalt in den [YOUR APPLICATION ROOT]-Ordner
2. Binden Sie die notwendigen <b>JS</b>- und <b>CSS</b>-Dateien auf der Seite ein:
~~~html
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>
...
~~~
3. Aktivieren Sie die [outerdrag](guides/extensions-list.md#outerdrag)-Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    outerdrag: true
});
~~~
4. Initialisieren Sie die dhtmlxTree-Komponente (siehe Anweisungen <a href="https://docs.dhtmlx.com/tree__initialization_of_dhtmlxtree.html">hier</a>) :
~~~js
var tree = new dhtmlXTreeObject("treebox", "100%", "100%", 0);
tree.setImagePath("../common/dhtmlxTree/imgs/csh_yellowbooks/");
tree.loadXML("./data/tree.xml");
~~~
5. Aktivieren Sie Drag-and-Drop in der dhtmlxTree-Komponente (siehe Anweisungen <a href="https://docs.dhtmlx.com/tree__drag_and_drop_handling.html">hier</a>) :
~~~js
tree.enableDragAndDrop(true);
~~~
6. Scheduler initialisieren und konfigurieren:
~~~js
...
scheduler.init('scheduler_here', new Date(2019, 5, 30), "timeline");
~~~
7. Fügen Sie einen Handler dem [onExternalDragIn](api/event/onexternaldragin.md)-Ereignis hinzu, um festzulegen, wie der Text des gezogenen Elements in eine Eigenschaft des Termins konvertiert wird:
~~~js
scheduler.attachEvent("onExternalDragIn", function(id, source, event){
    var label = tree.getItemText(tree._dragged[0].id);
    scheduler.getEvent(id).text = label;
    return true;
});

~~~


[Integration mit dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


Jetzt können Sie ganz einfach neue Termine erstellen, die Baumdaten enthalten – einfach den gewünschten Knoten per Drag-and-Drop ziehen.