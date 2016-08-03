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

