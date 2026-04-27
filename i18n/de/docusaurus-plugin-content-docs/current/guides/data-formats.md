---
title: "Beispiele für Datenformate"
sidebar_label: "Beispiele für Datenformate"
---

# Beispiele für Datenformate

In diesem Artikel finden Sie Beispiele für alle unterstützten Datenformate.


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
  <td>April 11, 2027 14:00</td>
  <td>April 11, 2027 17:00</td>
  </tr>
  <tr>
  <td>Conference</td>
  <td>April 15, 2027 12:00</td>
  <td>April 18, 2027 19:00</td>
  </tr>
  <tr>
  <td>Interview</td>
  <td>April 24, 2027 09:00</td>
  <td>April 24, 2027 10:00</td>
  </tr>
  </tbody>
</table>


## JSON

~~~js
[
    { 
        "id":"1", 
        "text":"Meeting", 
        "start_date":"2027-04-11 14:00",
        "end_date":"2027-04-11 17:00"
    },
    {
        "id":"2", 
        "text":"Conference", 
        "start_date":"2027-04-15 12:00",
        "end_date":"2027-04-18 19:00"
    },
    {
        "id":"3", 
        "text":"Interview", 
        "start_date":"2027-04-24 09:00", 
        "end_date":"2027-04-24 10:00"
    }
]
~~~

## JSON mit Sammlungen

Dieses Format ist nützlich, wenn Sie zusätzliche Datensammlungen übermitteln müssen. 
Zum Beispiel ist es nützlich, wenn Sie die [Timeline- und Units-Sektionen vom Server laden möchten](guides/loading-data.md#collections):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 00:00:00",
          "end_date":"2027-03-04 00:00:00",
          "text":"dblclick me!",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2027-03-09 00:00:00",
          "end_date":"2027-03-11 00:00:00",
          "text":"and me!",
          "type":"2"
      },
      {
          "id":"3",
          "start_date":"2027-03-16 00:00:00",
          "end_date":"2027-03-18 00:00:00",
          "text":"and me too!",
          "type":"3"
      },
      { 
          "id":"4",
          "start_date":"2027-03-02 08:00:00",
          "end_date":"2027-03-02 14:10:00",
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

## XML

~~~xml
<data>
    <event id="1">
        <text><![CDATA[Meeting]]></text>
        <start_date>04/11/2027 14:00</start_date>
        <end_date>04/11/2027 17:00</end_date>
    </event>
    <event id="2">
        <text><![CDATA[Conference]]></text>
        <start_date>04/15/2027 12:00</start_date>
        <end_date>04/18/2027 19:00</end_date>
    </event>
    <event id="3">
        <text><![CDATA[Interview]]></text>
        <start_date>04/24/2027 09:00</start_date>
        <end_date>04/24/2027 10:00</end_date>
    </event>
</data>
~~~


## iCal

~~~html
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//dhtmlXScheduler//NONSGML v2.2//EN
DESCRIPTION:
BEGIN:VEVENT
DTSTART:20270411T140000
DTEND:20270411T170000
SUMMARY:Meeting
END:VEVENT
BEGIN:VEVENT
DTSTART:20270415
DTEND:20270418
SUMMARY:Conference
END:VEVENT
BEGIN:VEVENT
DTSTART:20270424T090000
DTEND:20270424T100000
SUMMARY:Interview
END:VEVENT
END:VCALENDAR 
~~~


## Daten mit benutzerdefinierten Eigenschaften

Betrachten wir ein Beispiel, bei dem das anfängliche Set (oben [siehe](guides/data-formats.md)) zwei benutzerdefinierte Eigenschaften hat: 

- **room** - die Nummer des Raums, in dem die Veranstaltung stattfinden wird.
- **holder**  - der Name der für die Veranstaltung Verantwortlichen.


#### JSON
~~~js
[
    {
        "id":"1", 
        "text":"Meeting", 
        "start_date":"2027-04-11 14:00",
        "end_date":"2027-04-11 17:00"
        "room":327,
        "holder":"James"
    }
]
~~~

Hinweis, dass alle Eigenschaften, die Ihre Datenquelle zurückgibt, zu Ereignisobjekten hinzugefügt werden und der [Client-seitigen API](guides/event-object-operations.md) zur Verfügung stehen wird.

Beispielsweise:

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
        <start_date>04/11/2027 14:00</start_date>
        <end_date>04/11/2027 17:00</end_date>
        <room>327</room>
        <holder><![CDATA[James]]></holder>
    </event>
</data>
~~~

#### iCal

Hinweis: Auf der Client-Seite werden die Namen der Eigenschaften (mit Ausnahme von DTSTART, DTEND und SUMMARY) von Groß- in Kleinbuchstaben umgewandelt: ROOM -> room, HOLDER -> holder.

~~~html
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//dhtmlXScheduler//NONSGML v2.2//EN
DESCRIPTION:
BEGIN:VEVENT
DTSTART:20270411T140000
DTEND:20270411T170000
SUMMARY:Meeting
ROOM:327
HOLDER:James
END:VEVENT
END:VCALENDAR 
~~~