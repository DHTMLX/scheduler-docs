---
title: "Serverseitige Integration"
sidebar_label: "Serverseitige Integration"
---

# Serverseitige Integration

Die beste Methode, um dhtmlxScheduler mit einem Backend zu verbinden, ist die Einrichtung einer RESTful API auf dem Server und die Verwendung von dhtmlxDataProcessor auf der Client-Seite.

[DataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) ist eine clientseitige Bibliothek, die in dhtmlxScheduler.js enthalten ist. Sie verfolgt Datenänderungen und verwaltet Serveranfragen vom Client.

Sie können dhtmlxScheduler mithilfe einer REST API mit dem Server verbinden - und das in verschiedenen Frameworks und Programmiersprachen. Nachfolgend finden Sie eine Liste serverseitiger Implementierungen, die für die Scheduler-Backend-Integration verfügbar sind:

- [dhtmlxScheduler mit PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler mit PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler mit PHP: Slim 3](integrations/other/howtostart-php.md)

## Vorgehensweise {#technique}

Um Daten vom Server über eine REST API zu laden, gehen Sie im Allgemeinen wie folgt vor:

### Clientseite

1) Verwenden Sie die Methode [load](api/method/load.md) und geben Sie die URL an, die Scheduler-Daten im [JSON](guides/data-formats.md#json)-Format zurückgibt.

2) Verwenden Sie die Methode [createDataProcessor](api/method/createdataprocessor.md) und übergeben Sie ein Objekt mit Konfigurationsoptionen:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST"
});
~~~

Alternativ können Sie einen dataProcessor mit dem Konstruktor erstellen und an das dhtmlxScheduler-Objekt anhängen. Der scheduler.DataProcessor()-Konstruktor akzeptiert den Pfad zum serverseitigen Skript:

~~~js
scheduler.init("scheduler_here", new Date(), "month");
scheduler.load("apiUrl");

const dp = new scheduler.DataProcessor("apiUrl");
dp.init(scheduler);
~~~

Ausführlichere Informationen finden Sie im folgenden Abschnitt.

<h3 id="createdp">DataProcessor erstellen</h3>

Beim Erstellen eines DataProcessor über die API-Methode [createDataProcessor](api/method/createdataprocessor.md) haben Sie mehrere Möglichkeiten, Parameter zu übergeben.

1. Verwenden Sie einen der vordefinierten Request-Modi, zum Beispiel:

~~~js
const dp = scheduler.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

wobei gilt:

- **url** - die serverseitige URL
- **mode** - die Methode, mit der Daten an den Server gesendet werden: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2. Übergeben Sie ein benutzerdefiniertes **router**-Objekt:

~~~js
const dp = scheduler.createDataProcessor(router);
~~~

wobei der Router eine Funktion sein kann:

~~~js
const server = "/api";

// entity - "event"
// action - "create"|"update"|"delete"
// data - ein Objekt mit Eventdaten
// id – die ID des bearbeiteten Objekts (Event)
const dp = scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
               return scheduler.ajax.post(
                `${server}/${entity}`,
                data
               );
        break;
        case "update":
               return scheduler.ajax.put(
                `${server}/${entity}/${id}`,
                data
            );
        break;
        case "delete":
               return scheduler.ajax.del(
                `${server}/${entity}/${id}`
               );
        break;
       }
});
~~~

oder ein Objekt, das wie folgt aufgebaut ist:

~~~js
const dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

Alle Router-Funktionen sollten entweder ein Promise oder ein Datenantwort-Objekt zurückgeben. Dadurch kann der dataProcessor die Datenbank-ID zuweisen und das **onAfterUpdate**-Event auslösen.

~~~js
const router = function(entity, action, data, id) {
    return new Promise(function(resolve, reject) {
        // … Logik
        return resolve({tid: databaseId});
    });
}
~~~

So kann DataProcessor verwendet werden, um Daten in localStorage oder einem beliebigen Speicher, der nicht an eine bestimmte URL gebunden ist, zu speichern oder wenn unterschiedliche Server (URLs) für das Erstellen und Löschen von Objekten zuständig sind.

  
<h3 id="requestresponsedetails">Details zu Request und Response</h3>

Die URL folgt diesem Muster:

- api/eventId

wobei "api" die in der dataProcessor-Konfiguration angegebene URL ist.


#### REST-Modus

Um den REST-Modus zu verwenden, setzen Sie die Eigenschaft `mode` des [createDataProcessor](api/method/createdataprocessor.md)-Konfigurationsobjekts auf "REST":

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST"
});
~~~

Hier sind die typischen Anfragen und Antworten:

<table class="dp_table">
  <tr>
  <th><b>Aktion</b></th><th><b>HTTP-Methode</b></th><th><b>URL</b></th><th><b>Antwort</b></th>
  </tr>
  <tr>
  <td>Daten laden</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON-Format](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>Neues Event hinzufügen</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>("action":"inserted","tid":"eventId")</td>
  </tr>
  <tr>
  <td>Event aktualisieren</td>
  <td>PUT</td>
  <td>/apiUrl/:id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>Event löschen</td>
  <td>DELETE</td>
  <td>/apiUrl/:id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

#### REST-JSON-Modus {#rest-json-mode}

Um den REST-JSON-Modus zu verwenden, setzen Sie die Eigenschaft `mode` des [createDataProcessor](api/method/createdataprocessor.md)-Konfigurationsobjekts auf "REST-JSON":
~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST-JSON"
});

~~~

In diesem Modus sendet der Scheduler POST/PUT/DELETE-Anfragen mit dem Content-Type `application/json`.

Die Anfragen und Antworten sehen folgendermaßen aus:

<table class="dp_table">
  <tr>
  <th><b>Aktion</b></th><th><b>HTTP-Methode</b></th><th><b>URL</b></th><th><b>Request Body</b></th><th><b>Antwort</b></th>
  </tr>
  <tr>
  <td>Daten laden</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td></td>
  <td>[JSON-Format](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>Neues Event hinzufügen</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... )</td>
  <td>( "action":"inserted", "tid":"eventId" )</td>
  </tr>
  <tr>
  <td>Event aktualisieren</td>
  <td>PUT</td>
  <td>/apiUrl/:id</td>
  <td>( "start_date":"2024-12-18 00:00", "end_date":"2024-12-18 00:05", "text":"New event", ... )</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>Event löschen</td>
  <td>DELETE</td>
  <td>/apiUrl/:id</td>
  <td></td>
  <td>("action":"deleted")</td>
  </tr>
</table>

#### POST-Modus

Um den POST-Modus zu verwenden, setzen Sie die Eigenschaft `mode` des [createDataProcessor](api/method/createdataprocessor.md)-Konfigurationsobjekts auf "POST":

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "POST"
});
~~~

So funktionieren die Anfragen und Antworten:

<table class="dp_table">
  <tr>
  <th><b>Aktion</b></th><th><b>HTTP-Methode</b></th><th><b>URL</b></th><th><b>Antwort</b></th>
  </tr>
  <tr>
  <td>Daten laden</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON-Format](guides/data-formats.md#json)</td>
  </tr>

  <tr>
  <td>Event aktualisieren</td>
  <td>POST</td>
  <td>/apiUrl</td>
  <td>("action":"inserted|updated|deleted", "tid":"eventId")</td>
  </tr>
</table>

#### JSON-Modus {#json-mode}

Um den JSON-Modus zu verwenden, setzen Sie die Eigenschaft `mode` des [createDataProcessor](api/method/createdataprocessor.md)-Konfigurationsobjekts auf "JSON":

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "JSON"
});
~~~

In diesem Modus sendet der Scheduler nach jeder Datenänderung eine POST-Anfrage an den Server (ähnlich wie im POST-Modus, aber mit anderem Anfrageformat).

Die Anfragen und Antworten sehen wie folgt aus:

<table class="dp_table">
  <tr>
  <th><b>Aktion</b></th><th><b>HTTP-Methode</b></th><th><b>Request Body</b></th><th><b>Antwort</b></th>
  </tr>
  <tr>
  <td>Daten laden</td>
  <td>GET</td>
  <td></td>
  <td>[JSON-Format](guides/data-formats.md#json)</td>
  </tr>
  <tr>
  <td>Neues Event hinzufügen</td>
  <td>POST</td>
  <td>( "id": temporaryId, "action":"inserted", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>( "action":"inserted", "tid":"eventId" )</td>
  </tr>
  <tr>
  <td>Event aktualisieren</td>
  <td>POST</td>
  <td>( "id": id, "action":"updated", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>Event löschen</td>
  <td>POST</td>
  <td>( "id": id, "action":"deleted", "data":( "start_date":"2019-12-18 00:00", "end_date":"2019-12-18 00:05", "text":"New event", ... ) )</td>
  <td>("action":"deleted")</td>
  </tr>
</table>


#### Dynamisches Laden

Die Anfragen und Antworten für das dynamische Laden sind wie folgt:

<table class="dp_table">
  <tr>
  <th><b>Aktion</b></th><th><b>HTTP-Methode</b></th><th><b>URL</b></th><th><b>Antwort</b></th>
  </tr>
  <tr>
  <td>Daten laden</td>
  <td>GET</td>
  <td>/apiUrl?from=minDate&to=maxDate</td>
  <td>[JSON-Format](guides/data-formats.md#json)</td>
  </tr>
</table>

### Anfrage-Parameter

Create/Update/Delete-Anfragen beinhalten alle öffentlichen Eigenschaften des clientseitigen Event-Objekts:

- **id**: 71
- **start_date**: 2024-11-04 15:00
- **end_date**: 2024-11-04 18:00
- **text**:  Recinto Ferial - Valencia 
- **details**: Details für  Recinto Ferial - Valencia 
- **!nativeeditor_status**: updated

:::note
Der Parameter **!nativeeditor_status** gilt nur für den POST-Modus.
:::

### Serverseite

Immer wenn im Scheduler eine Aktion ausgeführt wird, wie das Hinzufügen, Aktualisieren oder Löschen von Ereignissen, reagiert dataProcessor, indem eine AJAX-Anfrage an den Server gesendet wird.

Jede Anfrage enthält alle notwendigen Daten, um Änderungen in der Datenbank zu speichern. Da dataProcessor im REST-Modus eingerichtet ist, werden je nach Operationstyp unterschiedliche HTTP-Methoden verwendet.

:::note
Wenn Sie aus irgendeinem Grund die REST API nicht verwenden möchten, ist eine gute Alternative [die Verwendung der dhtmlxConnector-Bibliothek](integrations/other/howtostart-connector.md).
:::

## Wiederkehrende Ereignisse {#recurringevents}

Wiederkehrende Ereignisse werden in der Datenbank als Datensätze gespeichert, die alle [Felder eines regulären Ereignisses](guides/loading-data.md#dataproperties) sowie mehrere zusätzliche Felder enthalten: **rrule**, **duration**, **recurring_event_id**, **original_start** und **deleted**.

Weitere Details finden Sie im Artikel [Wiederkehrende Ereignisse](guides/recurring-events.md#serversideintegration).

Neben diesen zusätzlichen Feldern benötigt der serverseitige Controller eine spezielle Logik:

- Für die **insert**-Aktion:
  - wenn **event.deleted === true**, sollte die Antwort einen 'deleted'-Status anzeigen
- Für die **update**-Aktion:
  - wenn **event.rrule** nicht leer ist und **event.recurring_event_id** leer ist, müssen alle Ereignisse mit **recurring_event_id == event.id** gelöscht werden
- Für die **delete**-Aktion:
  - wenn **event.rrule** nicht leer ist und **event.recurring_event_id** leer ist, müssen alle Ereignisse mit **recurring_event_id == event.id** gelöscht werden
  - wenn **event.recurring_event_id** nicht leer ist, sollte das Ereignis mit **event.deleted = true** aktualisiert werden, anstatt gelöscht zu werden

:::note
Ein ausführliches Beispiel zum Bearbeiten und Löschen wiederkehrender Ereignisse finden Sie im [entsprechenden Abschnitt des Artikels zu wiederkehrenden Ereignissen](guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series).
:::


## Eigene Request-Header und Parameter {#custom-request-headers-and-parameters}

### Hinzufügen eigener Request-Header

Falls der Scheduler zusätzliche Header an Ihr Backend senden soll, können Sie diese mit der Methode [dataProcessor.setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) angeben.

Beispielsweise, um einen Autorisierungstoken zu Ihren Anfragen hinzuzufügen:

~~~js
scheduler.init("scheduler_here");
scheduler.load("/api");
 
const dp = scheduler.createDataProcessor("/api");
dp.init(scheduler);
dp.setTransactionMode({
    mode:"REST",
    headers: {
       "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

Derzeit unterstützt [load](api/method/load.md) keine Header- oder Payload-Parameter für GET-Anfragen. Falls Sie diese benötigen, müssen Sie die xhr-Anfrage manuell senden und die Daten mit [parse](api/method/parse.md) in den Scheduler laden, wie im folgenden Beispiel:

~~~js
const authToken = '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b';

fetch("/api", {
    method: "GET", 
    headers: {
        "Content-Type": "application/json", 
        "Authorization": `Token  ${authToken}`
    }
})
.then(response => response.json()) 
.then(data => {
    scheduler.parse(data);
})
.catch(error => {
    console.error("Error:", error);
});
~~~

### Hinzufügen eigener Parameter zur Anfrage

Es gibt mehrere Möglichkeiten, zusätzliche Parameter in Anfragen einzubinden.

Da der Scheduler alle Eigenschaften des Datenobjekts an das Backend sendet, können Sie einfach eine zusätzliche Eigenschaft direkt zum *data object* hinzufügen, und sie wird mitgesendet:

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    const event = scheduler.getEvent(id);
    event.userId = currentUser;
    return true;
});
~~~

Alternativ können benutzerdefinierte Parameter zu allen von dataProcessor gesendeten Anfragen über die **payload**-Eigenschaft des [setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html)-Parameters hinzugefügt werden:

~~~js
scheduler.init("gantt_here");
scheduler.load("/api");
 
const dp = scheduler.createDataProcessor("/api");
dp.init(scheduler);
dp.setTransactionMode({
    mode:"REST",
    payload: {
       token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

Die Payload wird an die Query-String der Anfrage angehängt.

Eine weitere Möglichkeit ist die Verwendung des [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html)-Events von DataProcessor:

~~~js
const dp = scheduler.createDataProcessor("data/events.php");

dp.attachEvent("onBeforeUpdate", function(id, state, data){
    data.productName = "Product 2";
    return true;
});
~~~

Dieses Event wird für jeden Datensatz, der an das Backend gesendet wird, ausgelöst, und der benutzerdefinierte Parameter wird zu jedem Scheduler-Ereignis mit der Ereignis-ID als Präfix hinzugefügt, etwa so:

~~~js
123_productName:Product 2
~~~


## Auslösen des Speicherns von Daten per Skript {#triggeringdatasavingfromscript}

Sobald dataProcessor initialisiert ist, werden alle vom Benutzer oder per Code vorgenommenen Änderungen automatisch an die Datenquelle gesendet.

Um ein bestimmtes Ereignis programmatisch zu aktualisieren, wird in der Regel die Methode [addEvent](api/method/addevent.md) verwendet:

~~~js
scheduler.parse([
     { id:1, start_date:"2017-05-13 6:00", end_date:"2017-05-13 8:00", text:"Event 1"},
     { id:2, start_date:"2017-06-09 6:00", end_date:"2017-06-09 8:00", text:"Event 2"}
]);

const event = scheduler.getEvent(1);
event.text = "Conference"; // ändert die Ereignisdaten
scheduler.addEvent(event); // zeigt das aktualisierte Ereignis an
~~~

Wird diese Methode für ein bereits geladenes Ereignis aufgerufen, löst [addEvent](api/method/addevent.md) eine *update*-Anfrage aus, andernfalls eine *insert*-Anfrage.

Diese Methoden senden Aktualisierungen an das Backend:

- [addEvent](api/method/addevent.md)
- [deleteEvent](api/method/deleteevent.md)


## Speichern von Änderungen ohne DataProcessor {#savingchangeswithoutdataprocessor}

dhtmlxScheduler kann auch ohne gantt.dataProcessor verwendet werden. In diesem Fall müssen Sie alle im Scheduler vorgenommenen Änderungen manuell verfolgen und dann an Ihr Backend senden.

Folgende Events sollten dazu überwacht werden:

- [onEventAdded](api/event/oneventadded.md)
- [onEventChanged](api/event/oneventchanged.md)
- [onEventDeleted](api/event/oneventdeleted.md)

Wenn clientseitig ein neues Ereignis erstellt wird, erhält es zunächst eine temporäre ID, bis es eine permanente Datenbank-ID erhält.

Nachdem das neue Element in die Datenbank eingefügt wurde, sollten Sie die neue ID an den Client zurücksenden und das zugehörige Ereignis mit der Methode [changeEventId](api/method/changeeventid.md) aktualisieren:

~~~js
// Angenommen, eventService ist eine CRUD-Service-Implementierung

scheduler.attachEvent('onEventAdded', function(id, event) {
  eventService.create(event)
    .then(function(result){
      scheduler.changeEventId(id, result.databaseId);
    });
});

scheduler.attachEvent('onEventChanged', function(id, event) {
  eventService.update(event);
});

scheduler.attachEvent('onEventDeleted', function(id) {
  eventService.delete(id);
});
~~~

<span id="createdp"></span>
## Eigene Routing-Logik {#custom-routing}

Wenn das RESTful AJAX API nicht zu Ihren Backend-Anforderungen passt oder Sie manuell steuern möchten, was an den Server gesendet wird, können Sie ein eigenes Routing verwenden.

Beispielsweise verfügen Frameworks wie Angular oder React möglicherweise über Komponenten, die Änderungen nicht direkt an den Server senden, sondern an eine andere Komponente weitergeben, die für das Speichern der Daten verantwortlich ist.

Um ein eigenes Routing für DataProcessor einzurichten, verwenden Sie die Methode [**createDataProcessor()**](#custom-routing):

~~~js
const server = "/api";

scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
            return scheduler.ajax.post(
                `${server}/${entity}`,
                data
            );
        break;
        case "update":
            return scheduler.ajax.put(
                `${server}/${entity}/${id}`,
                data
            );
        break;
        case "delete":
            return scheduler.ajax.del(
                `${server}/${entity}/${id}`
           );
        break;
    }
});
~~~

### Verwendung von AJAX für eigene Router

Das [Scheduler AJAX-Modul](api/other/ajax.md) kann für eigenes Routing nützlich sein. Scheduler erwartet, dass ein eigener Router ein Promise zurückgibt, das das Ergebnis der Operation repräsentiert und so die Erkennung des Abschlusses ermöglicht.

Das AJAX-Modul unterstützt Promises und funktioniert gut innerhalb eigener Router. Scheduler verarbeitet das Promise, sobald es aufgelöst wurde.

Im Beispiel unten wird eine neue Aufgabe erstellt. Wenn die Serverantwort die ID der neu erstellten Aufgabe enthält, kann Scheduler diese entsprechend übernehmen.

~~~js
scheduler.createDataProcessor(function(entity, action, data, id){
...
 
    switch (action) {
        case "create":
            return scheduler.ajax.post({
                headers: { 
                    "Content-Type": "application/json" 
                },
                url: server + "/" + entity + "/" + id,
                data: JSON.stringify(data)
            });
        break;
    }
});
~~~

## Fehlerbehandlung {#errorhandling}

Der Server kann den Scheduler über eine fehlgeschlagene Aktion informieren, indem er eine Antwort mit "action":"error" zurückgibt:

~~~js
{"action":"error"}
~~~

Diese Antwort kann clientseitig mit dataProcessor behandelt werden:

~~~js
const dp = scheduler.createDataProcessor("apiUrl");
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action === "error"){
        // Fehlerbehandlung hier
    }
});
~~~

Das Antwortobjekt kann zusätzliche Eigenschaften enthalten, die über das Argument `response` im onAfterUpdate-Handler zugänglich sind.

Wenn der Server einen Fehler zurückgibt, die Änderungen aber clientseitig gespeichert wurden, empfiehlt es sich, die Clientdaten zu löschen und die korrekten Daten vom Server neu zu laden:

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action === "error"){
        scheduler.clearAll();
        scheduler.load(url);
    }
});
~~~

Wenn Sie nicht alle Daten neu laden möchten, können Sie ein einzelnes Ereignis nur clientseitig mit dem **silent**-Parameter der Methode [deleteEvent](api/method/deleteevent.md) entfernen:

~~~js
// Entfernt das angegebene Ereignis nur clientseitig, ohne Serveraufruf
scheduler.deleteEvent(id, true); 
~~~

## XSS-, CSRF- und SQL-Injection-Angriffe {#xsscsrfandsqlinjectionattacks}

Beachten Sie, dass Scheduler selbst keinen Schutz gegen Bedrohungen wie SQL-Injections, XSS oder CSRF-Angriffe bietet.

Die Sicherheit Ihrer Anwendung liegt in der Verantwortung der Backend-Entwickler.

Weitere Informationen zu möglichen Schwachstellen und wie Sie die Sicherheit Ihrer Anwendung verbessern können, finden Sie im Artikel [Anwendungssicherheit](guides/app-security.md).
