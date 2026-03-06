---
sidebar_label: "changeEventId"
title: "changeEventId method"
description: "aktualisiert die ID eines Events"
---

# changeEventId

### Description

@short: Aktualisiert die ID eines Events

@signature: changeEventId: (id: string, new_id: string) =\> void

### Parameters

- `id` - (required) *string* - die aktuelle ID des Events
- `new_id` - (required) *string* - die neue ID des Events

### Example

~~~jsx
scheduler.changeEventId("ev15", "ev25"); // aktualisiert die Event-ID von "ev15" auf "ev25"
~~~

### Details

Jedes im Scheduler angezeigte Event besitzt eine eindeutige ID.

Wenn ein neues Event über die UI erstellt wird, weist die Scheduler-Bibliothek diesem eine temporäre ID zu.

Sobald das Event in der Datenbank gespeichert wird, erhält es eine permanente ID, die von der Datenbank generiert wird. 
Typischerweise gibt Ihr Backend diese Datenbank-ID an die Client-Seite zurück, wo der Scheduler sie übernimmt und für zukünftige Updates des Events verwendet.

Wenn Sie das [dataProcessor-Modul verwenden und den Tutorials zur Server-Integration folgen](guides/server-integration.md#technique), wird dieser Vorgang automatisch abgewickelt.
Wenn Sie jedoch Updates manuell an das Backend senden, müssen Sie die Event-ID manuell mit dieser Methode aktualisieren.
Zum Beispiel:

~~~js
// ein neues Event erstellen
jQuery.ajax({
    type:"POST",
    url:"/myApi/event",
    data:{ data : event },
    complete:function(result){
        // Backend-Antwort nach dem Einfügen eines neuen Events in die Datenbank
        scheduler.changeEventId(event.id, result.databaseId);
    }
});
~~~

Beachten Sie, dass diese Methode das Event [onEventIdChange](api/event/oneventidchange.md) auslöst.

### Related API
- [onEventIdChange](api/event/oneventidchange.md)

### Related Guides
- [Serverseitige Integration](guides/server-integration.md#technique)
