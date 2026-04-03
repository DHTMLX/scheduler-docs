---
title: "Integration mit dhtmlxLayout"
sidebar_label: "Integration mit dhtmlxLayout"
---

# Integration mit dhtmlxLayout

Die Verwendung von dhtmlxLayout ist eine praktische Möglichkeit, [mehrere Scheduler](guides/multiple-per-page.md) auf einer Seite zu organisieren. Es bietet einen ansprechenden Rahmen und hilft dabei, die Interaktionen mit anderen Seitenelementen zu steuern, wobei es sich reibungslos an Änderungen der Seitengröße anpasst.

:::note
Beachten Sie, dass dhtmlxLayout nicht in der dhtmlxScheduler-Bibliothek enthalten ist. Es gibt zwei Versionen von Layout, abhängig von der verwendeten dhtmlxSuite-Bibliotheksversion.
:::

## dhtmlxSuite v5+

In dieser Version kann dhtmlxLayout als eigenständiges Produkt oder als Teil der dhtmlxSuite-Bibliothek verwendet werden. Um dhtmlxLayout v5.X in Ihr Projekt einzubinden, ist ein [Lizenzerwerb](https://dhtmlx.com/docs/products/dhtmlxSuite/) erforderlich.

**Um eine dhtmlxScheduler-Instanz zu einer Layout-Zelle hinzuzufügen**, verwenden Sie die Methode [attachScheduler()](https://docs.dhtmlx.com/api__dhtmlxcell_attachscheduler.html).
  
**Beachten Sie**, dass das Anhängen eines Schedulers an eine Zelle diesen automatisch initialisiert. Konfigurieren Sie daher den Scheduler, bevor Sie ihn in das Layout einfügen.

~~~js
function init() {
    var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    sched1 = Scheduler.getSchedulerInstance();
    sched1.config.multi_day = true;
    dhxLayout.cells("a").attachScheduler(new Date(2019,05,30),"week",null,sched1);
    sched1.load("/data/units")
        
    sched2 = Scheduler.getSchedulerInstance();
    dhxLayout.cells("b").attachScheduler(new Date(2019,05,30),"month",null,sched2);
    sched2.load("/data/units")
}
~~~


[Integration with dhtmlxLayout (dhx_terrace skin, Suite v5.1)](https://docs.dhtmlx.com/scheduler/samples/10_integration/05_dhtmlxlayout_terrace.html)


## dhtmlxSuite v6+

Ab dhtmlxSuite 6.0 ist dhtmlxLayout nur noch als Teil der vollständigen Suite-Bibliothek verfügbar. Um es auf diese Weise zu nutzen, muss eine Lizenz für die [Suite 6.X Bibliothek](https://dhtmlx.com/docs/products/dhtmlxSuite/#licensing) erworben werden.

Ab [Version 5.3](guides/what-s-new.md#53) implementiert dhtmlxScheduler ein gemeinsames View-Interface, das mit dhtmlxSuite v6+ kompatibel ist und kann [direkt an jede Zelle angehängt werden](https://docs.dhtmlx.com/suite/layout/api/cell/layout_cell_attach_method/):

~~~js
// Erstellen und Konfigurieren der Scheduler-Instanz
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

// Nachdem der Scheduler angehängt wurde, wird onSchedulerReady ausgelöst
scheduler.attachEvent("onSchedulerReady", function () {
    requestAnimationFrame(function(){
        // Hier können Sie die Anfangsansicht und das Datum setzen und die Daten laden
        scheduler.setCurrentView(new Date(2017,5,3), "week");
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

### Beachten Sie

- Beachten Sie, dass das `dhtmlxSuite Layout` asynchron arbeitet, sodass der Scheduler nicht unmittelbar nach dem Aufruf von `.attach` bereit ist.
- Es ist notwendig, auf das "onSchedulerReady"-Event zu warten, um nach der Initialisierung weitere Aufgaben auszuführen.
- Derzeit **gibt es keine Möglichkeit, das Scheduler-Markup bei Verwendung mit dhtmlxSuite v6+ zu spezifizieren**. Das bedeutet, dass die Steuerungselemente des Navigationspanels über die [header](api/config/header.md)-Einstellungen konfiguriert werden müssen.
