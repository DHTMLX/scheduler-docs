---
title: "Event-Objekt-Operationen"
sidebar_label: "Event-Objekt-Operationen"
---

# Event-Objekt-Operationen

## Das Event-Objekt abrufen

Um das Event-Objekt zu erhalten, verwenden Sie die [getEvent](api/method/getevent.md) Methode:

~~~js
scheduler.parse([
   {id:1, start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2027-06-09 6:00", end_date:"2027-06-09 8:00", text:"Event 2"}
]);
... 
const eventObj = scheduler.getEvent(1);
//->{id:1, start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"}
~~~

## Ereignisse aus dem angegebenen Zeitraum abrufen

Um eine Sammlung von Ereignissen zu erhalten, die innerhalb des angegebenen Zeitraums auftreten, verwenden Sie die [getEvents](api/method/getevents.md) Methode:

~~~js
const evs = scheduler.getEvents(new Date(2027,1,10),new Date(2027,2,10)); 
//where evs is an array of events' objects
~~~

## Alle Ereignisse des Schedulers abrufen

Um alle in den Scheduler geladenen Ereignisse zu erhalten, rufen Sie die [getEvents](api/method/getevents.md) Methode ohne Parameter wie folgt auf:

~~~js
const evs = scheduler.getEvents();
// returns all events as an array of objects
~~~

## Nächstes Ereignis ab dem aktuellen Datum abrufen

~~~js
const evs = scheduler.getEvents(new Date(), new Date(9999,1,1));    
//evs - Liste aller bevorstehenden Ereignisse
evs.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
//evs[0] - nächstes bevorstehendes Ereignis
~~~

## Die ID des Ereignisses erhalten

Um die ID des Ereignisses anhand des Wertes einer der Eigenschaften des Ereignisses zu erhalten, verwenden Sie die folgende Vorgehensweise:

Beispiel: Die ID des Ereignisses anhand des Texts des Ereignisses erhalten.
~~~js
scheduler.parse([
   {id:1, start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2027-06-09 6:00", end_date:"2027-06-09 8:00", text:"Event 2"}
]);
...

const evs = scheduler.getEvents(); //gets all events of the scheduler
for(let i = 0; i < evs.length; i++){  //geht alle Ereignisse durch, um das Gesuchte zu finden
    if (evs[i].text == "Event 2") 
        const eventId = evs[i].id;// -> 2
};
~~~

 Wenn Sie eine ungefähre Zeit kennen, zu der das benötigte Ereignis auftritt, ist es besser, die zurückgegebene Sammlung von Ereignissen zu begrenzen, um die Geschwindigkeit der Anwendung zu erhöhen:

~~~js
const evs = scheduler.getEvents(new Date(2027,05,01),new Date(2027,05,10)); 
for(let i = 0; i < evs.length; i++){  
    if (evs[i].text == "Event 2") 
        const eventId = evs[i].id;// -> 2
};
~~~


## Die ID des Ereignisses ändern

Um die aktuelle ID eines Ereignisses zu ändern, verwenden Sie die [changeEventId](api/method/changeeventid.md) Methode wie folgt:

~~~js
scheduler.changeEventId("ev15", "ev25"); //ändert die Ereignis-ID von "ev15" nach "ev25"
~~~


## Die Beschriftung der Lightbox-Option als Text des Ereignisses festlegen

Standardmäßig wird der Text eines Scheduler-Ereignisses über das im Lightbox-Feld zugeordnete Textfeld gesetzt. 

![default_event_text](/img/default_event_text.png)

Es ist auch möglich, das Standardverhalten neu zu definieren und die Beschriftung der im Kombinationsfeld ausgewählten Option als Text des Ereignisses zu verwenden. 

![option_event_text](/img/option_event_text.png)

Der Text eines Ereignisses wird durch eine der folgenden Vorlagen festgelegt: [event_text](api/template/event_text.md) oder [event_bar_text](api/template/event_bar_text.md), abhängig vom Typ der Ansicht. Um also das Schema zum Hinzufügen von Text zu einem Ereignis zu ändern, sollten Sie die entsprechende Vorlage neu definieren.

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
    const options = scheduler.serverList("options");

    for(let i = 0; i < options.length; i++){
        if(options[i].key == event.type){
            return options[i].label;
        }
    }
    
    return "";
};
~~~

Es gibt mehrere Hinweise zum obigen Code:

- Die [serverList](api/method/serverlist.md)-Methode wird verwendet, um Optionen für das Combobox bereitzustellen und sie innerhalb der Vorlage abzurufen. Sie können Optionen zusammen mit Ereignisdaten über JSON-Sammlungen laden (siehe [Data formats](guides/data-formats.md#json-with-collections)) und sie später mit [updateCollection](api/method/updatecollection.md) aktualisieren.

- Innerhalb der Vorlage gibt es eine lineare Suche nach einem ausgewählten Element. In einigen Fällen, wenn Sie viele Ereignisse/Optionen haben, kann dies die Leistung spürbar beeinflussen, da diese Vorlagen recht häufig aufgerufen werden können. Um dieses Problem zu lösen, können Sie eine Hash-Tabelle für eine schnelle Suche erstellen statt ständig ein Array zu durchlaufen.

- Die Client-Seite sollte die vollständige Liste der Optionen haben, um sie anzuzeigen. Andernfalls müssen Sie die Optionen manuell laden, z. B. wenn Sie die Autocomplete-Suchfunktion verwenden, die die erforderlichen Optionen dynamisch lädt.