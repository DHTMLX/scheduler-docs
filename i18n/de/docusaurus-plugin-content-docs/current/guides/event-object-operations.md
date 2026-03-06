---
title: "Event-Objekt-Operationen"
sidebar_label: "Event-Objekt-Operationen"
---

# Event-Objekt-Operationen

## Abrufen des Event-Objekts

Um das Event-Objekt zu erhalten, verwenden Sie die Methode [getEvent](api/method/getevent.md):

~~~js
scheduler.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
]);
... 
var eventObj = scheduler.getEvent(1);
//->{id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"}
~~~

## Events aus einem bestimmten Zeitraum abrufen

Um eine Liste von Events zu erhalten, die in einem bestimmten Zeitraum stattfinden, verwenden Sie die Methode [getEvents](api/method/getevents.md):

~~~js
var evs = scheduler.getEvents(new Date(2019,1,10),new Date(2019,2,10)); 
//wobei evs ein Array von Event-Objekten ist
~~~

## Alle Events des Schedulers abrufen

Um alle aktuell im Scheduler geladenen Events zu bekommen, rufen Sie die Methode [getEvents](api/method/getevents.md) ohne Parameter wie folgt auf:

~~~js
var evs = scheduler.getEvents();
// gibt alle Events als Array von Objekten zurück
~~~

## Das nächste Event ab aktuellem Datum abrufen

~~~js
var evs = scheduler.getEvents(new Date(), new Date(9999,1,1));    
//evs - Liste aller bevorstehenden Events
evs.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
//evs[0] - das nächste bevorstehende Event
~~~

## Die ID des Events abrufen

Um die ID eines Events anhand eines seiner Eigenschaften zu finden, können Sie wie folgt vorgehen:

~~~js title="Getting the event's id by the event's text"
scheduler.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
]);
...

var evs = scheduler.getEvents(); //holt alle Events aus dem Scheduler
for(var i="0;i<evs.length;" i++){  //durchläuft alle Events, um das Ziel-Event zu finden
    if (evs[i].text == "Event 2") 
        var eventId = evs[i].id;// -> 2
};
~~~

Wenn die ungefähre Zeit des Events bekannt ist, empfiehlt es sich, den Zeitraum beim Abrufen der Events einzuschränken, um die Performance zu verbessern:

~~~js
var evs = scheduler.getEvents(new Date(2019,05,01),new Date(2019,05,10)); 
for(var i="0;i<evs.length;" i++){  
    if (evs[i].text == "Event 2") 
        var eventId = evs[i].id;// -> 2
};
~~~

## Die ID eines Events ändern

Um die ID eines Events zu aktualisieren, kann die Methode [changeEventId](api/method/changeeventid.md) wie folgt verwendet werden:

~~~js
scheduler.changeEventId("ev15", "ev25"); //ändert die Event-ID von "ev15" -> "ev25"
~~~

## Das Label der Lightbox-Option als Event-Text setzen

Standardmäßig wird der Text eines Scheduler-Events aus dem zugeordneten Textfeld in der Lightbox übernommen.

![default_event_text](/img/default_event_text.png)

Es ist auch möglich, dieses Standardverhalten zu überschreiben und das Label der ausgewählten Option in der Combobox als Event-Text zu verwenden.

![option_event_text](/img/option_event_text.png)

Der Event-Text wird durch eine der folgenden Templates bestimmt: [event_text](api/template/event_text.md) oder [event_bar_text](api/template/event_bar_text.md), abhängig vom Ansichts-Typ. Um zu steuern, wie der Text zu einem Event hinzugefügt wird, sollten Sie das entsprechende Template anpassen.

~~~js
scheduler.config.lightbox.sections = [
    { name:"type", height:21, inputWidth:400, map_to:"type", type:"select", 
        options:scheduler.serverList("options", [
            {key:1, label:"Simple"},
            {key:2, label:"Complex"},
            {key:3, label:"Unknown"}
        ]
    )},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.templates.event_text = scheduler.templates.event_bar_text = function(start, end, event){
    var options = scheduler.serverList("options");

    for(var i = 0; i < options.length; i++){
        if(options[i].key == event.type){
            return options[i].label;
        }
    }
    
    return "";
};
~~~

Folgende Punkte sind beim obigen Code zu beachten:

- Die Methode [serverList](api/method/serverlist.md) stellt die Optionen für die Combobox bereit und ruft sie auch innerhalb des Templates ab. Sie kann ebenfalls verwendet werden, um Optionen zusammen mit anderen Daten über einen Connector zu laden und diese dynamisch zu aktualisieren.

- Das Template führt eine lineare Suche durch, um das ausgewählte Element zu finden. Bei einer großen Anzahl von Events oder Optionen kann dies die Performance beeinflussen, da diese Templates häufig aufgerufen werden. Um die Effizienz zu steigern, empfiehlt es sich, einen Hash für schnellere Suchvorgänge zu verwenden, anstatt das Array jedes Mal zu durchlaufen.

- Auf der Client-Seite muss die vollständige Liste der Optionen vorhanden sein, damit diese korrekt angezeigt werden können. Ist dies nicht der Fall, müssen die Optionen manuell geladen werden, zum Beispiel bei Verwendung einer Autocomplete-Suche, die Optionen dynamisch abruft.
