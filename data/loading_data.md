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
	{text:"Meeting",    start_date:"04/11/2013 14:00", end_date:"04/11/2013 17:00"},
	{text:"Conference", start_date:"04/15/2013 12:00", end_date:"04/18/2013 19:00"},
	{text:"Interview",  start_date:"04/24/2013 09:00", end_date:"04/24/2013 10:00"}
],"json");

~~~


{{sample
	02_customization/24_cascade_event_display.html
}}


Loading data from a data file
-----------------------------------------
To load data from a file, use the api/scheduler_load.md method:

~~~js
scheduler.init('scheduler_here',new Date(2009,10,1),"month");
...
scheduler.load("data.xml","xml"); //loading data from a file in the XML format
~~~

{{sample
	01_initialization_loading/01_basic_init.html
}}


Loading data from a database
-------------------------------------

To load data from database table(s), use the api/scheduler_load.md method on the client side:

- **Сlient side**
        
{{snippet
Static loading from db. Client-side code
}}
~~~js
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("events.php");
~~~
- **Server-side**
        
{{snippet
Static loading from db. Server-side code
}}
~~~js
include ('dhtmlxConnector/codebase/scheduler_connector.php');
 
$res=mysql_connect("localhost","root","");
mysql_select_db("sampleDB");
 
$calendar = new SchedulerConnector($res);
$calendar->render_table("events","id","event_start,event_end,text","type");
~~~

{{note
See the detailed information in the server_integration.md guide.
}}

Loading data from multiple sources
-----------------------------------
To load data from multiple sources, use a special extension  - *'multisource'* provided in the  **ext/dhtmlxscheduler_multisource.js** file.

{{note
Multiple sources can be used for both static and dynamic loading
}}

Include the aforementioned file on the page and use the same api/scheduler_load.md method as in:

~~~js
scheduler.load(["first/source/some.xml","second/source/other.xml"]);
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

The default date format for JSON and XML data is **'%m/%d/%Y %H:%i'** (see the <a href="settings_format.md"> date format specification</a>).<br> To change it, use the api/scheduler_xml_date_config.md configuration option.

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here', new Date(2013, 3, 18), "week");
~~~

###Custom properties
You are not limited to the mandatory properties listed above and can add any custom ones to data items. 
Extra data properties will be parsed as strings and loaded to the client side where you can use them according to your needs.

See examples of data with custom properties <a href="data_formats.md#datawithcustomproperties">here</a>.



Dynamic loading
-----------------------------------------------
 
By default, dhtmlxScheduler loads all data at once. It may become problematic when you are using big event collections. 
In such situations you may use the dynamic loading mode and load data by parts, necessary to fill the current viewable area  of the scheduler.

###Technique

To enable the dynamic loading , call the api/scheduler_setloadmode.md method:
{{snippet
Enabling the dynamic loading
}}
~~~js
scheduler.setLoadMode("month");
scheduler.load("some.php");
~~~

*As a parameter the method takes the loading mode that defines the size of the data to load  - day, week, month or year.*

For example, if you set the 'week' mode, the scheduler will request data just for the current week and load remaining ones on demand.<br>
Generated requests look like:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~
*where DATEHERE - a valid date value in the format defined by the api/scheduler_load_date_config.md option.*

<br>

If you are using <a href="http://docs.dhtmlx.com/doku.php?id=dhtmlxconnector:start">dhtmlxConnector</a> at the server side, you don't need to do any additional server-side operations to parse the data.


###Loading spinner
When you deal with a large data size, it's useful to display the loading spinner shown users that the app is actually doing something.

To enable the loading spinner for the scheduler, set the api/scheduler_show_loading_config.md property to *true*. 

~~~js
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"month");
~~~

{{note
To change the spinner image - replace 'imgs/loading.gif' with your custom image. 
}}

@index:
- data_formats.md



