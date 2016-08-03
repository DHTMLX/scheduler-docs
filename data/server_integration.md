Server-Side Integration
==================================

<style>
.dp_table td{
	min-width:140px;

}
</style>

dhtmlxScheduler includes a client-side helper library **dataProcessor** (included in dhtmlxScheduler.js) that can be used together with REST API on the server-side to implement communication with server.

[dataProcessor](http://docs.dhtmlx.com/dataprocessor__index.html) is a client-side library included into dhtmlxScheduler.js.
It monitors data changes and gets the server requests on the client side.
 
[REST](http://rest.elkstein.org/) stands for Representational State Transfer. It relies on a stateless, client-server, cacheable communications protocol.
RESTful APIs use HTTP as a transport layer in most cases. Due to its simplicity, REST works well with frameworks that use various languages.


Technique
----------------------------------------------

###Client side

1) Call the api/scheduler_load.md method where as a parameter, specify the path to a server-side script which outputs data in the [JSON](data_formats.md#json) format
                
2) Initialize dataProcessor and attach it to the dhtmlxScheduler object.
            
~~~js
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("events.php");

var dp = new dataProcessor("events.php");
dp.init(scheduler);
~~~
	
3) In order to set the REST mode of dataProcessor, call the setTransactionMode() function with the REST parameter:
    		
~~~js
dp.setTransactionMode("REST");
~~~

<h3 id="requestresponsedetails">Request and Response details</h3>

The url is formed by the following rule:

- api/link/id
- api/task/id

where "api" is the url you've specified in the dataProcessor configuration.


The list of possible requests and responses is:

<table class="dp_table">
	<tr>
    	<th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Response</b></th>
    </tr>
	<tr>
    	<td>load data</td>
		<td>GET</td>
        <td>/apiUrl</td>
        <td><a href="data_formats.md#json">JSON format</a></td>
	</tr>
    <tr>
		<td>add a new task</td>
		<td>POST</td>
        <td>/apiUrl/task</td>
        <td>{"action":"inserted","tid":"taskId"}</td>
    </tr>
	<tr>
    	<td>update a task</td>
		<td>PUT</td>
        <td>/apiUrl/task/taskId</td>
        <td>{"action":"updated"}</td>
	</tr>
	<tr>
    	<td>delete a task</td>
		<td>DELETE</td>
        <td>/apiUrl/task/taskId</td>
        <td>{"action":"deleted"}</td>
	</tr>
	<tr>
    	<td>add a new link</td>
		<td>POST</td>
        <td>/apiUrl/link</td>
        <td>{"action":"inserted","tid":"linkId"}</td>
	</tr>
    <tr>
		<td>update a link</td>
		<td>PUT</td>
        <td>/apiUrl/link/linkId</td>
        <td>{"action":"updated"}</td>
    </tr>
    <tr>
		<td>delete a link</td>
		<td>DELETE</td>
        <td>/apiUrl/link/linkId</td>
        <td>{"action":"deleted"}</td>
	</tr>
</table>

###Server side
           
On each action performed in Scheduler (adding, updating or deleting tasks or links),
dataProcessor reacts by sending an AJAX request to the server.

Each request contains all the data needed to save changes in the database.
As we initialized dataProcessor in the REST mode, it will use different HTTP verbs for each type of operation.

Since we use REST API, it's possible to implement the server side using different frameworks and programming languages.
Here's a list of available server side implementations that you can use for Scheduler backend integration:

- Node.js
- PHP
- .Net
- Ruby

<br>
If by some reason you don't want to use REST API, the best solution is [to use dhtmlxConnector library](using_connectors.md).

Triggering data saving from script
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




@index: 

- using_connectors.md