Server-side Integration
==================================
dhtmlxScheduler library supports special helper libraries that simplify your work with the server side:

- **dhtmlxConnector** - a server-side library. Provides the necessary data exchange conditions, so that you do not have to deal with the technical details of working with various data stores,
systems or services (<a href="http://docs.dhtmlx.com/doku.php?id=dhtmlxconnector:start">read more</a>).
- **dataProcessor** - a client-side library (**included in dhtmlxScheduler.js**).  Monitors data changes and gets the server requests on the client side (<a href="http://docs.dhtmlx.com/doku.php?id=dhtmlxdataprocessor:toc">read more</a>).

Joint usage of the libraries allows you to achieve any client-server manipulation and not to write the server-client communication logic manually.

<br>

<table border="1">
	<caption>Table 1. Packages of dhtmlxConnector for different platforms</caption>
	<tr>
		<td>PHP</td>
		<td><a href="https://github.com/DHTMLX/connector-php">https://github.com/DHTMLX/connector-php</a></td>
	</tr>
	<tr>
		<td>.Net</td>
		<td><a href="http://dhtmlx.com/x/download/regular/dhtmlxConnector_net.zip">http://dhtmlx.com/x/download/regular/dhtmlxConnector_net.zip</a></td>
	</tr>
	<tr>
		<td>Java</td>
		<td><a href="https://github.com/DHTMLX/connector-java">https://github.com/DHTMLX/connector-java</a></td>
	</tr>
	<tr>
		<td>ColdFusion</td>
		<td><a href="https://github.com/DHTMLX/connector-cf">https://github.com/DHTMLX/connector-cf</a></td>
	</tr>
</table>



Technique
----------------------------------------------
Generally, to load data from the server side you need to:

<ol>
	<li>
  		<b>Client side:</b>
            <ul>
            	<li>call the api/scheduler_load.md method, where as a parameter you should specify the path to a server-side script, which outputs data as XML</li>
                <li>initialize dataProcessor and attach it to the scheduler.The dataProcessor constructor accepts the path to the same server-side script</li>
            </ul>
~~~js
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("events.php");

var dp = new dataProcessor("events.php");
dp.init(scheduler);
~~~
	</li>
    <li>
    	<b>Server-side:</b> 
            <ul>
            	<li>a standard server script that uses dhtmlxConnector looks like:</li>
            </ul>
~~~js
//events.php
include('connector-php/codebase/scheduler_connector.php');//includes the file

$res=mysql_connect("localhost","root","");//connects to the server with our DB
mysql_select_db("sampleDB");//connects to the DB.'sampleDB' is the DB's name
 
$calendar = new schedulerConnector($res);//connector initialization
$calendar->render_table("events","id","event_start,event_end,text","type");
~~~
	<ul>
    	<li>dhtmlxConnector consists of individual component-specific connectors. For dhtmlxScheduler you should include -  <b>scheduler_connector.php</b>.</li>
        <li>the <b>render_table</b> method allows you to load data from a single table.<br> Parameters:
        	<ul>
            	<li><i>the database's table name</i></li>
                <li><i>the name of the identity field (optional)</i></li>
                <li><i>a list of fields</i> which will be used as event's data properties</li>
            </ul>
            If you want to load data from several tables, read the related chapter of the dhtmlxConnector's documentation - <a href="http://docs.dhtmlx.com/doku.php?id=dhtmlxconnector:basis#work_with_several_tables">'Basic concepts: work with several tables'</a>.
        </li>
    </ul>
	</li>
</ol>

{{sample
	01_initialization_loading/05_loading_database.html
}}

Updating data
------------------------------------
If you have dataProcessor initialized, any change made by the user or programmatically will be automatically saved in the data source.

Generally, to update a specific event programmatically, use the api/scheduler_updateevent.md method:

~~~js
scheduler.parse([
   {id:1, start_date:"2013-05-13 6:00", end_date:"2009-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2013-06-09 6:00", end_date:"2009-06-09 8:00", text:"Event 2"}
],"json");
 
scheduler.getEvent(1).text = "Event 111"; //changes event's data
scheduler.updateEvent(1); // renders the updated event
~~~

{{sample
	03_extensions/01_recurring_events.html
}}


Saving data from REST server 
--------------------------------------
To make dataProcessor work with the REST backend, you need to do 2 things: 

1. Specify the path to your REST server in the dataProcessor's constructor.
2. Call the setTransactionMode with the "REST" value.

~~~js
var dp = new dataProcessor("http://example.com/data");
dp.init(scheduler);
dp.setTransactionMode("REST");


~~~
<br>

{{note
Note, the response can be any valid JSON  object 
}}

To change the id of the event while updating - use the **tid** property. 


~~~js
{
	tid: "some"
}
~~~

Indicating Successful Event Saving
------------------------

You may prevent the user from the action that follows the current one, if there are some changes in an event that haven't been applied yet.

Provided that you use dataProcessor, you can apply the [onBeforeUpdate](http://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) and
[onAfterUpdate](http://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) events for this purpose.

The *onAfterUpdate* fires when the server response is received.

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
     //your code here
})
~~~

The *onBeforeUpdate* event fires prior to sending AJAX to the backend.

~~~js
dp.attachEvent("onBeforeUpdate", function(id, state, data){
    //your code here
    return true;
});
~~~

You can return *false* to leave the changes made to an event in the pending state. Thus it will be possible either to cancel the changes or to send them to the server later.
To define what to do with pending changes next, you should set the corresponding statuses for events.

###Defining event's status 

####Setting a status for event

You can specify the state of event using the [setUpdated](http://docs.dhtmlx.com/api__dataprocessor_setupdated.html) method.

It takes three parameters:

- eventId - (string|number) id of the event to set the update status for
- mode	- (boolean)	optional, *true* (default) for "updated", false for "not updated"
- state	- (string) optional, the update mode name, "updated" by default

~~~js
dp.setUpdated(1);
dp.setUpdated(2, true, "deleted");
~~~

####Getting the event status

To return the status of event, you can apply the [getState](http://docs.dhtmlx.com/api__dataprocessor_getstate.html) method. 
It takes the event id as a parameter.

~~~js
var status = dp.getState(2); // -> "deleted"
~~~

Handling AJAX Loading Errors 
-------------------------

While dealing with server side using DataProcessor and loading data with AJAX you can catch possible errors with the help of the following events:  

- api/scheduler_onloaderror_event.md - to handle errors that occur during data loading 

This event can be invoked by the api/scheduler_parse.md and api/scheduler_load.md methods.

The event handler takes the server response (an Ajax request object) as a parameter: 

~~~js
scheduler.attachEvent("onLoadError", function(response){
    dhtmlx.message("Failed to load data");
});
~~~

- api/scheduler_onsaveerror_event.md - to handle errors that happen during data updating 

The event handler takes two parameters:

- ids - an array of events' ids that failed to update
- response - an Ajax request object

~~~js
scheduler.attachEvent("onSaveError", function(ids, response){
    dhtmlx.message("Failed to  update data");
})
~~~


Retrieving Data in JSON Format
-----------------------------------
By default, dhtmlxScheduler expects data to be in the XML format.<br>
But starting from version 3.5, dhtmlxScheduler can be directly populated with a JSON data from dhtmlxConnector.


~~~php
include ('connector-php/codebase/scheduler_connector.php');

$res=mysql_connect("localhost", "root", "");
mysql_select_db("scheduler");

$scheduler = new JSONSchedulerConnector($res);
$scheduler->render_table("events","event_id","start_date,end_date,text,details");
~~~

JSONSchedulerConnector generates the 'JSON' data feed as in:

~~~js
[{ 
		id:"1",  
        start_date:"2009-05-24 00:00:00",   
        end_date:"2009-06-08 00:00:00",  
        text:"French Open",        
        details:"Details for French Open"
	},
	{ 
		id:"2",  
        start_date:"2009-06-21 00:00:00",   
        end_date:"2009-07-05 00:00:00",  
        text:"Wimbledon",          
        details:"Details for Wimbledon"
}]
~~~

{{sample
	01_initialization_loading/10_loading_database_json.html
}}

Saving data in an XML file
----------------------------------------------
The library includes a special extension **ext/dhtmlxScheduler_serialize.js** that allows storing data in an XML file, 
without dealing with the database routine.

Read more on the topic in the chapter <a href="export.html#savingdatainanxmlfile"> Serializing data to XML, JSON, iCal formats</a>.

