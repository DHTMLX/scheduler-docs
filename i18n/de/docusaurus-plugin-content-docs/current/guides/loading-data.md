---
title: "Daten laden"
sidebar_label: "Daten laden"
---

# Daten laden

dhtmlxScheduler unterstützt das Laden von Daten in drei Formaten:

1. JSON;
2. XML;
3. ICal.

[Beispiele für Datenformate](guides/data-formats.md)

## Laden von Daten aus einem Inline-Datensatz {#loadingdatafromaninlinedataset}

Um Daten direkt aus einem Inline-Datensatz zu laden, wird die Methode [parse](api/method/parse.md) verwendet:

~~~js
scheduler.init('scheduler_here',new Date(2009,10,1),"month");
...
scheduler.parse([
    {text:"Meeting",    start_date:"2019-04-11 14:00", end_date:"2019-04-11 17:00"},
    {text:"Conference", start_date:"2019-04-15 12:00", end_date:"2019-04-18 19:00"},
    {text:"Interview",  start_date:"2019-04-24 09:00", end_date:"2019-04-24 10:00"}
],"json");

~~~


[Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)


## Laden von Daten aus einer Datei {#loadingdatafromadatafile}

Um Daten aus einer externen Datei zu laden, wird die Methode [load](api/method/load.md) verwendet:

~~~js
scheduler.init('scheduler_here',new Date(2018,10,1),"month");
...
scheduler.load("data.json"); //Laden von Daten aus einer Datei
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Laden von Daten aus einer Datenbank {#loadingdatafromadatabase}
------------------------------------- 

Es gibt zwei Ansätze, um Daten aus einer Datenbank zu laden. Beide erfordern die Umsetzung auf Client- und Serverseite.

1) Der erste Ansatz nutzt eine REST-API zur Kommunikation mit dem Server.

- Die Implementierung auf Serverseite hängt vom gewählten Framework ab.
Zum Beispiel wird bei Node.js eine Serverroute für die URL hinzugefügt, an die Scheduler seine AJAX-Anfrage sendet.

Diese Route erzeugt eine JSON-Antwort.

~~~js
app.get('/data', function(req, res){
    db.event.find().toArray(function(err, data){
        //set id property for all records
        for (var i = 0; i < data.length; i++)
            data[i].id = data[i]._id;
        
        //output response
        res.send(data);
    });
});
~~~

- Auf der Client-Seite wird die Methode [load](api/method/load.md) mit der URL verwendet, von der Scheduler die Daten anfordert:

~~~js title="Loading from a database. Client-side code"
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("apiUrl");
~~~

:::note
Ausführlichere Informationen zur Server-Integration mit der REST-API finden Sie im Artikel [Serverseitige Integration](guides/server-integration.md).
:::

2) Der zweite Ansatz beinhaltet das Laden von Daten aus Datenbanktabellen mit dem [PHP Connector](https://docs.dhtmlx.com/connector__php__index.html).

- Auf der Serverseite wird ein Skript implementiert, das Daten im XML- oder JSON-Format zurückgibt:
  
~~~js title="Static loading from db. Server-side code"
include ('dhtmlxConnector/codebase/scheduler_connector.php');
 
$res="mysql_connect(""localhost","root","");
mysql_select_db("sampleDB");
 
$calendar = new SchedulerConnector($res);
$calendar->render_table("events","id","event_start,event_end,text","type");
~~~

- Auf der Client-Seite wird die Methode [load](api/method/load.md) mit dem Pfad zum Server-Skript verwendet:
  
~~~js title="Static loading from db. Client-side code"
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("events.php");
~~~

:::note
Weitere Details finden Sie im [dhtmlxScheduler mit dhtmlxConnector](integrations/other/howtostart-connector.md) Leitfaden.
:::

## Laden von Daten aus mehreren Quellen {#loadingdatafrommultiplesources}

Um Daten aus mehreren Quellen zu laden, steht die **multisource**-Erweiterung zur Verfügung:

~~~js
scheduler.plugins({
   multisource: true
});
~~~

:::note
Mehrere Quellen können sowohl für statisches als auch für dynamisches Laden verwendet werden.
:::

Nach Einbindung der entsprechenden Datei kann die Methode [load](api/method/load.md) ein Array von Quellen akzeptieren:

~~~js
scheduler.load(["first/source/some","second/source/other"]);
~~~

## Dateneigenschaften {#dataproperties}

### Pflichtfelder

Datenelemente benötigen mindestens diese drei Eigenschaften, um korrekt geparst zu werden:

- **start_date** -  (*string*) das Startdatum des Ereignisses;
- **end_date** - (*string*) das Enddatum des Ereignisses;
- **text** - (*string*) die Ereignisbeschreibung.

Beim Laden aus einer Datenbank ist eine zusätzliche Pflichtangabe erforderlich:

- **id** -  (*string, number*) die Ereignis-ID.

Standardmäßig verwenden JSON- und XML-Daten das Datumsformat **'%Y-%m-%d %H:%i'** (siehe [Spezifikation des Datumsformats](guides/settings-format.md)).

 Um es zu ändern, verwenden Sie die Option [date_format](api/config/date_format.md).

~~~js
scheduler.config.date_format="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here', new Date(2019, 3, 18), "week");
~~~

### Benutzerdefinierte Eigenschaften

Neben den erforderlichen Feldern können Datenelementen benutzerdefinierte Eigenschaften hinzugefügt werden. Diese zusätzlichen Eigenschaften werden als Strings geparst und können nach Bedarf auf der Client-Seite verwendet werden.

Beispiele für Daten mit benutzerdefinierten Eigenschaften finden Sie [hier](guides/data-formats.md#datawithcustomproperties).

## Datenbankstruktur {#databasestructure}

Bei der Einrichtung einer Datenbank für Scheduler-Ereignisse wird folgende Struktur erwartet:

- **events-Tabelle** - enthält Scheduler-Ereignisse
    - **id** - (*string/int/guid*) - Ereignis-ID. Primärschlüssel mit Auto-Inkrement.
    - **start_date** - (*DateTime*) - Startdatum des Ereignisses, nicht null.
    - **end_date** - (*DateTime*) - Enddatum des Ereignisses, nicht null.
    - **text** - (*string*) - Ereignisbeschreibung.

Für wiederkehrende Ereignisse werden zusätzliche Spalten benötigt:

- **events-Tabelle** - enthält Scheduler-Ereignisse
    - **id** - (*string/int/guid*) - Ereignis-ID. Primärschlüssel mit Auto-Inkrement.
    - **start_date** - (*DateTime*) - Startdatum des Ereignisses, nicht null.
    - **end_date** - (*DateTime*) - Enddatum des Ereignisses, nicht null.
    - **text** - (*string*) - Ereignisbeschreibung.
    - **event_pid** - (*string/int/guid*) - Referenz auf die ID der übergeordneten Ereignisserie. Kann leer oder null sein (leerer String, Null).
    - **event_length** - (*string/bigint*) - Ereignisdauer oder Zeitstempel einer geänderten Instanz. Kann leer oder null sein (leerer String, Null). Maximale Länge (bei String-Werten) ist 10.
    - **rec_type** - (*string*) - Wiederholungsregel. Kann leer sein oder Standardwert leerer String. Maximale Länge ist 50.

Weitere Spalten können nach Bedarf hinzugefügt werden; sie sind über die Client-API zugänglich.

## Dynamisches Laden {#dynamic-loading}

Standardmäßig lädt dhtmlxScheduler alle Daten auf einmal, was bei großen Datenmengen ineffizient sein kann. Mit dynamischem Laden können Daten in Teilen geladen werden, die auf den aktuell sichtbaren Bereich beschränkt sind.

### Technik

Aktivieren Sie das dynamische Laden durch Aufruf der Methode [setLoadMode](api/method/setloadmode.md):
~~~js title="Enabling the dynamic loading"
scheduler.setLoadMode("month");
scheduler.load("some.php");
~~~

Die Methode akzeptiert einen Lade-Modus, der die zu ladende Datenmenge festlegt: *day, week, month* oder *year.*

Beispielsweise lädt der Modus 'week' nur Daten für die aktuelle Woche und lädt bei Bedarf weitere Daten nach.


#### Funktionsweise der Lademodi

Lademodi bestimmen das Intervall der geladenen Daten für den ausgewählten Zeitraum. Zum Beispiel beim Öffnen der Wochenansicht für Daten vom 29.01.2018 bis 05.02.2018:

- Für den "day"-Modus

~~~js
scheduler.setLoadMode("day");
~~~

Scheduler fordert Daten tageweise an, z.B. vom 29.01.2018 bis 05.02.2018.

- Für den "month"-Modus

~~~js
scheduler.setLoadMode("month");
~~~

Scheduler fordert Daten für volle Monate an, z.B. vom 01.01.2018 bis 01.03.2018.

- Für den "year"-Modus

~~~js
scheduler.setLoadMode("year");
~~~

Scheduler fordert Daten für volle Jahre an, z.B. vom 01.01.2018 bis 01.01.2019.

Das angeforderte Intervall ist immer mindestens so groß wie das angezeigte.

Das Ladeintervall beeinflusst:

- wie oft dynamische Ladevorgänge ausgeführt werden

Größere Intervalle verringern die Häufigkeit der Ladevorgänge, da bereits geladene Daten zwischengespeichert werden.

- wie lange jede Anfrage dauert

Größere Intervalle bedeuten mehr Daten pro Anfrage, was die Verarbeitungszeit erhöht.

#### Anfrage

Anfragen haben folgendes Format:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

*wobei DATEHERE ein gültiges Datum im durch die Option [load_date](api/config/load_date.md) festgelegten Format ist.* 


Bei Verwendung von <a href="https://docs.dhtmlx.com/connector__php__index.html">dhtmlxConnector</a> auf der Serverseite ist keine zusätzliche Verarbeitung zur Auswertung dieser Anfragen erforderlich.

### Lade-Spinner

Beim Arbeiten mit großen Datenmengen ist es hilfreich, einen Lade-Spinner anzuzeigen, um den Fortschritt zu visualisieren.

Der Lade-Spinner kann aktiviert werden, indem die Eigenschaft [show_loading](api/config/show_loading.md) auf *true* gesetzt wird:

~~~js
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2018,0,10),"month");
~~~

:::note
Um das Spinner-Bild anzupassen, ersetzen Sie 'imgs/loading.gif' durch Ihr eigenes Bild.
:::

## Laden von Daten mit Timeline- und Units-Abschnitten vom Server {#loadingdatawithtimelineandunitssectionsfromtheserver}

Beim Laden von Daten in die [Timeline](views/timeline.md#data-loading)- und [Units](views/units.md#loading-data-to-the-view)-Ansichten muss ein Array von Abschnitten bereitgestellt werden.

Um Timeline- und Units-Abschnitte vom Backend zu laden, ist eine detailliertere Einrichtung erforderlich:

- Während der Initialisierung der Timeline-Ansicht wird anstelle eines Abschnitt-Arrays die Methode [serverList](api/method/serverlist.md) mit dem Namen der Collection verwendet:

~~~js
scheduler.createTimelineView({
   ....
   y_unit: scheduler.serverList("sections"),
   ...
});
~~~

- Laden Sie Daten in den Scheduler mit der Methode [load](api/method/load.md):

~~~js
scheduler.load("data.json");
~~~

- Auf der Serverseite sollte die Antwort wie folgt strukturiert sein:

~~~js title=""data.json""
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2018-03-02 00:00:00",
          "end_date":"2018-03-04 00:00:00",
          "text":"dblclick me!",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2018-03-09 00:00:00",
          "end_date":"2018-03-11 00:00:00",
          "text":"and me!",
          "type":"2"
      },
      {
          "id":"3",
          "start_date":"2018-03-16 00:00:00",
          "end_date":"2018-03-18 00:00:00",
          "text":"and me too!",
          "type":"3"
      },
      { 
          "id":"4",
          "start_date":"2018-03-02 08:00:00",
          "end_date":"2018-03-02 14:10:00",
          "text":"Type 2 event",
          "type":"2"
      }
   ], 
   "collections": {
      "sections":[
         {"value":"1","label":"Simple"},
         {"value":"2","label":"Complex"},
         {"value":"3","label":"Unknown"}
      ]
   }
}
~~~

In diesem Beispiel enthält das "data"-Array die Kalendereinträge, während das "collections"-Objekt die Collections enthält, auf die über die Methode [serverList](api/method/serverlist.md) verwiesen wird.
