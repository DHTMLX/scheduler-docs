---
title: "数据格式示例"
sidebar_label: "数据格式示例"
---

# 数据格式示例

本文提供了所有支持的数据格式的示例。


<table class="list" cellspacing="0" cellpadding="5" border="0">
  <caption class="caption">
  <strong>表 1 </strong>
  演示事件
  </caption>
  <thead>
  <tr>
  <th align="left">
  文本
  </th>
  <th align="left">
  开始日期
  </th>
  <th align="left">
  结束日期
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>会议</td>
  <td>2019年4月11日 14:00</td>
  <td>2019年4月11日 17:00</td>
  </tr>
  <tr>
  <td>大会</td>
  <td>2019年4月15日 12:00</td>
  <td>2019年4月18日 19:00</td>
  </tr>
  <tr>
  <td>面试</td>
  <td>2019年4月24日 09:00</td>
  <td>2019年4月24日 10:00</td>
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

## 带集合的 JSON {#json-with-collections}

当你需要包含额外的数据集合时，这种格式非常有用。
例如，在从服务器加载时间线和单元部分时可以使用，如[从服务器加载 Timeline 和 Units 部分](guides/loading-data.md#loadingdatawithtimelineandunitssectionsfromtheserver)所述:

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

## 带自定义属性的数据 {#datawithcustomproperties}

以下是一个示例，基本数据集（见[上文](guides/data-formats.md)）中包含了两个自定义属性:

- **room** - 活动举办房间的编号。
- **holder**  - 负责该活动的人员姓名。

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

请注意，数据源返回的所有属性都会添加到事件对象中，并可通过[客户端 API](guides/event-object-operations.md)访问。

例如:

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
请注意，在客户端，属性名（除了 DTSTART、DTEND 和 SUMMARY 之外）会从大写转换为小写:ROOM 会变为 room，HOLDER 会变为 holder。

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
