---
sidebar_label: "ajax"
title: "ajax config"
description: "scheduler ajax Modul"
---

# ajax

### Description

@short: Scheduler ajax Modul

@signature: ajax: any

### Example

~~~jsx
// Angenommen, die Antwort ist wie folgt
{status: "ok", data: "value", data2: "value2"}


var xhr = scheduler.ajax;

// HTTP GET
xhr.get("server.php").then(function(response) {
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // Antwort ist ok
    }
});

// HTTP POST
xhr.post({
    url:"server.php", 
    data: {
           paramName: "paramValue"
    }
}).then(function(response){
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // Antwort ist ok
    }
});
~~~

### Details

## API Referenz

Alle Methoden akzeptieren Parameter in einem von zwei Formaten:

1) Ein RequestConfig Objekt, das die Anfrageeinstellungen enthält und wie folgt aussieht:

~~~js
{
    url: string,
      method: "PUT|GET|POST|DELETE",
      data: string | object,
      async: true|false,
      callback: function,
      headers: object
}
~~~

Das bedeuten die einzelnen Eigenschaften:

- url - die Server-URL
- method - optional, die zu verwendende HTTP-Methode, standardmäßig "GET"
- data - optional, die mit der Anfrage gesendeten Daten; POST und PUT akzeptieren entweder einen String oder ein Objekt
- async - optional, ob die Anfrage asynchron ist, standardmäßig true
- callback - optional, eine Funktion, die aufgerufen wird, sobald die Antwort eingegangen ist
- headers - optional, ein Objekt mit Headern als "key":"value" Paaren, die in der Anfrage enthalten sein sollen

oder:

2) Drei separate Parameter (außer bei der **query()** Methode, die nur das *RequestConfig* Objekt akzeptiert):

- url - die Server-URL
- data - optional, Daten, die mit der Anfrage gesendet werden
- callback - optional, Funktion, die nach Erhalt der Antwort aufgerufen wird

Nachfolgend die Liste der im ajax Modul API verfügbaren Methoden:

#### Callback Optionen {#callback-options}

Alle Methoden unterstützen sowohl callbacks als auch [promises](#callback-options) zur Behandlung von Antworten.

Ein ajax Promise wird mit einem abgeschlossenen XmlHttpRequest Objekt aufgelöst:

~~~js
scheduler.ajax.post({ 
    url:"some.php",
    data: {
           paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});
~~~

Zur Abwärtskompatibilität erhält der callback die Antwort in einem etwas anderen Format:

~~~js
scheduler.ajax.post({ 
    url:"some.php",
    data: {
           paramName: "paramValue"
    },
    callback: function(result){
           var response = result.xmlDoc;
       
           alert(response.responseText);
    }
});
~~~


#### query

Dies ist die allgemeine Methode zum Senden von Anfragen. Sie kann jede Anfragetyp verarbeiten, indem die Methode in den Parametern angegeben wird.

~~~js
scheduler.ajax.query({ 
    url:"some.php",
    method:"POST",
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});

~~~

#### get

Sendet eine GET-Anfrage.

~~~js
scheduler.ajax.get("some.php", function(){
    // Ihr Code hier
});
// oder
scheduler.ajax.get({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### put

Sendet eine PUT-Anfrage.

~~~js
scheduler.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // Ihr Code hier
});
// oder
scheduler.ajax.put({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" },
    data: {}
});
~~~

#### del

Sendet eine DELETE-Anfrage.

~~~js
scheduler.ajax.del("server.php", function(){
    // Ihr Code hier
});
// oder
scheduler.ajax.del({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### post

Sendet eine POST-Anfrage.

~~~js
scheduler.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // Ihr Code hier
});
// oder
scheduler.ajax.post({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" },
    data: {}
});
~~~

## Daten mit POST/PUT Methoden senden

Wenn Sie **post** oder **put** verwenden, können Sie anstelle eines Strings ein Objekt als data übergeben. Das ajax Modul serialisiert das Objekt automatisch. 
Einfache Objekte werden als Formulardaten serialisiert (z.B. &param=value), während verschachtelte Strukturen mit JSON.stringify() serialisiert werden.

Beispielsweise wird das Objekt:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

in einen String wie `id=1&text=My%20Task&users=%5B1%2C2%2C3%5D` umgewandelt.

<h3 id="promises">Promises</h3>

dhtmlxScheduler unterstützt promises (einschließlich IE8+). Intern wird die [Bluebird](https://github.com/petkaantonov/bluebird) Bibliothek für das Promise-Handling verwendet. 
Um ein Promise zu erstellen, verwenden Sie:

~~~js
var promise = new scheduler.Promise(function(resolve, reject) {...});
~~~

Die Promise-Implementierung ist innerhalb von Scheduler scoped, also nicht global.

Das AJAX Modul gibt promises zurück, sodass Sie die Promise-Syntax anstelle von callbacks verwenden können. Zum Beispiel, anstatt

~~~js
scheduler.ajax.post(url, params, callback);
~~~

können Sie schreiben

~~~js
scheduler.ajax.post(url, params).then(function(){…});
~~~

Callbacks und promises können zusammen verwendet werden.

Hier ein Beispiel, um mehrere Anfragen gleichzeitig zu senden und dann die Daten neu zu laden, sobald alle abgeschlossen sind:

~~~js 
scheduler.Promise.all([
      scheduler.ajax.post({url: "api/event", data: event1}),
      scheduler.ajax.post({url: "api/event", data: event2}),
      scheduler.ajax.post({url: "api/event", data: event3})
]).then(function(){
       scheduler.clearAll();
       scheduler.load("/api");
});
~~~

### Change log
- added in version 6.0
