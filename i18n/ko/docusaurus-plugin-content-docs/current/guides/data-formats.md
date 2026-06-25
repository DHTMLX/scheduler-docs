--- 
title: "데이터 형식의 예"
sidebar_label: "데이터 형식의 예"
---

# 데이터 형식의 예

이 문서에서는 지원되는 모든 데이터 형식의 예제를 확인하실 수 있습니다.

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <caption class="caption">
  <strong>표 1</strong>
  데모 이벤트
  </caption>
  <thead>
  <tr>
  <th align="left">
  텍스트
  </th>
  <th align="left">
  시작 날짜
  </th>
  <th align="left">
  종료 날짜
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>회의</td>
  <td>April 11, 2027 14:00</td>
  <td>April 11, 2027 17:00</td>
  </tr>
  <tr>
  <td>컨퍼런스</td>
  <td>April 15, 2027 12:00</td>
  <td>April 18, 2027 19:00</td>
  </tr>
  <tr>
  <td>인터뷰</td>
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

## JSON with Collections 

This format will be useful if you need to pass some additional data collections. 
For example, it is useful when you want to [load Timeline and Units sections from the server](guides/loading-data.md#collections):

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


## Data with Custom Properties

초기 세트가 2개의 커스텀 속성을 가지고 있다고 가정해 보겠습니다(위의 [data-formats.md](guides/data-formats.md)에서 제시된).

- **room** - 이벤트가 발생하는 방의 번호.
- **holder**  - 이벤트를 담당하는 사람의 이름.


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


참고로, 모든 속성은 데이터 소스가 반환하는 모든 속성은 이벤트 객체에 추가되며 [클라이언트 측 API](guides/event-object-operations.md)에서 사용할 수 있습니다.

예를 들어:

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
참고로 클라이언트 측에서 속성 이름은 (DTSTART, DTEND 및 SUMMARY를 제외하고) 대문자에서 소문자로 변환됩니다: ROOM -> room, HOLDER -> holder.

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