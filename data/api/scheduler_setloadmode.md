setLoadMode
=============

@short: 
	sets the mode that allows loading data by parts (enables the dynamic loading)

@params: 
- mode	string	the loading mode


@example:
scheduler.config.load_date = "%Y.%m.%d";
scheduler.init('scheduler_here',new Date(2009,10,1),"month");

scheduler.setLoadMode("month")
scheduler.load("data/events.php");
        
@template:	api_method
@related:
	loading_data.md#dynamicloading
@relatedsample:
	01_initialization_loading/05_loading_database.html
@relatedapi:
	api/scheduler_load_date_config.md
    api/scheduler_load_format_template.md
@descr: 

{{note
The method should be called after the **scheduler.init()** call, but before loading data into the scheduler.
}}

By default, scheduler loads all data at once. But it may become problematic, when you are using big event collections. In such situations, you should load data by parts, necessary to fill the viewable area of the scheduler.

The **mode** parameter can take only one of the predefined set of values. The predefined values are:

- day;  
- week;
- month;
- year.


For example, if you set the 'month' mode, the scheduler will request data just for the current month and load the remaining ones on demand. 
[Read more about the loading modes](loading_data.md#dynamicloading).

####Request

Generated requests look like this:

~~~php
Data?from=DATEHERE&to=DATEHERE
~~~

*where DATEHERE - a valid date value in the format defined by the api/scheduler_load_date_config.md option.*

<br>

If you are using <a href="http://docs.dhtmlx.com/doku.php?id=dhtmlxconnector:start">dhtmlxConnector</a> on the server side, you don't need to do any additional server-side operations to parse data.

