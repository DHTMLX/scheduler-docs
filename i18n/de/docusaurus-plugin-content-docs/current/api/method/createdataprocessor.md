---
sidebar_label: "createDataProcessor"
title: "createDataProcessor method"
description: "erzeugt eine neue dataProcessor-Instanz und verknüpft sie mit dem Scheduler"
---

# createDataProcessor

### Description

@short: Erzeugt eine neue dataProcessor-Instanz und verknüpft sie mit dem Scheduler

@signature: createDataProcessor: (config: any) =\> any

### Parameters

- `config` - (required) *string | object* - ein Konfigurationsobjekt für den dataProcessor

### Returns
- ` dataProcessor` - (object) - die resultierende dataProcessor-Instanz

### Example

~~~jsx
var dp = scheduler.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

### Details

Diese Methode akzeptiert einen der folgenden Parametertypen:

1\. Ein Objekt mit `{url:string, mode:string}`, das eine vordefinierte Art angibt, Daten zu senden

~~~js
var dp = scheduler.createDataProcessor({
   url: "/api",
   mode: "REST"
});
~~~

wobei:

- url - der Server-Endpunkt
- mode - die Methode zum Senden von Daten: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2\. Alternativ kann ein benutzerdefiniertes Router-Objekt übergeben werden:

~~~js
var dp = scheduler.createDataProcessor(router);
~~~

Hier kann der Router eine Funktion sein:

~~~js
// entity - "event"
// action - "create"|"update"|"delete"
// data - ein Objekt mit Event-Details
// id – die ID des verarbeiteten Objekts (Event)
var dp = scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
               return scheduler.ajax.post(
                server + "/" + entity,
                data
               );
        break;
        case "update":
               return scheduler.ajax.put(
                server + "/" + entity + "/" + id,
                data
            );
        break;
        case "delete":
               return scheduler.ajax.del(
                server + "/" + entity + "/" + id
               );
        break;
       }
});
~~~

oder ein Objekt, das folgendermaßen aufgebaut ist:

~~~js
var dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

Jede Funktion im Router-Objekt sollte entweder ein Promise oder ein Daten-Antwortobjekt zurückgeben. Dies ermöglicht es dem dataProcessor, die Datenbank-ID zu aktualisieren und das **onAfterUpdate**-Event zu verbinden.

~~~js
router = function(entity, action, data, id) {
    return new scheduler.Promise(function(resolve, reject) {
        // … einige Logik
        return resolve({tid: databaseId});
     });
}
~~~

Diese Flexibilität erlaubt es dem DataProcessor, Daten in localStorage oder anderen Speichertypen zu sichern, die nicht an eine bestimmte URL gebunden sind, oder wenn verschiedene Server (URLs) für Erstellung und Löschung zuständig sind.

### Related Guides
- [Serverseitige Integration](guides/server-integration.md)
