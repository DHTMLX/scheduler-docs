---
title: "Units-Ansicht"
sidebar_label: "Units-Ansicht"
---

# Units-Ansicht 

:::info
Diese Ansicht ist ausschließlich in der Scheduler PRO-Version verfügbar.
:::

Die Units-Ansicht organisiert die X-Achse basierend auf einer bestimmten Eigenschaft von Ereignissen, anstatt nur nach Zeit.

![units_view](/img/units_view.png)

## Initialisierung {#initialization}

Um die Units-Ansicht zum Scheduler hinzuzufügen, gehen Sie wie folgt vor:

1. Aktivieren Sie die Units-Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    units: true
});
~~~
2. Fügen Sie den Tab der Ansicht in das Scheduler-Markup ein:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="unit_tab"></div>
    </div>
    ...    
</div>
~~~
3. Setzen Sie die Beschriftung für den Tab:
~~~js
//'unit_tab' ist der Name unseres div
scheduler.locale.labels.unit_tab = "Unit"
~~~
4. Erstellen Sie die Ansicht mit der [createUnitsView](api/method/createunitsview.md)-Methode:
~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id", // Die Ereigniseigenschaft, der Units zugeordnet werden
    list:[              // Definiert die in der Ansicht angezeigten Units
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}  
    ]
});
~~~


[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## Daten in die Ansicht laden {#loading-data-to-the-view}

Im Gegensatz zu Standardansichten wie Tag, Monat oder Jahr benötigen Mehrressourcen-Ansichten wie Units und Timeline ein zusätzliches Pflichtfeld in den Ereignissen:

* [property](api/method/createunitsview.md) - (string) Der Name der Dateneigenschaft, die verwendet wird, um Ereignisse bestimmten Units zuzuordnen

~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id", 
    list:[             
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}  
    ]
});

scheduler.init('scheduler_here');
scheduler.parse([
    {id:1, text:"Task1", start_date:"2027-09-17 12:00", end_date:"2027-09-18 21:00", 
    unit_id:"1"},
     {id:2, text:"Task2", start_date:"2027-09-17 09:00", end_date:"2027-09-17 21:00", 
    unit_id:"3"},
     {id:3, text:"Task3", start_date:"2027-09-17 15:00", end_date:"2027-09-18 15:00", 
    unit_id:"2"}
]);                                 
~~~
Ereignisse werden den Units zugeordnet, indem der Wert von **unit_id** mit dem entsprechenden **list.key** verglichen wird.


[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## Bereiche dynamisch ändern {#changingsectionsdynamically}

Um die Liste der Units in der Units-Ansicht dynamisch zu aktualisieren, können Sie die Methoden [serverList](api/method/serverlist.md) und [updateCollection](api/method/updatecollection.md) verwenden.

## Units für mehrere Tage anzeigen {#displaying-units-for-multiple-days}

Um Units über mehrere Tage hinweg anzuzeigen, nutzen Sie den [days](api/method/createunitsview.md)-Parameter:

~~~js
scheduler.createUnitsView({
    name:"week_unit",
    property:"section_id",
    list:sections,
    days:3 /*!*/
});
~~~

![multiday_units](/img/multiday_units.png)


[Multiday Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/31_units_view_multiple_days.html)


Dadurch wird eine zweite horizontale Skala zur Anzeige der Tage hinzugefügt.

 Um das Format dieser zweiten Skala anzupassen, verwenden Sie das Template scheduler.templates[name+"_second_scale_date"]:

~~~js
scheduler.templates.units_second_scale_date = function(date) {
    return scheduler.templates.week_scale_date(date);
};
~~~

Beachten Sie: 

1. Die erste Skala wird wie gewohnt mit dem scale_text_template definiert. Die Höhe kann mit scale_height angepasst werden.
2. Sie können unerwünschte Zeiteinheiten in der zweiten horizontalen Skala ausblenden, indem Sie wie in [Ausblenden von Zeiteinheiten auf der X-Achse einer Ansicht](guides/custom-scales.md) beschrieben vorgehen.
3. Die Parameter size und step gelten nicht für mehrtägige Units.
4. Der PDF-Export wird nur mit dem neuen Service unterstützt, nicht mit den älteren Export-Tools.
5. Um den Starttag des angezeigten Intervalls anzupassen, verwenden Sie die Funktion scheduler.date.(units_name)_start:
~~~js
scheduler.date.units_start = function (date) {
    return scheduler.date.week_start(date);
};
~~~ 


## Ereignisse mehreren Units zuweisen {#assigning-events-to-several-units}

Ab Version 4.1 ist es möglich, Ereignisse gleichzeitig mehreren Units zuzuweisen.

![multiple_sections](/img/multiple_sections.png)


So aktivieren Sie diese Funktion:

1. Aktivieren Sie die **Multisection**-Erweiterung auf der Seite
2. Setzen Sie die Eigenschaft [multisection](api/config/multisection.md) auf *true*
3. (Optional) Aktivieren Sie die "multiselect"-Erweiterung, um die [Multiselect](guides/multiselect.md)-Steuerung für einfacheres Umschalten zwischen Bereichen zu nutzen

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
    scheduler.plugins({
        multisection: true, /*!*/
        multiselect: true,
        units: true
    });
    scheduler.config.multisection = true; /*!*/
    scheduler.init('scheduler_here');
</script>
~~~


Anschließend können Sie mehrere Bereiche (standardmäßig durch ein Komma getrennt, siehe [section_delimiter](api/config/section_delimiter.md)) in der zugehörigen Eigenschaft des Ereignisses angeben und das Ereignis wird in allen diesen Units angezeigt:

~~~js
scheduler.createUnitsView({
    name: "unit",
    list: [
        {key: 1, label: "James Smith"},
        {key: 2, label: "John Williams"},
        {key: 3, label: "David Miller"},
        {key: 4, label: "Linda Brown"}],
    property: "section_id", /*!*/
    ...
});
scheduler.init('scheduler_here', new Date(2027, 5, 30), "unit");

scheduler.parse([
    { id:1, text:"Task A", section_id:'1',         ...},/*!*/
    { id:2, text:"Task B", section_id:'1,3',     ...},/*!*/
    { id:3, text:"Task C", section_id:'4',         ...},/*!*/
    { id:4, text:"Task D", section_id:'2,3,4',     ...}/*!*/
]);
~~~


[Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Daten für die X-Achsen-Bereiche {#dataforthexaxissections}

Die auf der X-Achse angezeigten Werte werden mit dem [list](api/method/createunitsview.md)-Parameter festgelegt:

~~~js
scheduler.createUnitsView({
    name:"unit",
    ...
    list:[
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"} 
    ]
});
~~~

Jedes Element in der [list](api/method/createunitsview.md) muss zwei erforderliche Eigenschaften haben:

- **key** - der eindeutige Bezeichner
- **label** - der Anzeigename

## Daten für die X-Achsen-Bereiche vom Server {#dataforthexaxissectionsfromtheserver}

Um Bereichsdaten vom Server zu laden, verwenden Sie:

- Auf der Client-Seite - die Methode [serverList](api/method/serverlist.md):

~~~js
scheduler.createUnitsView({
    name:"unit",
    property:"type_id",
    list:scheduler.serverList("units"),
    size:20,                                     
    step:1
});
~~~
*wo [serverList](api/method/serverlist.md) eine Liste namens 'units' zurückgibt*.

- Auf der Server-Seite 

Die Antwort für die Methode [load](api/method/load.md) sollte eine Collection mit dem Namen der Serverliste im folgenden JSON-Format enthalten:

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Team meeting",
          "type_id":"1"
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
          "text":"Strategy meeting",
          "type_id":"2"
      }
   ], 
   "collections": {/*!*/
      "units":[/*!*/      
         {"value":"1","label":"Conference room 1"},/*!*/
         {"value":"2","label":"Conference room 2"},/*!*/
         {"value":"3","label":"Conference room 3"}/*!*/
      ]/*!*/
   }/*!*/
}

~~~


Alternativ können Sie auch den [OptionsConnector](https://docs.dhtmlx.com/connector__php__optionsconnector.html) Connector verwenden:

~~~php
<?php
    include('connector-php/codebase/scheduler_connector.php');//Datei einbinden

    $res="mysql_connect(""localhost","root","");//Verbindung zum Server mit unserer DB
    mysql_select_db("sampleDB");//Verbindung zur DB. 'sampleDB' ist der Name der DB

    $list = new OptionsConnector($res, $dbtype);
    $list->render_table("types","type_id","type_id(value),name(label)");
    
    $scheduler = new schedulerConnector($res, $dbtype);
    //Wir verwenden denselben Namen wie auf der Client-Seite – 'units'
    $scheduler->set_options("units", $list); 
    $scheduler->render_table("events","id","start_date,end_date,text,type_id");
?>
~~~

![server_list_db](/img/server_list_db.png)


Sie können eine Collection auch manuell ohne dhtmlxConnector erstellen. In diesem Fall aktualisieren Sie die Collection mit der Methode [updateCollection](api/method/updatecollection.md):

~~~js
scheduler.updateCollection("units", new_sections_array);
~~~


[Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)


## Units scrollen {#scrollingunits}

Wenn viele Units vorhanden sind, kann das horizontale Scrollen mit den Eigenschaften [size](api/method/createunitsview.md) und [step](api/method/createunitsview.md) aktiviert werden:

~~~js
scheduler.createUnitsView({
    name:"unit",
    ...
    size:10, // Anzahl der gleichzeitig sichtbaren Units
    step:5   // Anzahl der Units, die pro Schritt gescrollt werden
});
~~~

![Units scrolling](/img/units_scroll.png)


[Horizontal scrolling sections in Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/18_scroll_units.html)


## Ereignisse überspringen, die zu keiner Unit gehören {#skipping-events-that-dont-belong-to-any-of-the-units}

Standardmäßig werden Ereignisse, die keiner definierten Unit zugeordnet sind, in der ersten Unit angezeigt. Seit Version 3.0 können Sie wählen, diese Ereignisse vollständig zu überspringen.

Um dies zu aktivieren, setzen Sie die Eigenschaft [skip_incorrect](api/method/createunitsview.md):

~~~js 
scheduler.createUnitsView({
    name:"unit",
    ...
    skip_incorrect:true
});

~~~


## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [Units View Templates](views/units-view-templates.md)
- [Daten laden](guides/loading-data.md)
- [Event-Objekt-Operationen](guides/event-object-operations.md)
- [Blockieren und Markieren von Daten](guides/limits.md)
- [Skins](guides/skins.md)
