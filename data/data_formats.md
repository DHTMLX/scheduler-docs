
Examples of Data Formats 
==============
In this article you will find examples for all supported data formats.

<br>

<table class="list" cellspacing="0" cellpadding="5" border="0">
	<caption class="caption">
		<strong>Table 1 </strong>
		Demo events
	</caption>
	<thead>
	<tr>
		<th align="left">
			Text
		</th>
		<th align="left">
			Start Date
		</th>
		<th align="left">
			End Date
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>Meeting</td>
		<td>April 11, 2013 14:00</td>
		<td>April 11, 2013 17:00</td>
	</tr>
	<tr>
		<td>Conference</td>
		<td>April 15, 2013 12:00</td>
		<td>April 18, 2013 19:00</td>
	</tr>
	<tr>
		<td>Interview </td>
		<td>April 24, 2013 09:00</td>
		<td>April 24, 2013 10:00</td>
	</tr>
	</tbody>
</table>



JSON
-------------------------

~~~js
[
{id:1, text:"Meeting",   start_date:"04/11/2013 14:00",end_date:"04/11/2013 17:00"},
{id:2, text:"Conference",start_date:"04/15/2013 12:00",end_date:"04/18/2013 19:00"},
{id:3, text:"Interview", start_date:"04/24/2013 09:00",end_date:"04/24/2013 10:00"}
]
~~~

XML
---------------------------------

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

iCal
---------------------
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

Data with Custom Properties
-------------------------------
Let's consider an example when the initial set (presented <a href="data_formats.md">above</a>) has 2 custom  properties: 

- **room** - the number of the room that the event will take place in.
- **holder**  - the name of the person responsible for the event.


####JSON
~~~js
[{
	id:1,
    text:"Meeting",
    start_date:"04/11/2013 14:00", 
    end_date:"04/11/2013 17:00",
    room:327,
    holder:"James"
}]
~~~

####XML

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

####iCal
Note, on the client side the names of properties (except for DTSTART, DTEND and SUMMARY) will be transformed  from  the upper  to lower case: ROOM -> room, HOLDER -> holder.

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
