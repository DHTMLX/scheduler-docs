Loading Data
===============================

dhtmlxScheduler can load data of 3 formats which are:

1. JSON;
2. XML;
3. ICal.

data_formats.md


Loading data from an inline dataset
--------------------------------------
To load data from an inline dataset, use the api/scheduler_parse.md method:


~~~js
scheduler.init('scheduler_here',new Date(2009,10,1),"month");
...
scheduler.parse([
	{text:"Meeting",    start_date:"2019-04-11 14:00", end_date:"2019-04-11 17:00"},
	{text:"Conference", start_date:"2019-04-15 12:00", end_date:"2019-04-18 19:00"},
	{text:"Interview",  start_date:"2019-04-24 09:00", end_date:"2019-04-24 10:00"}
],"json");

~~~


{{sample
	02_customization/24_cascade_event_display.html
}}


Loading data from a data file
-----------------------------------------
To load data from a file, use the api/scheduler_load.md method:

~~~js
scheduler.init('scheduler_here',new Date(2018,10,1),"month");
...
scheduler.load("data.json"); //loading data from a file
~~~

{{sample
	01_initialization_loading/01_basic_init.html
}}


Loading data from a database
-------------------------------------

There are two ways to load data from a database. In both cases, you need to deal with both the client and the server side.

1) The first way includes the usage of REST API for communication with server.

- The server-side implementation depends on the framework you want to use. 
For example, in case of Node.js we should add a server route for the URL to which Scheduler will send an AJAX request for data.

It will generate the corresponding response in JSON format. 

~~~js
app.get('/data', function(req, res){
	db.event.find().toArray(function(err, data){
		//set id property for all records
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;
		
		//output response
		res.send(data);
	});
});
~~~

- On the client side we will use the api/scheduler_load.md method and specify the necessary URL where an AJAX request for Scheduler data will be sent:

{{snippet
Loading from a database. Client-side code
}}
~~~js
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("apiUrl");
~~~

{{note
The detailed information on Scheduler server-side integration using REST API is given in the article server_integration.md.
}}

2) The second way presupposes loading data from database table(s) using [PHP Connector](https://docs.dhtmlx.com/connector__php__index.html).

- On the server-side, realize the server script that returns data in the XML or JSON format:
        
{{snippet
Static loading from db. Server-side code
}}
~~~php
include ('dhtmlxConnector/codebase/scheduler_connector.php');
 
$res=mysql_connect("localhost","root","");
mysql_select_db("sampleDB");
 
$calendar = new SchedulerConnector($res);
$calendar->render_table("events","id","event_start,event_end,text","type");
~~~

- On the client side, use the api/scheduler_load.md method where specify the path to the server-side script:
        
{{snippet
Static loading from db. Client-side code
}}
~~~js
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("events.php");
~~~


{{note
See the detailed information in the howtostart_connector.md guide.
}}

Loading data from multiple sources
-----------------------------------
To load data from multiple sources, use a special extension  - **multisource**:

~~~js
scheduler.plugins({
   multisource: true
});
~~~

{{note
Multiple sources can be used for both static and dynamic loading
}}

Include the aforementioned file on the page and use the same api/scheduler_load.md method as in:

~~~js
scheduler.load(["first/source/some","second/source/other"]);
~~~

Data Properties
-------------------------

###Mandatory properties

To be correctly parsed, data items must have at least 3 properties:

- **start_date** -  (*string*) the date when an event is scheduled to begin;
- **end_date** - (*string*) the date when an event is scheduled to be completed;
- **text** - (*string*) the event text.

To be loaded from a database, data items should have one more mandatory property:

- **id** -  (*string, number*) the event id.

The default date format for JSON and XML data is **'%Y-%m-%d %H:%i'** (see the <a href="settings_format.md"> date format specification</a>).<br> To change it, use the api/scheduler_date_format_config.md configuration option.

~~~js
scheduler.config.date_format="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here', new Date(2019, 3, 18), "week");
~~~

###Custom properties

You are not limited to the mandatory properties listed above and can add any custom ones to data items. 
Extra data properties will be parsed as strings and loaded to the client side where you can use them according to your needs.

See examples of data with custom properties <a href="data_formats.md#datawithcustomproperties">here</a>.

Database Structure
-------------------

When you set up a database, the expected structure for scheduler events is the following:

- **events table** - specifies scheduler events
	- **id** - (*string/int/guid*) - the event id. Primary key, auto increment.
	- **start_date** - (*DateTime*) - the start date of event, not nullable.
	- **end_date** - (*DateTime*) - the start date of event, not nullable.
	- **text** - (*string*) - the description of a task.

If you have recurring events, you need some extra columns for them:

- **events table** - specifies scheduler events
	- **id** - (*string/int/guid*) - the event id. Primary key, auto increment.
	- **start_date** - (*DateTime*) - the start date of event, not nullable.
	- **end_date** - (*DateTime*) - the start date of event, not nullable.
	- **text** - (*string*) - the description of a task.
	- **event_pid** - (*string/int/guid*) - the reference to the parent event series id. Must be nullable or have an empty default value (empty string, numeric zero).
	- **event_length** - (*string/bigint*) - an event duration or a timestamp of modified occurrence. Must be nullable or have an empty default value (empty string, numeric zero). Max length (string values) is 10.
	- **rec_type** - (*string*) - a recurring rule. Must be nullable or have an empty string as a default value. Max length is 50.

You can define any additional columns, they can be loaded to the client and made available for the client-side API.


Dynamic loading
--------------------
 
By default, dhtmlxScheduler loads all data at once. It may become problematic when you are using big event collections. 
In such situations you may use the dynamic loading mode and load data by parts, necessary to fill the current viewable area  of the scheduler.

###Technique

To enable the dynamic loading, call the api/scheduler_setloadmode.md method:
{{snippet
Enabling the dynamic loading
}}
~~~js
scheduler.setLoadMode("month");
scheduler.load("some.php");
~~~

As a parameter the method takes the loading mode that defines the size of the data to load: *day, week, month or year.*

For example, if you set the 'week' mode, the scheduler will request data just for the current week and load remaining ones on demand.<br>

####How loading modes work

The predefined loading modes specify the interval of loading data within the set period. For example, you open the Week View in the scheduler for the following dates: from 2018-01-29 to 2018-02-05.
Depending on the chosen mode, the dynamic loading will go like this:

- for the "day" mode

~~~js
scheduler.setLoadMode("day");
~~~

Scheduler will request data by days, i.e.: from 2018-01-29 to 2018-02-05.

- for the "month" mode

~~~js
scheduler.setLoadMode("month");
~~~

Scheduler will request data by whole months, i.e.: from 2018-01-01 to 2018-03-01.

- for the "year" mode

~~~js
scheduler.setLoadMode("year");
~~~

Scheduler will request data by whole years, i.e.: from 2018-01-01 to 2019-01-01.


In any case, the requested interval won't be smaller than the rendered one.

The loading interval defines:

- the frequency of dynamic loading calls

The greater the loading interval is, the less the frequency of calls for dynamic loading will be. Scheduler keeps in memory the already loaded data portion and won't repeat a call for it.

- the duration of processing a separate request

The greater the loading interval is, the longer a request is being processed, since the more data are being loaded at once.


####Request

Generated requests look as in:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

*where DATEHERE - a valid date value in the format defined by the api/scheduler_load_date_config.md option.* <br>

If you are using <a href="https://docs.dhtmlx.com/connector__php__index.html">dhtmlxConnector</a> at the server side, 
you don't need to do any additional server-side operations to parse the data.



###Loading spinner

When you deal with a large data size, it's useful to display the loading spinner. It will show users that the app is actually doing something.

To enable the loading spinner for the scheduler, set the api/scheduler_show_loading_config.md property to *true*. 

~~~js
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2018,0,10),"month");
~~~

{{note
To change the spinner image - replace 'imgs/loading.gif' with your custom image. 
}}

Loading data with Timeline and Units sections from the server
--------------------------------------------

While loading data into [Timeline](timeline_view.md#loadingdatatotheview) and [Units](units_view.md#loadingdatatotheview) views, you need to set an array of sections that will be loaded into views. 

In order to load data containing Timeline and Units sections from the backend, you need to implement a more extended configuration: 

- during Timeline view initialization, instead of sections array you should use the api/scheduler_serverlist.md method and pass the name of a collection as an argument:

~~~js
scheduler.createTimelineView({
   ....
   y_unit: scheduler.serverList("sections"),
   ...
});
~~~

- to load data into scheduler, use the api/scheduler_load.md method:

~~~js
scheduler.load("data.json");
~~~

- while implementing scheduler data response on the backend, use the following format:

{{snippet "data.json"}}
~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2018-03-02 00:00:00",
          "end_date":"2018-03-04 00:00:00",
          "text":"dblclick me!",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2018-03-09 00:00:00",
          "end_date":"2018-03-11 00:00:00",
          "text":"and me!",
          "type":"2"
      },
      {
          "id":"3",
          "start_date":"2018-03-16 00:00:00",
          "end_date":"2018-03-18 00:00:00",
          "text":"and me too!",
          "type":"3"
      },
      { 
          "id":"4",
          "start_date":"2018-03-02 08:00:00",
          "end_date":"2018-03-02 14:10:00",
          "text":"Type 2 event",
          "type":"2"
      }
   ], 
   "collections": {
      "sections":[
         {"value":"1","label":"Simple"},
         {"value":"2","label":"Complex"},
         {"value":"3","label":"Unknown"}
      ]
   }
}
~~~

In the above example the "data" array contains calendar events, and the "collections" hash contains collections that can be referenced via the api/scheduler_serverlist.md method.


@index:
- data_formats.md



