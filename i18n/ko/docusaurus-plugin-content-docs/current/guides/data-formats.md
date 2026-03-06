---
title: "데이터 포맷 예시"
sidebar_label: "데이터 포맷 예시"
---

# 데이터 포맷 예시 

이 문서에서는 지원되는 모든 데이터 포맷의 예시를 제공합니다.


<table class="list" cellspacing="0" cellpadding="5" border="0">
  <caption class="caption">
  <strong>표 1 </strong>
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
  <td>Meeting</td>
  <td>2019년 4월 11일 14:00</td>
  <td>2019년 4월 11일 17:00</td>
  </tr>
  <tr>
  <td>Conference</td>
  <td>2019년 4월 15일 12:00</td>
  <td>2019년 4월 18일 19:00</td>
  </tr>
  <tr>
  <td>Interview</td>
  <td>2019년 4월 24일 09:00</td>
  <td>2019년 4월 24일 10:00</td>
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

## 컬렉션이 포함된 JSON {#json-with-collections}

이 포맷은 추가 데이터 컬렉션을 포함해야 할 때 유용합니다. 
예를 들어, [서버에서 Timeline과 Units 섹션을 로드](guides/loading-data.md#collections)할 때 사용할 수 있습니다.

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

## 사용자 정의 속성이 포함된 데이터 {#datawithcustomproperties}

여기서는 기본 데이터 셋([위](guides/data-formats.md) 참고)에 두 개의 사용자 정의 속성이 추가된 예시를 보여줍니다:

- **room** - 이벤트가 열리는 방 번호입니다.
- **holder**  - 이벤트 담당자의 이름입니다.


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

데이터 소스에서 반환하는 모든 속성은 이벤트 객체에 추가되며, [클라이언트 사이드 API](guides/event-object-operations.md)를 통해 접근할 수 있습니다.

예시:

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
클라이언트 사이드에서는 속성명(DTSTART, DTEND, SUMMARY 제외)이 대문자에서 소문자로 변환된다는 점에 유의하세요: ROOM → room, HOLDER → holder.

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
