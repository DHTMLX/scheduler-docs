---
title: "Beispiele für Datenformate"
sidebar_label: "Beispiele für Datenformate"
---

# Beispiele für Datenformate 

Dieser Artikel enthält Beispiele für alle unterstützten Datenformate.


<table class="list" cellspacing="0" cellpadding="5" border="0">
  <caption class="caption">
  <strong>Tabelle 1 </strong>
  Demo-Ereignisse
  </caption>
  <thead>
  <tr>
  <th align="left">
  Text
  </th>
  <th align="left">
  Startdatum
  </th>
  <th align="left">
  Enddatum
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>Meeting</td>
  <td>11. April 2019 14:00</td>
  <td>11. April 2019 17:00</td>
  </tr>
  <tr>
  <td>Conference</td>
  <td>15. April 2019 12:00</td>
  <td>18. April 2019 19:00</td>
  </tr>
  <tr>
  <td>Interview</td>
  <td>24. April 2019 09:00</td>
  <td>24. April 2019 10:00</td>
  </tr>
  </tbody>
</table>


## JSON {#json}

~~~js
[
    { 
        "id":"1", 
        "text":"Meeting", 
        "start_date":"2019-04-11 14:00",
        "end_date":"2019-04-11 17:00"
    },
    {
        "id":"2", 
        "text":"Conference", 
        "start_date":"2019-04-15 12:00",
        "end_date":"2019-04-18 19:00"
    },
    {
        "id":"3", 
        "text":"Interview", 
        "start_date":"2019-04-24 09:00", 
        "end_date":"2019-04-24 10:00"
    }
]
~~~

## JSON mit Collections {#json-with-collections}

Dieses Format ist nützlich, wenn zusätzliche Datensammlungen eingebunden werden müssen. 
Zum Beispiel ist es hilfreich beim Laden von Timeline- und Units-Abschnitten vom Server, wie in [loading Timeline and Units sections from the server](guides/loading-data.md#loadingdatawithtimelineandunitssectionsfromtheserver) beschrieben:

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 00:00:00",
          "end_date":"2019-03-04 00:00:00",
          "text":"dblclick me!",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2019-03-09 00:00:00",
          "end_date":"2019-03-11 00:00:00",
          "text":"and me!",
          "type":"2"
      },
      {
          "id":"3",
          "start_date":"2019-03-16 00:00:00",
          "end_date":"2019-03-18 00:00:00",
          "text":"and me too!",
          "type":"3"
      },
      { 
          "id":"4",
          "start_date":"2019-03-02 08:00:00",
          "end_date":"2019-03-02 14:10:00",
          "text":"Type 2 event",
          "type":"2"
      }
   ], 
   "collections": {                            /*!*/
      "sections":[                            /*!*/
         {"value":"1","label":"Simple"},    /*!*/
         {"value":"2","label":"Complex"},    /*!*/
         {"value":"3","label":"Unknown"}    /*!*/
      ]                                        /*!*/
   }                                        /*!*/
}
~~~

## XML {#xml}

~~~xml
<data>
    <event id="1">
        <text><![CDATA[Meeting]]></text>
        <start_date>04/11/2013 14:00</start_date>
        <end_date>04/11/2013 17:00</end_date>
    </event>
    <event id="2">
        <text><![CDATA[Conference]]></text>
        <start_date>04/15/2013 12:00</start_date>
        <end_date>04/18/2013 19:00</end_date>
    </event>
    <event id="3">
        <text><![CDATA[Interview]]></text>
        <start_date>04/24/2013 09:00</start_date>
        <end_date>04/24/2013 10:00</end_date>
    </event>
</data>
~~~

## iCal {#ical}

~~~html
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//dhtmlXScheduler//NONSGML v2.2//EN
DESCRIPTION:
BEGIN:VEVENT
DTSTART:20130411T140000
DTEND:20130411T170000
SUMMARY:Meeting
END:VEVENT
BEGIN:VEVENT
DTSTART:20130415
DTEND:20130418
SUMMARY:Conference
END:VEVENT
BEGIN:VEVENT
DTSTART:20130424T090000
DTEND:20130424T100000
SUMMARY:Interview
END:VEVENT
END:VCALENDAR 
~~~

## Daten mit benutzerdefinierten Eigenschaften {#datawithcustomproperties}

Hier ein Beispiel, bei dem der Basissatz ([oben](guides/data-formats.md)) um zwei benutzerdefinierte Eigenschaften erweitert wurde:

- **room** - die Raumnummer, in der das Ereignis stattfindet.
- **holder** - der Name der für das Ereignis verantwortlichen Person.


#### JSON 
~~~js
[
    {
        "id":"1", 
        "text":"Meeting", 
        "start_date":"2019-04-11 14:00",
        "end_date":"2019-04-11 17:00"
        "room":327,
        "holder":"James"
    }
]
~~~

Beachten Sie, dass alle Eigenschaften, die Ihre Datenquelle zurückgibt, zu den Ereignisobjekten hinzugefügt werden und über die [client-side API](guides/event-object-operations.md) zugänglich sind.

Beispiel:

~~~js
scheduler.templates.event_text = function(start, end, event){
   return event.holder;
};

~~~

#### XML

~~~xml
<data>
    <event id="1">
        <text><![CDATA[Meeting]]></text>
        <start_date>04/11/2013 14:00</start_date>
        <end_date>04/11/2013 17:00</end_date>
        <room>327</room>
        <holder><![CDATA[James]]></holder>
    </event>
</data>
~~~

#### iCal
Beachten Sie, dass auf der Client-Seite die Eigenschaftsnamen (außer DTSTART, DTEND und SUMMARY) von Groß- zu Kleinschreibung konvertiert werden: ROOM wird zu room, HOLDER wird zu holder.

~~~html
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//dhtmlXScheduler//NONSGML v2.2//EN
DESCRIPTION:
BEGIN:VEVENT
DTSTART:20130411T140000
DTEND:20130411T170000
SUMMARY:Meeting
ROOM:327
HOLDER:James
END:VEVENT
END:VCALENDAR 
~~~
