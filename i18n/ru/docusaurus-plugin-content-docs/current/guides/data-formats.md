---
title: "Примеры форматов данных"
sidebar_label: "Примеры форматов данных"
---

# Примеры форматов данных

В этой статье приведены примеры всех поддерживаемых форматов данных.


<table class="list" cellspacing="0" cellpadding="5" border="0">
  <caption class="caption">
  <strong>Таблица 1 </strong>
  Демонстрационные события
  </caption>
  <thead>
  <tr>
  <th align="left">
  Текст
  </th>
  <th align="left">
  Дата начала
  </th>
  <th align="left">
  Дата окончания
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>Встреча</td>
  <td>11 апреля 2027 14:00</td>
  <td>11 апреля 2027 17:00</td>
  </tr>
  <tr>
  <td>Конференция</td>
  <td>15 апреля 2027 12:00</td>
  <td>18 апреля 2027 19:00</td>
  </tr>
  <tr>
  <td>Собеседование</td>
  <td>24 апреля 2027 09:00</td>
  <td>24 апреля 2027 10:00</td>
  </tr>
  </tbody>
</table>


## JSON {#json}

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

## JSON с коллекциями {#json-with-collections}

Этот формат будет полезен, если вам нужно передать дополнительные наборы данных. 
Например, он удобен, когда вам нужно [загрузить разделы Timeline и Units с сервера](guides/loading-data.md#collections):

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

## XML {#xml}

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

## iCal {#ical}

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

## Данные с пользовательскими свойствами {#datawithcustomproperties}

Ниже приведён пример, где к базовому набору (показанному [выше](guides/data-formats.md)) добавлены два пользовательских свойства:

- **room** - номер комнаты, в которой пройдет мероприятие.
- **holder**  - имя лица, ответственного за мероприятие.


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

Имейте в виду, что все свойства, возвращаемые вашим источником данных, будут добавлены к объектам событий и станут доступны через [client-side API](guides/event-object-operations.md).

Например:

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
Обратите внимание, что на стороне клиента имена свойств (кроме DTSTART, DTEND и SUMMARY) будут преобразованы из верхнего регистра в нижний: ROOM станет room, HOLDER - holder.

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