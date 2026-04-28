---
title: "Integration mit dhtmlxLayout"
sidebar_label: "Integration mit dhtmlxLayout"
---

# Integration mit dhtmlxLayout

:::warning
Die beschriebene Funktionalität ist veraltet und wird nicht mehr gepflegt.
:::

Eine gute Möglichkeit, auf der Seite mehrere Scheduler-Instanzen zu platzieren, ist die Verwendung von dhtmlxLayout. Es bietet nicht nur einen schönen Rahmen, sondern sorgt auch für eine korrekte Interaktion mit anderen Elementen auf der Seite und verhält sich entsprechend bei Änderungen der Seitengröße.

:::note
Beachten Sie, dass dhtmlxLayout kein Teil der dhtmlxScheduler-Bibliothek ist.
Es gibt zwei Versionen von Layout, aus denen Sie je nach Version der dhtmlxSuite-Bibliothek wählen können.
:::

## dhtmlxSuite v5+

In dieser Version kann dhtmlxLayout als eigenständiges Produkt oder als Teil der dhtmlxSuite-Bibliothek verwendet werden. Um dhtmlxLayout v5.X in Ihr Projekt einzubinden, ist ein [Lizenzerwerb](https://dhtmlx.com/docs/products/dhtmlxSuite/) erforderlich.

**Um eine dhtmlxScheduler-Instanz an eine Layout-Zelle anzuhängen**, verwenden Sie die [attachScheduler()] Methode.
  
**Hinweis**: Das Anhängen des Schedulers an eine Zelle initialisiert ihn automatisch. Konfigurieren Sie daher den Scheduler, bevor Sie ihn in das Layout platzieren.

~~~js
function init() {
    var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    sched1 = Scheduler.getSchedulerInstance();
    sched1.config.multi_day = true;
    dhxLayout.cells("a").attachScheduler(new Date(2027,05,30),"week",null,sched1);
    sched1.load("/data/units")
        
    sched2 = Scheduler.getSchedulerInstance();
    dhxLayout.cells("b").attachScheduler(new Date(2027,05,30),"month",null,sched2);
    sched2.load("/data/units")
}
~~~

[Integration with dhtmlxLayout (dhx_terrace Skin, Suite v5.1)](https://docs.dhtmlx.com/scheduler/samples/10_integration/05_dhtmlxlayout_terrace.html)


## dhtmlxSuite v6+

Ab dhtmlxSuite 6.0 kann dhtmlxLayout nicht mehr separat von der gesamten Suite-Bibliothek bezogen werden.
Wenn Sie diesen Ansatz verwenden möchten, sollten Sie die Lizenz der [Suite 6.X-Bibliothek](https://dhtmlx.com/docs/products/dhtmlxSuite/#licensing) erwerben.

Der dhtmlxScheduler der Version 5.3 (whats-new.md#53) und neuer implementiert eine gemeinsame View-Schnittstelle, die in dhtmlxSuite v6+ verwendet wird, und kann [direkt an jede Zelle angehängt werden](https://docs.dhtmlx.com/suite/layout/api/cell/layout_cell_attach_method/):

~~~js
// create and configure the scheduler instance
scheduler.config.header = [
   "day",
   "week",
   "month",
   "date",
   "prev",
   "today",
   "next"
];
scheduler.config.multi_day = true;

// after the scheduler is attached, onSchedulerReady will be fired
scheduler.attachEvent("onSchedulerReady", function () {
    requestAnimationFrame(function(){
        // here you can set the initial view and date and load the data
        scheduler.setCurrentView(new Date(2027,5,3), "week");
        scheduler.load("../common/events.json");
    });
    
});

const layout = new dhx.Layout("layout", {
    rows: [{
        id: "scheduler-cell",
        header: "Appointment Scheduler",
        html:"<div></div>"
    }]
});
layout.cell("scheduler-cell").attach(scheduler);
~~~

### Hinweise

- Beachten Sie, dass `dhtmlxSuite Layout` asynchron ist; der Scheduler wird nicht direkt nach dem `.attach`-Aufruf initialisiert.
- Sie müssen das Ereignis `onSchedulerReady` für Nach-Initialisierungseinstellungen erfassen.
- Derzeit gibt es **keine Möglichkeit**, das Scheduler-Markup festzulegen, wenn es zusammen mit dhtmlxSuite v6+ verwendet wird, was bedeutet, dass Sie die [header](api/config/header.md) Konfiguration verwenden müssen, um Steuerelemente des Navigationspanels festzulegen.