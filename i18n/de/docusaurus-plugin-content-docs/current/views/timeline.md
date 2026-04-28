---
title: "Timeline-Ansicht"
sidebar_label: "Timeline-Ansicht"
---

# Timeline-Ansicht 

:::info
Diese Ansicht ist nur in der Scheduler PRO-Version enthalten.
:::

Die Timeline-Ansicht zeigt Ereignisse horizontal an und ordnet separate Zeitachsen nebeneinander von links nach rechts an.

![timeline_view](/img/timeline_view.png)

## Initialisierung {#initialization}

Um die Timeline-Ansicht zum Scheduler hinzuzufügen, gehen Sie wie folgt vor:

1. Aktivieren Sie die Timeline-Erweiterung auf der Seite:
- Timeline - für die Modi 'Bar' und 'Cell'
- Timeline, Treetimeline - für den 'Tree'-Modus
- Timeline, Daytimeline - für den 'Days'-Modus
~~~js
scheduler.plugins({
    timeline: true,
    treetimeline: true,
    daytimeline: true  
});
~~~   
2. Fügen Sie den Tab der Ansicht in das Scheduler-Markup ein:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="timeline_tab"></div>
    </div>
    ...    
</div>
~~~
3. Setzen Sie das Label für den Tab:
~~~js
//'timeline_tab' bezieht sich auf den Namen unseres div
scheduler.locale.labels.timeline_tab ="Timeline"; 
~~~
4. Rufen Sie die Methode [createTimelineView](api/method/createtimelineview.md) auf:
~~~js
scheduler.createTimelineView({
     name:"timeline",
     x_unit:"minute", // Maßeinheit auf der X-Achse.
     x_date:"%H:%i",  // Datumsformat auf der X-Achse
     x_step:30,       // Schrittweite auf der X-Achse in 'x_unit'
     x_size:24,       // Gesamtanzahl der auf der X-Achse angezeigten 'x_step'
     x_start:16,      // Offset auf der X-Achse in 'x_unit'
     x_length:48,     // Anzahl der 'x_step', die jeweils gescrollt werden
     y_unit:          // Abschnitte auf der Y-Achse
        [{key:1, label:"Section A"},
         {key:2, label:"Section B"},
         {key:3, label:"Section C"},
         {key:4, label:"Section D"}],
     y_property:"section_id", // Eigenschaft, um Daten Abschnitten zuzuordnen
     render:"bar"             // Ansichtsmodus
});
~~~


[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


:::note
Beim Verwenden des 'Days'-Modus muss die Zeitskala genau einen Tag abdecken. Wenn die Konfiguration einen kürzeren oder längeren Zeitraum angibt, wird die Timeline nicht korrekt angezeigt.
:::


### Beispiel für die Skalenkonfiguration

Obwohl die Methode [createTimelineView](api/method/createtimelineview.md) viele Parameter enthält, ist die Konfiguration tatsächlich unkompliziert.

Hier ein Beispiel: Eine Zeitskala von 09:00 bis 15:00 Uhr mit 30-Minuten-Schritten, die tageweise scrollt.

![timeline_scale_01](/img/timeline_scale_01.png)


~~~js
{
    x_unit:"minute",// Skala in Minuten
    x_step:30,  // 30-Minuten-Schritte, z.B. 09:00 - 09:30
    x_size:12,  // Anzahl der 30-Minuten-Intervalle zwischen 09:00 und 15:00
                // 15 - 9 = 6 Stunden = 360 Minuten = 360/30 = 12
    x_start:18, // Skala beginnt bei 09:00, das sind 9 Stunden ab 00:00
                // 9 Stunden = 540 Minuten = 540/30 = 18 'x_step'
    x_length:48,// Scrollt einen Tag: 1 Tag = 24 Stunden = 1440 Minuten = 1440/30 = 48 'x_step'
    ...
}
~~~


## Konfiguration der Timeline-Ansicht {#timelineviewconfiguration}

Alle Template-Funktionen mit Namen, die *(timeline)_some* enthalten, sollten nach dem Erstellen der Ansicht definiert werden, da diese dynamisch vom Timeline-Konstruktor zugewiesen und durch den Aufruf von [createTimelineView](api/method/createtimelineview.md) überschrieben werden.

### Startdatum für die Timeline-Ansicht festlegen

Hier ein Beispiel, wie Sie das Startdatum der Timeline-Ansicht festlegen.

Das Startdatum jeder Ansicht wird durch eine *scheduler.date[\<viewName\> +"_start"]*-Funktion gesteuert. Um den ersten Tag der Timeline-Skala anzupassen, überschreiben Sie die Funktion *scheduler.date.timeline_start* nach dem Aufruf von *scheduler.createTimelineView()*:

~~~js
// Die Woche beginnt am Montag
scheduler.config.start_on_monday = true;

// Timeline-Ansicht erstellen
scheduler.createTimelineView({
    name: "timeline",
    render: "tree",
    days: 7,
    folder_dy: 20,
    x_unit: "day",
    x_date: "%D %j %F",
    x_step: 1,
    x_size: 7,
    x_start: 0,
    x_length: 7,
    y_unit:[],
    y_property: "section_id"
});

// Startdatum-Funktion nach der Erstellung überschreiben
scheduler.date.timeline_start = scheduler.date.week_start;

// Scheduler initialisieren
scheduler.init("timeline_tree", new Date(), "timeline");
~~~

## Timeline-Objekt-API {#timeline-object-api}

Es stehen verschiedene Methoden zur Interaktion mit der Timeline-Ansicht zur Verfügung.

### Erstellen einer Timeline-Ansicht

Beginnen Sie mit der Erstellung einer Timeline-Instanz im Scheduler:

~~~js
scheduler.createTimelineView({
    name:'timeline',
    ...
});

const timeline = scheduler.matrix.timeline;
~~~

Nach der Erstellung können Sie die unten aufgeführten Methoden verwenden.

### Abrufen einer Timeline-Ansicht

Um ein Timeline-Ansichtsobjekt abzurufen, verwenden Sie die Methode [getView](api/method/getview.md). Sie akzeptiert den Namen der Ansicht als Parameter. Wenn kein Parameter übergeben wird, wird die aktuelle Ansicht zurückgegeben.

~~~js
const timeline = scheduler.getView(); 
timeline.x_size = 8;
scheduler.setCurrentView();
~~~

### Skalenbereich festlegen

Verwenden Sie die Methode **setRange()**, um den Skalenbereich zu definieren. Sie benötigt zwei Parameter:

- **startDate**    - (*Date*) Start des Bereichs
- **endDate** - (*Date*) Ende des Bereichs

~~~js
timeline.setRange(startDate, endDate);
~~~

### Spalten des linken Panels festlegen

Der Inhalt des linken Panels kann auf zwei Arten definiert werden.

Standardmäßig enthält es eine einzelne Spalte. Abschnittsbezeichnungen stammen aus der **label**-Eigenschaft des **y_unit**-Objekts, die Sie mit dem [timeline_scale_label](api/template/timelinename_scale_label.md)-Template anpassen können.

Um mehrere Spalten zu definieren, verwenden Sie die **columns**-Eigenschaft in der Methode [createTimelineView](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
  name:    "timeline",
  x_unit:    "minute",
  x_date:    "%H:%i",
  x_step:    30,
  x_size: 24,
  x_start: 16,
  x_length:    48,
  y_unit:    sections,
  event_dy: "full",
  y_property:    "section_id",
  render:"bar",
  columns: [
    { label: "Room #",  width: 70, template: function(obj){ return obj.room_no; } },
    { label: "Type",  width: 90, template: function(obj){ return obj.room_type; } },
    { label: "Status",  width: 90, template: function(obj){ return obj.room_status; } }
  ]
});

~~~

Jedes Spaltenobjekt kann folgende Eigenschaften haben:

- label - `string` - optionales Spalten-Header-Label
- width - `number` - optionale Spaltenbreite
- template - `function` - Zellen-Template-Funktion, die das Abschnittsobjekt erhält


[Timeline Sidebar columns](https://docs.dhtmlx.com/scheduler/samples/06_timeline/19_columns_sidebar.html)


### Scrollen zu einer bestimmten Position/Datum/Sektion

:::note
Diese Funktion ist nur verfügbar, wenn der horizontale Bildlauf für die Timeline aktiviert ist.
:::

Um zu einem bestimmten Punkt zu scrollen, verwenden Sie die Methode **scrollTo()**. Sie unterstützt verschiedene Parametertypen:

- Zu einem bestimmten Datum scrollen, indem Sie ein Date-Objekt übergeben:

~~~js
timeline.scrollTo(new Date());
~~~

- Zu einer bestimmten Position scrollen, indem Sie einen Pixelwert übergeben:

~~~js
timeline.scrollTo(500);
~~~

- Sowohl horizontal als auch vertikal zu einer bestimmten Sektion an einem bestimmten Datum scrollen, indem Sie ein Objekt mit date und section übergeben:

~~~js
timeline.scrollTo({date:new Date(), section:4});
~~~

- Zu einer bestimmten Position horizontal und vertikal scrollen, indem Sie ein Objekt mit left- und top-Pixelwerten übergeben:

~~~js
timeline.scrollTo({left:300, top:500});
~~~


### Koordinaten einer bestimmten Position abrufen

- Um die X-Koordinate für ein bestimmtes Datum auf der Skala zu erhalten, verwenden Sie **posFromDate()** mit einem Date-Parameter:

~~~js
const left = timeline.posFromDate(new Date());
~~~

:::note
Diese Methode gibt 0 oder die maximale X-Koordinate zurück, wenn das Datum außerhalb der Skala liegt.
:::

- Um die Y-Koordinate einer bestimmten Zeile zu erhalten, verwenden Sie **getSectionTop()** mit der Sektionsnummer:

~~~js
const top = timeline.getSectionTop(section.key);
~~~

:::note
Gibt -1 zurück, wenn die Zeile nicht gefunden wurde.
:::


- Um Datum und Sektion zu ermitteln, die bestimmten Timeline-Koordinaten entsprechen, verwenden Sie **resolvePosition()** mit einem Objekt `(left: number, top: number)`:

~~~js
const position = timeline.resolvePosition({top: 120, left: 400});
~~~


- Um das `Date` von einer bestimmten `left`-Koordinate auf der Zeitskala zu erhalten, verwenden Sie **dateFromPos()**:

~~~js
const date = timeline.dateFromPos(300);
~~~

- Um die `top`-Koordinate eines bestimmten Ereignisses zu erhalten, verwenden Sie **getEventTop()** mit dem Ereignisobjekt:

~~~js
const top = timeline.getEventTop(scheduler.getEvent(event.id));
~~~


### Scroll-Position abrufen

Um die aktuelle Scrollbar-Position zu ermitteln, rufen Sie **timeline.getScrollPosition()** auf. Diese Methode gibt ein Objekt mit den Scroll-Koordinaten zurück:

~~~js
const timeline = scheduler.getView();
timeline.getScrollPosition(); // { left: 0, top: 0 } 
~~~

Das zurückgegebene Objekt enthält:

- **left** - (*number*) horizontale Scroll-Position
- **top** - (*number*) vertikale Scroll-Position

Sie können auch auf Scroll-Änderungen mit dem **onScroll**-Event reagieren, das die neuen left- und top-Positionen erhält:

~~~js
const timeline = scheduler.getView();
timeline.attachEvent("onScroll", function(left, top){});
~~~

 
### Ereignisse einer bestimmten Sektion abrufen 

Um ein Array von Ereignissen zu erhalten, die einer bestimmten Sektion zugeordnet sind, verwenden Sie **timeline.selectEvents()** mit einem Konfigurationsobjekt:

~~~js
{
    section: string|number,
    date: Date,
    selectNested: boolean 
}
~~~

wo:

- **section** - die ID der Sektion
- **date** - optional, filtert Ereignisse, die die angegebene Datumsspalte überlappen
- **selectNested** - optional, wenn true und die Sektion ist ein Tree-Timeline-Ordner, werden Ereignisse aus allen verschachtelten Sektionen ausgewählt

Diese Methode gibt ein Array von Ereignisobjekten zurück.

~~~js
const timeline = scheduler.getView();
 
const events = timeline.selectEvents({
    section: section.key,
    date: date,
    selectNested: true
});
~~~


## Dynamische Änderung von Eigenschaften {#dynamicshangeofproperties}

Alle Timeline-Objekte werden im Objekt [scheduler.matrix](api/other/matrix.md) gespeichert.
Sie können auf jede Timeline-Ansicht über ihren Namen zugreifen und Eigenschaften aktualisieren. Änderungen werden nach dem Aktualisieren des Schedulers wirksam:

~~~js
scheduler.getView('timeline').x_size = 12;
scheduler.setCurrentView(); // zeichnet den Scheduler neu
~~~


Hier entspricht 'timeline' dem Namen, der in der Methode [createTimelineView](api/method/createtimelineview.md) vergeben wurde:

~~~js
scheduler.createTimelineView({
    name:'timeline',
    ...
});
~~~


### Abschnitte dynamisch ändern

Wenn Sie die Liste der Einheiten in der Timeline-Ansicht dynamisch aktualisieren müssen, verwenden Sie am besten die Methoden [serverList](api/method/serverlist.md) und [updateCollection](api/method/updatecollection.md).

## Daten laden {#data-loading}

Im Gegensatz zu einfacheren Ansichten wie Tag, Monat oder Jahr benötigen Mehrressourcen-Ansichten wie Units und Timeline für jedes Datenelement ein zusätzliches Pflichtfeld:

* [y_property](api/method/createtimelineview.md) - (*string*) gibt die Daten-Eigenschaft an, die verwendet wird, um Ereignisse bestimmten Abschnitten zuzuordnen.

![timeline_loading](/img/timeline_loading.png)

~~~js
scheduler.createTimelineView({
     name:"timeline",
     ...
     y_unit:     
        [{key:1, label:"Room 1"},
         {key:2, label:"Room 2"},
         {key:3, label:"Room 3"}],
     y_property:"room_id", 
});

scheduler.init('scheduler_here');
scheduler.parse([
    {text:"Conference",    start_date:"17/09/2012 12:00", end_date:"18/09/2012 21:00", 
    room_id:"1"},
     {text:"Meeting",     start_date:"17/09/2012 09:00", end_date:"17/09/2012 21:00", 
    room_id:"2"},
     {text:"Conference", start_date:"17/09/2012 15:00", end_date:"18/09/2012 15:00", 
    room_id:"3"}
]);                                 
~~~

[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


## Zuordnung von Ereignissen zu mehreren Abschnitten {#assignment-of-events-to-several-sections}

Der Scheduler unterstützt die gleichzeitige Zuordnung von Ereignissen zu mehreren Abschnitten.

![multiple_sections](/img/multiple_sections.png)


Um diese Funktion zu aktivieren:

1. Binden Sie die **Multisection**-Erweiterung auf Ihrer Seite ein
2. Setzen Sie die Eigenschaft [multisection](api/config/multisection.md) auf *true*
3. (Optional) Fügen Sie die "Multiselect"-Erweiterung hinzu, um eine komfortable [Multiselect](guides/multiselect.md)-Steuerung im Scheduler bereitzustellen, die das Wechseln zwischen Abschnitten vereinfacht

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
    scheduler.plugins({
        multisection: true, /*!*/
        multiselect: true,
        timeline: true
    });
    scheduler.config.multisection = true; /*!*/
    scheduler.init('scheduler_here');
</script>
~~~


Nach der Einrichtung können Sie mehrere Abschnitte (standardmäßig durch Kommas getrennt, wie in [section_delimiter](api/config/section_delimiter.md) beschrieben) 
in der zugehörigen Daten-Eigenschaft des Ereignisses angeben, und das Ereignis wird in allen diesen Abschnitten angezeigt:

~~~js
scheduler.createTimelineView({
    name: "timeline",
    y_unit: [
        {key: 1, label: "James Smith"},
        {key: 2, label: "John Williams"},
        {key: 3, label: "David Miller"},
        {key: 4, label: "Linda Brown"}],
    y_property: "section_id", /*!*/
    ...
});
scheduler.init('scheduler_here', new Date(2012, 5, 30), "timeline");

scheduler.parse([
    { id:1, text:"Task A", section_id:'1',         ...},/*!*/
    { id:2, text:"Task B", section_id:'1,3',     ...},/*!*/
    { id:3, text:"Task C", section_id:'4',         ...},/*!*/
    { id:4, text:"Task D", section_id:'2,3,4',     ...}/*!*/
]);
~~~


[Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Ansichtsmodi {#viewmodes} 

Die Timeline-Ansicht bietet vier verschiedene Modi:

- **Bar**

 ![timeline_bar_mode](/img/timeline_bar_mode.png)

 
[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)
 

 


- **Cell** (Standard)

 ![timeline_cell_mode](/img/timeline_cell_mode.png)

 
[Cell mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)
  

 


- **Tree**

 ![timeline_tree_mode](/img/timeline_tree_mode.png)

 
[Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)
 

 


- **Days**

 ![timeline_days_mode](/img/timeline_days_mode.png)

 
[Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)


Sie können den gewünschten Modus über den [render](api/method/createtimelineview.md)-Parameter auswählen:

~~~js
scheduler.createTimelineView({
    name: "timeline",
    render: "bar"
});
~~~

## Details zum 'Days'-Modus {#daysmodedetails}

Beachten Sie beim Verwenden des Days-Modus Folgendes:

1. Die Zeitskala sollte genau einen Tag abdecken. Wenn sie für einen kürzeren oder längeren Zeitraum konfiguriert ist, wird die Timeline möglicherweise nicht korrekt dargestellt:
~~~js
scheduler.createTimelineView({
    name:"timeline", 
    render:"days", 
    days:7,   
    // Zeitskala konfiguriert, um 1 Tag abzudecken /*!*/
    x_unit:"minute", /*!*/
    x_date:"%H:%i",  /*!*/
    x_step:30,       /*!*/
    x_size:24,       /*!*/
    x_start:16       /*!*/
});
~~~
2. Dieser Modus unterstützt keine [Blocking and Marking functionality](guides/limits.md)

Das Format der Y-Achsen-Beschriftungen wird über das [scale_label](api/template/timelinename_scale_label.md)-Template gesteuert:
~~~js
scheduler.templates.timeline_scale_label = function(key, label, section){
    // verwendet die gleichen Beschriftungen wie in der Tagesansicht
    return scheduler.templates.day_date(label); 
};
~~~
3. Um den Starttag des angezeigten Intervalls anzupassen, verwenden Sie die Funktion <b>scheduler.date.TIMELINE_start</b>:
~~~js
scheduler.date.timeline_start = function (date) {
    date = scheduler.date.week_start(date);
    date = scheduler.date.add(date, config.x_step*config.x_start, config.x_unit); 
    return date;
};
~~~


## Zeitintervall für Ansichtszellen {#time-interval-for-view-cells}

Standardmäßig deckt jede Zelle in der Ansicht ein Tagesintervall ab, und Ereignisse werden entsprechend platziert. Um dieses Intervall anzupassen, z. B. um sich auf Arbeitszeiten zu konzentrieren und weniger relevante Zeiten auszuschließen, können Sie eine der folgenden Methoden verwenden:

- Die Parameter [first_hour](api/method/createtimelineview.md) und [last_hour](api/method/createtimelineview.md):

~~~js
// Zellintervall auf Tageszeit von 10:00 bis 18:00 begrenzt
scheduler.createTimelineView({
    name:"timeline",
    first_hour:10,
    last_hour:18
});
~~~


[Changing the time interval for the view cells](https://docs.dhtmlx.com/scheduler/samples/11_scales/06_timeline_hours.html)


- Die Funktion **ignore_(viewName)**, wobei **viewName** dem *name*-Parameter der Timeline-Ansicht entspricht, die über [createTimelineView](api/method/createtimelineview.md) erstellt wurde.
Diese Funktion erhält das Datum der Zelle als Eingabe und gibt für auszuschließende Stunden 'true' zurück:

~~~js
// Zellintervall auf Tageszeit von 10:00 bis 18:00 begrenzt
scheduler.ignore_timeline = function(date){   // "timeline" ist der Name der Ansicht
    // Nicht-Arbeitszeiten ausschließen
    if (date.getHours() < 10 || date.getHours() > 18) return true;
};
~~~

Weitere Details zur **ignore_(viewName)**-Methode finden Sie im Abschnitt [Ausblenden von Zeiteinheiten auf der X-Achse einer Ansicht](guides/custom-scales.md).


[Hiding hours in the scale of Timeline view](https://docs.dhtmlx.com/scheduler/samples/11_scales/04_timeline_ignore.html)

  

![timeline_scale_interval](/img/timeline_scale_interval.png)

:::note
Beachten Sie, dass das ignorierte Intervall nicht gleich oder länger als das Gesamtintervall der Timeline sein darf.
:::

Wenn beispielsweise die Timeline einen ganzen Tag abdeckt und Sie versuchen, diesen Tag vollständig mit der **ignore_(viewName)**-Funktion auszuschließen, hat dies nicht den gewünschten Effekt. Der Scheduler zeigt diesen Tag weiterhin an, jedoch ohne Skala oder Ereignisse.

Um solche Intervalle vollständig auszuschließen, müssen Sie die Einstellung **x_length** dynamisch innerhalb der Funktion **scheduler._click.dhx_cal_next_button** anpassen. Um beispielsweise Wochenenden vollständig aus der Timeline auszublenden, können Sie folgenden Ansatz verwenden:

~~~js
scheduler._click.dhx_cal_next_button = function(dummy,step){
  const mode = scheduler.getState().mode;
  const minDate = scheduler.getState().min_date;
  const formFunc = scheduler.date.date_to_str("%D");

  // Wochenenden überspringen
  if(mode=='timeline'){    
  if((formFunc(minDate)=='Fri' && step!=-1) || (formFunc(minDate)=='Mon' && step==-1))
      scheduler.matrix['timeline'].x_length = 24*3;
    else                    
      scheduler.matrix['timeline'].x_length = 24;                
  }
 scheduler.setCurrentView(scheduler.date.add( 
 scheduler.date[scheduler._mode+"_start"](scheduler._date),(step||1),scheduler._mode));  
};
~~~

**Related sample** [Ignoring weekends](https://snippet.dhtmlx.com/r48113ix)


## Daten für Y-Achsen-Abschnitte in den Modi 'Bar' und 'Cell' {#dataforyaxissectionsinthebarandcellmodes}

Um die Werte für die Y-Achse in den Modi 'Bar' und 'Cell' festzulegen, verwenden Sie den Parameter [y_unit](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    y_unit:[
        {key:1, label:"James Smith"},
        {key:2, label:"John Williams"},
        {key:3, label:"David Miller"},
        {key:4, label:"Linda Brown"}
    ]
});
~~~

Jedes Element von [y_unit](api/method/createtimelineview.md) muss diese beiden Pflichtfelder enthalten:

- **key** - eindeutiger Bezeichner des Elements
- **label** - Textbezeichnung des Elements

## Daten für Y-Achsen-Abschnitte im Modus 'Tree' {#dataforyaxissectionsinthetreemode}

Der 'Tree'-Modus ermöglicht die Gruppierung von Elementen in mehrstufigen Ordnern, was nicht nur die Organisation verbessert, sondern auch die Zuordnung von Ereignissen zu ganzen Ordnern auf jeder Hierarchieebene erlaubt.


Um die 'Tree'-Timeline einzurichten, verwenden Sie denselben [y_unit](api/method/createtimelineview.md)-Parameter wie in den Modi 'Bar' und 'Cell', jedoch mit zusätzlichen Eigenschaften:

~~~js
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"production", label:"Production Department", children:[
            {key:"p1", label:"Managers", children:[
                {key:"pm1", label:"John Williams"},
                {key:"pm2", label:"David Miller"}
            ]},
            {key:"p2", label:"Linda Brown"},
            {key:"p3", label:"George Lucas"}
        ]},
        {key:"sales", label:"Sales and Marketing", children:[
            {key:"s1", label:"Kate Moss"},
            {key:"s2", label:"Dian Fossey"}
        ]}
    ]
});
~~~

[y_unit](api/method/createtimelineview.md)-Elemente enthalten:

- Zwei Pflichtfelder:
  - **key** - ID des Elements
  - **label** - Beschriftung des Elements
- Zwei optionale Felder:
  - **open** - gibt an, ob der Abschnitt initial ausgeklappt sein soll
  - **children** - Array mit verschachtelten Element-Objekten

 
## Daten für Y-Achsen-Abschnitte im Modus 'Days' {#dataforyaxissectionsinthedaysmode}

Für den 'Days'-Modus geben Sie die Anzahl der Tage auf der Y-Achse mit dem Parameter [days](api/method/createtimelineview.md) an:

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    days:7 // Anzahl der auf der Y-Achse angezeigten Tage
});
~~~


## Daten für Y-Achsen-Abschnitte vom Server {#dataforyaxissectionsfromtheserver}

Um Y-Achsen-Abschnitte vom Server zu laden, verwenden Sie:

- Auf der Client-Seite - die Methode [serverList](api/method/serverlist.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    y_unit:scheduler.serverList("sections"),
});
~~~

*Hier ruft [serverList](api/method/serverlist.md) eine Liste von Optionen mit dem Namen 'sections' ab.*

- Auf der Server-Seite 

Die Antwort für die Methode [load](api/method/load.md) sollte eine Collection mit dem Namen der Serverliste im JSON-Format enthalten, wie in [Beispiele für Datenformate](guides/data-formats.md#json-with-collections) beschrieben.

Alternativ können Sie auch den [OptionsConnector](https://docs.dhtmlx.com/connector__php__optionsconnector.html) verwenden:

~~~js
<?php
    include('connector-php/codebase/scheduler_connector.php');// Datei einbinden

    $res="mysql_connect(""localhost","root","");// Verbindung zum DB-Server
    mysql_select_db("sampleDB");// Datenbank auswählen

    $list = new OptionsConnector($res, $dbtype);
    $list->render_table("types","type_id","type_id(value),name(label)");
    
    $scheduler = new schedulerConnector($res, $dbtype);
    // denselben Namen wie auf der Client-Seite verwenden – 'sections'
    $scheduler->set_options("sections", $list); 
    $scheduler->render_table("events","id","start_date,end_date,text,type_id");
?>
~~~

![server_list_db](/img/server_list_db.png)

Die Antwort sollte dem [JSON-Format](guides/data-formats.md#json-with-collections) entsprechen und das Objekt "collections" mit den von [serverList](api/method/serverlist.md) referenzierten Collections enthalten.


Sie können Collections auch manuell erstellen, ohne dhtmlxConnector zu verwenden. In diesem Fall aktualisieren Sie die Collection mit der Methode [updateCollection](api/method/updatecollection.md):

~~~js
scheduler.updateCollection("sections", new_sections_array);
~~~


[Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)


## Dynamisches Hinzufügen/Entfernen von Elementen {#dynamicadditionremovalofitems}

Um Elemente dynamisch hinzuzufügen oder zu entfernen, stehen diese Methoden zur Verfügung:

- [addSection](api/method/addsection.md) 
- [deleteSection](api/method/deletesection.md)

~~~js
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"production", label:"Production Department", children:[
            {key:"p1", label:"Managers", children:[
                {key:"pm1", label:"John Williams"},
                {key:"pm2", label:"David Miller"}
            ]},
            {key:"p2", label:"Linda Brown"},
            {key:"p3", label:"George Lucas"}
        ]},
        {key:"sales", label:"Sales and Marketing", children:[
            {key:"s1", label:"Kate Moss"},
            {key:"s2", label:"Dian Fossey"}
        ]}
    ]
});
scheduler.addSection( {key:"pm3", label:"James Smith"}, "p1");
scheduler.addSection( {key:"s3", label:"Alex White"}, "sales");
scheduler.deleteSection("p3");
~~~

:::note
Die Methoden [addSection](api/method/addsection.md) und [deleteSection](api/method/deletesection.md) erfordern, dass der 'Tree'-Modus in der Timeline aktiviert ist.
:::

## Zweite X-Achse {#secondxaxis}

Eine zweite X-Achse kann oberhalb der Standardachse hinzugefügt werden, um Zeitintervalle der Hauptskala zu gruppieren.

![timeline_second_axis](/img/timeline_second_axis.png)

Um diese zweite Skala hinzuzufügen, verwenden Sie den Parameter [second_scale](api/method/createtimelineview.md): 

~~~js
 scheduler.createTimelineView({
    name:    "timeline",
    ...
    second_scale:{
        x_unit: "day", // Einheit der Achse (Standard ist 'minute')
        x_date: "%F %d" // Datumsformat ("July 01")
    }
});
~~~


[Second time scale (X-Axis)](https://docs.dhtmlx.com/scheduler/samples/06_timeline/07_second_scale.html)


## Ereignisse über die Zelle strecken {#stretchingeventsoverthecell}

Damit ein Ereignis unabhängig von seiner Dauer die gesamte Zellbreite ausfüllt, aktivieren Sie den Parameter [round_position](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    render:"bar",
    ...
    round_position:true
});
~~~

Mit **round_position:false** (Standard):

![stretching_events_01](/img/stretching_events_01.png)


Mit **round_position:true**:

![stretching_events_02](/img/stretching_events_02.png)


## Sortierung von Ereignissen {#sortingofevents}

Standardmäßig werden Ereignisse in der Timeline-Ansicht nach ihrem Startdatum sortiert. Um eine eigene Sortierreihenfolge festzulegen, geben Sie eine Funktion als Wert des Parameters [sort](api/method/createtimelineview.md) an.

Diese Funktion erhält jeweils zwei benachbarte Ereignisse und gibt zurück:

- **1**, wenn das erste Ereignis vor dem zweiten kommen soll
- **-1**, wenn das zweite Ereignis vor dem ersten kommen soll
- **0**, wenn sie als gleichwertig angesehen werden

~~~js title="Sortierung nach Textlänge"
scheduler.createTimelineView({
    name:   "timeline",
    render:"bar",
    ...
    sort:function(a, b){
        if (a.text.length > b.text.length) {
            // a vor b platzieren
            return -1;
        } else if(a.text.length < b.text.length) {
            return 1;
        } else{
            return +a.start_date > +b.start_date ? 1 : -1;
        }
    }
});
~~~


## Horizontaler Bildlauf {#horizontal-scroll}

Die Timeline-Ansicht unterstützt den horizontalen Bildlauf, mit dem Sie durch Tage, Wochen oder Monate navigieren können, ohne die Navigationsschaltflächen zu verwenden.

Um den horizontalen Bildlauf zu aktivieren, setzen Sie die Eigenschaft **scrollable** in der Methode [createTimelineView](api/method/createtimelineview.md). Sie können auch **column_width** und **scroll_position** wie folgt konfigurieren:

~~~js
scheduler.createTimelineView({
    name: "timeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    30,
    x_size: 24*7,
    x_start: 16,
    x_length: 48,
    y_unit:    sections,
    y_property:    "section_id",
    render: "bar",
    scrollable: true, /*!*/ 
    column_width: 70, /*!*/
    scroll_position:new Date(2018, 0, 15) /*!*/  
});
~~~

- **scrollable** - (*boolean*) aktiviert den horizontalen Bildlauf; Standard ist *false*. Ist der Wert *false* oder nicht gesetzt, werden die Spalten auf die Timeline-Breite verkleinert. Bei *true* werden die Spalten nicht unter **column_width** verkleinert, und ein Scrollbalken erscheint bei Bedarf.
- **column_width** - (*number*) optional, legt die Mindestbreite der Timeline-Datumsspalten fest; Standard ist 100.
- **scroll_position** - (*Date*) optional, legt die anfängliche Scrollposition der Timeline fest und akzeptiert denselben Wert wie `timeline.scrollTo()`.

Die Timeline-Ansicht aktiviert **smart rendering** standardmäßig bei aktiviertem Scrollen. Dies verbessert die Performance, indem nur sichtbare Zeilen, Spalten und Ereignisse gerendert werden, während andere beim Scrollen geladen werden.


[Horizontal scroll for Timeline view](https://docs.dhtmlx.com/scheduler/samples/06_timeline/16_lines_performance.html)


:::note
Beachten Sie, dass das Scrollen in der Timeline nicht unendlich ist und der Zeitbereich begrenzt bleibt. Um zwischen Zeitintervallen zu wechseln, sind weiterhin Navigationskontrollen erforderlich.
:::


## Autoscroll-Konfiguration {#autoscrollconfiguration}

Autoscroll wird standardmäßig aktiviert, wenn Sie ein Ereignis in der Nähe der Kanten des Timeline-Viewports verschieben oder seine Größe ändern.

Sie können die Empfindlichkeit und Geschwindigkeit des Autoscrolls über das **autoscroll**-Objekt in der Methode [createTimelineView](api/method/createtimelineview.md) anpassen:

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    autoscroll: {            /*!*/
        range_x: 200,         /*!*/
        range_y: 100,         /*!*/
        speed_x: 20,          /*!*/
        speed_y: 10            /*!*/
    }                        /*!*/
});
~~~

- **range_x** - (*number*) horizontale Entfernung zum Viewport-Rand, um Autoscroll auszulösen
- **range_y** - (*number*) vertikale Entfernung zum Viewport-Rand, um Autoscroll auszulösen
- **speed_x** - (*number*) horizontale Autoscroll-Geschwindigkeit
- **speed_y** - (*number*) vertikale Autoscroll-Geschwindigkeit

## Kopfzeile der Spalten für Abschnitte {#headerofthesectionscolumn}

Standardmäßig ist die Kopfzeile über der Spalte für Abschnitte leer. Sie können eine Beschriftung mit dem Objekt [locale](api/other/locale.md) wie folgt hinzufügen:

~~~js
scheduler.locale.labels.<timelineName>_scale_header = "Label";
~~~

Ersetzen Sie \<timelineName\> durch den Namen Ihrer Timeline-Ansicht aus [createTimelineView](api/method/createtimelineview.md). Beispiel:

~~~js
scheduler.locale.labels.timeline_scale_header = "Users";
~~~

## Benutzerdefinierter Inhalt in Zellen {#custom-content-in-cells}

Es ist möglich, benutzerdefinierten Inhalt in Timeline-Zellen anzuzeigen, nicht nur im Cell-Modus, wie in diesem Beispiel:


[Cell mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)


Sie können auch ein Template für den Zellinhalt in allen Timeline-Modi definieren.

![Custom content in Timeline cells](/img/custom_cell_content.png)


[Display labels in timeline cells](https://docs.dhtmlx.com/scheduler/samples/06_timeline/17_timeline_cell_content.html)


Um diese Funktion für eine bestimmte Timeline zu aktivieren, setzen Sie die Eigenschaft **cell_template** beim Erstellen der Timeline mit [createTimelineView](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    cell_template: true,
    ...
});
~~~

Nach der Aktivierung wird das angegebene Template aufgerufen. Im folgenden Beispiel wird beispielsweise die Anzahl der Ereignisse pro Datum im "tree"-Timeline-Modus angezeigt:

~~~js
<style>
    .dhx_matrix_cell div.load-marker{
        position: absolute;
        width: 40%;
        height: 25px;
        transform: translate(70%, 20%);
        line-height: 25px;
        text-align: center;
        border-radius: 7px;
        color: white;
    }
    .load-marker-no{
        background: #e0e0e0;
    }
    .load-marker-light{
        background: #aed581;
    }
    .load-marker-high{
        background: #ff8a65;
    }

</style>

scheduler.templates.timeline_cell_value = function (evs, date, section){
    if(section.children){
        const timeline = scheduler.getView();
 
        const events = timeline.selectEvents({
            section: section.key,
            date: date,
            selectNested: true
        });
 
        let className = "";
        if(!events.length){
            className = "load-marker-no";
        }else if(events.length < 3){
            className = "load-marker-light";
        }else{
            className = "load-marker-high";
        }
 
        return "<div class='load-marker "+className+"'>"+
            events.length
        +"</div>";
 
    }
 
    return "";
};
~~~


[Display labels in timeline cells](https://docs.dhtmlx.com/scheduler/samples/06_timeline/17_timeline_cell_content.html)


## Höhen von Abschnitten ändern {#changingheightsofsections}

Standardmäßig wird die Höhe von Abschnitten und Ereignissen durch die Einstellungen **dy** und **event_dy** in [createTimelineView](api/method/createtimelineview.md) gesteuert.

Wenn ein Abschnittsobjekt eine **height**-Eigenschaft enthält, überschreibt ihr Wert die **dy**-Einstellung:

~~~js

scheduler.createTimelineView({
    name:    "timeline",
    ...
    y_unit:    [
        {key: 1, label: "Room 1", height: 60},
        {key: 2, label: "Room 2", height: 60},
        {key: 3, label: "Room 3", height: 120},
        {key: 4, label: "Room 4", height: 900},
    ],
~~~

Sie können die **height**-Eigenschaft auch nach der Initialisierung des Schedulers dynamisch ändern.


[Collapse timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/18_collapse_section.html)


## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
- [Daten laden](guides/loading-data.md)
- [Blockieren und Markieren von Daten](guides/limits.md)
- [Skins](guides/skins.md)
- [Lokalisierung](guides/localization.md)
