Connector Code Samples
=========================

dhtmlxScheduler library supports a special server-side helper library dhtmlxConnector that simplifies your work with the server side.

[dhtmlxConnector](http://docs.dhtmlx.com/connector__php__index.html) is a middleware that binds client-side to the database table, so that you do not
have to deal with the technical details of the data exchange protocols.

Joint usage of the  dhtmlxConnector and [dataProcessor](http://docs.dhtmlx.com/dataprocessor__index.html) libraries allows you to achieve any 
client-server manipulation and not to write the server-client communication logic manually.

<br>

<table border="1">
	<caption>Table 1. Packages of dhtmlxConnector for different platforms</caption>
	<tr>
		<td>PHP</td>
		<td><a href="http://dhtmlx.com/docs/download/dhtmlxConnector_php.zip">http://dhtmlx.com/docs/download/dhtmlxConnector_php.zip</a></td>
	</tr>
	<tr>
		<td>.Net</td>
		<td><a href="http://dhtmlx.com/docs/download/dhtmlxConnector_net.zip">http://dhtmlx.com/docs/download/dhtmlxConnector_net.zip</a></td>
	</tr>
	<tr>
		<td>Java</td>
		<td><a href="http://dhtmlx.com/docs/download/dhtmlxConnector_java.zip">http://dhtmlx.com/docs/download/dhtmlxConnector_java.zip</a></td>
	</tr>
	<tr>
		<td>RubyOnRails</td>
		<td><a href="http://support.dhtmlx.com/x-files/samples/ruby_scheduler.zip">http://support.dhtmlx.com/x-files/samples/ruby_scheduler.zip</a></td>
	</tr>
	<tr>
		<td>ColdFusion</td>
		<td><a href="http://support.dhtmlx.com/x-files/samples/connector_cf.zip">http://support.dhtmlx.com/x-files/samples/connector_cf.zip</a></td>
	</tr>
</table>

Technique
----------
To load data from the server side using the PHP Connector, you need to:

###Client side
           
- call the api/scheduler_load.md method, where as a parameter you should specify the url that returns Gantt data in [JSON](data_formats.html#json) format

- initialize dataProcessor and attach it to the scheduler.The dataProcessor constructor accepts the path to the same server-side script
            
~~~js
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("events.php");

var dp = new dataProcessor("events.php");
dp.init(scheduler);
~~~
	
###Server-side: 
            
- A standard server script that uses dhtmlxConnector looks like:
           
~~~js
//events.php
include('connector-php/codebase/scheduler_connector.php');//includes the file

$res=mysql_connect("localhost","root","");//connects to the server with our DB
mysql_select_db("sampleDB");//connects to the DB.'sampleDB' is the DB's name
 
$calendar = new schedulerConnector($res);//connector initialization
$calendar->render_table("events","id","event_start,event_end,text","type");
~~~
	
- dhtmlxConnector consists of individual component-specific connectors. For dhtmlxScheduler you should include -  <b>scheduler_connector.php</b>.
- the <b>render_table</b> method allows you to load data from a single table.<br> Parameters:

	- *the database's table name*
    - *the name of the identity field (optional)*
    - *a list of fields</i> which will be used as event's data properties*
    
    If you want to load data from several tables, read the related chapter of the dhtmlxConnector's documentation - 
    [Basic Loading:Work with several tables](http://docs.dhtmlx.com/connector__php__basis.html#work_with_several_tables).      
           
{{sample
	01_initialization_loading/05_loading_database.html
}}


###Request parameters format

An example of Scheduler request values for a separate request for each record is given below:

- **id**: 71
- **start_date**: 2014-11-04 15:00
- **end_date**: 2014-11-04 18:00
- **text**: Recinto Ferial - Valencia
- **details**: Details for Recinto Ferial - Valencia
- **!nativeeditor_status**: updated

You can find more examples of Scheduler request parameters in the corresponding section of the 
[Basic Operating Principles](http://docs.dhtmlx.com/dataprocessor__basic_principles.html#schedulerrequestparamsexamples) article of the dataProcessor documentation.

###Response

The response can be any valid JSON, its format should be as follows:

- **type** - the type of the operation;
- **sid** - the original task/link ID;
- **tid** - the ID of the task/link after the operation.

An example of JSON response looks like this:

~~~js
{"action":"updated", "sid":15, "tid":15}
~~~

More details on the response format are given in the [Basic Operating Principles](http://docs.dhtmlx.com/dataprocessor__basic_principles.html#responsedetails) article of dataProccesor documentation.

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