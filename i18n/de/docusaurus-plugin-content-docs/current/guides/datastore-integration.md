---
title: "Integration mit dhtmlxDataStore"
sidebar_label: "Integration mit dhtmlxDataStore"
---

# Integration mit dhtmlxDataStore

Dieser Artikel beschreibt, wie Sie [mehrere Scheduler](guides/multiple-per-page.md) mit einem [dhtmlXDataStore](https://docs.dhtmlx.com/datastore__index.html)-Objekt synchronisieren können. Die Scheduler beziehen ihre Daten aus diesem gemeinsamen Store, sodass jede Änderung eines Events in einem Scheduler automatisch in den anderen übernommen wird.

:::note
Hinweis: dhtmlxDataStore ist Teil des [dhtmlxSuite5](https://dhtmlx.com/docs/products/dhtmlxSuite5/) Pakets und ist standardmäßig nicht im dhtmlxScheduler enthalten. Wenn Sie jedoch keine dhtmlxSuite-Lizenz besitzen, können Sie dhtmlxDataStore dennoch kostenlos mit dhtmlxScheduler nutzen. Folgen Sie den untenstehenden Schritten, um es in Ihrer App einzurichten.
:::

- [Laden Sie das dhtmlxDataStore-Paket herunter](https://files.dhtmlx.com/30d/33230caa09f4b5030ea5bfe374ef6d57/dhtmlxDataStore.zip)
- Fügen Sie *dhtmlxcommon.js* und *datastore.js* nach dem Laden von dhtmlxscheduler.js auf Ihrer Seite hinzu. Achten Sie darauf, die Reihenfolge genau wie gezeigt einzuhalten:

~~~js
<script src="dhtmlxscheduler.js"></script>
<script src="datastore/dhtmlxCommon/codebase/dhtmlxcommon.js"></script>
<script src="datastore/datastore.js"></script>
~~~

Die typische Vorgehensweise, um Scheduler über DataStore zu synchronisieren, sieht wie folgt aus:

~~~js
function init() {
    var data = new dhtmlXDataStore({
        url:"data/data.json",
        scheme:{
            $init:function(obj){
                if (typeof obj.start_date == "string"){
                    obj.start_date = scheduler.templates.parse_date(obj.start_date);
                    obj.end_date = scheduler.templates.parse_date(obj.end_date);
                }
            }
        }
    });

    scheduler1 = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2019,05,12),"week");
    scheduler1.sync(data, { copy:true });
    

    scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_too',new Date(2019,05,12),"month");
    scheduler2.sync(data, { copy:true });
}
~~~

Hier eine kurze Zusammenfassung, was im obigen Code passiert:

1. Zuerst initialisieren wir dhtmlXDataStore wie üblich (Details finden Sie in den Abschnitten [Initialization](https://docs.dhtmlx.com/datastore__initialization.html) und [Data scheme](https://docs.dhtmlx.com/datastore__data_scheme.html) in der [dhtmlXDataStore-Dokumentation](https://docs.dhtmlx.com/datastore__index.html)).
2. Anschließend erstellen wir zwei Scheduler. Dies geschieht auf die gewohnte Weise, allerdings verwenden wir die [sync](https://docs.dhtmlx.com/api__datastore_sync.html)-Methode, um sie mit dem DataStore zu verbinden.

Die [sync](https://docs.dhtmlx.com/api__datastore_sync.html)-Methode verbindet einen Scheduler mit einem DataStore und nimmt zwei Parameter entgegen:

+ **data** - (erforderlich) Die dhtmlXDataStore-Instanz, die dem Scheduler die Daten bereitstellt.
+ **(copy:true)** - (erforderlich) Gibt an, dass der Scheduler eine eigene Kopie der DataStore-Daten anlegt.

Der zweite Parameter verdient besondere Aufmerksamkeit, da er spezifisch für dhtmlxScheduler ist und nicht in der Hauptdokumentation von dhtmlXDataStore behandelt wird.

Diese Option weist DataStore an, für jeden Scheduler eine separate Kopie der Daten zu erstellen. Im obigen Beispiel halten _DataStore_, _scheduler1_ und _scheduler2_ jeweils eigene Datensätze vor. Sie müssen sich jedoch nicht um die manuelle Synchronisierung dieser Datensätze kümmern - dies geschieht automatisch. Wenn Sie in einem Scheduler etwas ändern, wird die Aktualisierung an DataStore übergeben, der wiederum den Datensatz des anderen Schedulers aktualisiert.

Vielleicht fragen Sie sich, warum dieser zusätzliche Schritt notwendig ist, wenn das Endergebnis gleich zu sein scheint.

Der Grund dafür ist: Neben den Haupteigenschaften eines Events enthält jedes Event auch eine Reihe interner Eigenschaften, die vom Scheduler zur Laufzeit zugewiesen werden. Diese internen Eigenschaften können sich je nach aktuell ausgewählter Ansicht ändern. Wenn beispielsweise das gleiche Event in beiden Schedulern geöffnet ist, aber in unterschiedlichen Ansichten angezeigt wird, könnten sich die Werte der internen Eigenschaften unterscheiden. Diese Abweichung kann dazu führen, dass das Event nicht korrekt dargestellt wird.

In diesem Fall hilft der Parameter (**(copy:true)**) dabei, solche Probleme durch eine saubere Datenverarbeitung zu vermeiden. Darüber hinaus kann die Datenverdopplung auch in anderen Situationen nützlich sein.

Zum Beispiel, wenn Sie zwei Scheduler auf einer Seite haben, die die gleichen Events, aber in unterschiedlichen Zeitzonen anzeigen (wie Moskau und London), funktioniert das Teilen eines einzelnen Datensatzes nicht gut. Separate Datensätze für jeden Scheduler ermöglichen es, Events in beiden Zonen korrekt darzustellen.


[Integration with dhtmlXDataStore](https://docs.dhtmlx.com/scheduler/samples/10_integration/04_datastore.html)
