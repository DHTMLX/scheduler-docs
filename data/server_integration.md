Server-Side Integration
==================================

<style>
.dp_table td{
	min-width:140px;

}
</style>

The recommended approach to connect dhtmlxScheduler to a backend is to implement RESTful API on the server and use dhtmlxDataProcessor on the client.

[DataProcessor](http://docs.dhtmlx.com/dataprocessor__index.html) is a client-side library included into dhtmlxScheduler.js. 
It monitors data changes and gets the server requests on the client side.
 

Technique
------------------

Generally, to load data from the server side using REST API, you need to:

###Client side

1) Call the api/scheduler_load.md method, where as a parameter specify the URL that returns Scheduler data in the [JSON](data_formats.md#json) format

2) Initialize dataProcessor and attach it to the dhtmlxScheduler object. The dataProcessor constructor accepts the path to the same server-side script:
           
~~~js
scheduler.init("scheduler_here", new Date(), "month");
scheduler.load("apiUrl");

var dp = new dataProcessor("apiUrl");
dp.init(scheduler);
~~~
	
<h3 id="requestresponsedetails">Request and response details</h3>

The URL is formed by the following rule:

- api/eventId

where "api" is the url you've specified in the dataProcessor configuration.


####REST mode

To enable the REST mode, use the [setTransactionMode()](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) method of DataProcessor:

~~~js
var dp = new dataProcessor("apiUrl");
dp.init(scheduler);
dp.setTransactionMode("REST", false);  /*!*/
~~~

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
		<td>add a new event</td>
		<td>POST</td>
        <td>/apiUrl</td>
        <td>{"action":"inserted","tid":"eventId"}</td>
    </tr>
	<tr>
    	<td>update an event</td>
		<td>PUT</td>
        <td>/apiUrl/eventId</td>
        <td>{"action":"updated"}</td>
	</tr>
	<tr>
    	<td>delete an event</td>
		<td>DELETE</td>
        <td>/apiUrl/eventId</td>
        <td>{"action":"deleted"}</td>
	</tr>
</table>

####POST mode

To use the POST mode, use the [setTransactionMode()](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) method of DataProcessor with necessary parameters:

~~~js
var dp = new dataProcessor("apiUrl");
dp.init(scheduler);
dp.setTransactionMode("POST", false);  /*!*/
~~~

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
    	<td>update an event</td>
		<td>POST</td>
        <td>/apiUrl</td>
        <td>{"action":"inserted|updated|deleted",<br>"tid":"eventId"}</td>
	</tr>
</table>

####Dynamic loading

The request and response for dynamic loading are the following:

<table class="dp_table">
	<tr>
    	<th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Response</b></th>
    </tr>
    <tr>
    	<td>load data</td>
		<td>GET</td>
        <td>/apiUrl?from=minDate&to=maxDate </td>
        <td><a href="data_formats.md#json">JSON format</a></td>
	</tr>
</table>

### Request parameters

Create/Update/Delete requests will contain all public properties of a client-side event object:

- **id**: 71
- **start_date**: 2014-11-04 15:00
- **end_date**: 2014-11-04 18:00
- **text**:  Recinto Ferial - Valencia 
- **details**: Details for  Recinto Ferial - Valencia 
- **!nativeeditor_status**: updated

{{note The **!nativeeditor_status** parameter is relevant for the POST mode only.}}

###Server side

On each action performed in Scheduler (adding, updating or deleting events), dataProcessor reacts by sending an AJAX request to the server.

Each request contains all the data needed to save changes in the database.
As we initialized dataProcessor in the REST mode, it will use different HTTP verbs for each type of operation.

Since we use REST API, it's possible to implement the server side using different frameworks and programming languages.
Here's a list of available server side implementations that you can use for Scheduler backend integration:

- server_php.md
- server_nodejs.md
- server_dotnet.md
- server_ruby.md

<br>
If by some reason you don't want to use REST API, the best solution is [to use dhtmlxConnector library](using_connectors.md).


Saving recurring events
------------------------------

Recurring events are stored in the database as records that contain both all [fields of a regular event](loading_data.md#dataproperties) and 3 additional fields: **rec_type**, **event_length** and **event_pid**. 
Read more in the [Recurring Events](recurring_events.md#serversideintegration) article.

In addition to extra fields, a specific logic needs to be added to the server-side controller:

- for the **insert** action:
  - if **event.rec_type === 'none'**, the response must have the 'deleted' status
- for the **update** action:
  - if **event.rec_type** is not empty and **event.rec_type !== 'none'**, all events where **event_pid == event.id** must be deleted
- for the **delete** action:
  - if **event.rec_type** is not empty and **event.rec_type !== 'none'**, all events where **event_pid == event.id** must be deleted
  - if **event.event_pid** is not empty, the event should be updated with **event.rec_type = 'none'** instead of deleting.

You can have a look at the detailed example on editing and deleting recurring events in the [related section of the Recurring Events article](recurring_events.md#editingdeletingacertainoccurrenceintheseries).


Custom Request Headers and Parameters 
----------------

### Adding custom request headers

When you need Scheduler to send additional headers to your backend, you can specify them using the [dataProcessor.setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) method.

For example, let's suppose that you need to add an authorization token to your requests:

~~~js
scheduler.init("scheduler_here");
scheduler.load("/api");
 
var dp = new dataProcessor("/api");
dp.init(scheduler);
dp.setTransactionMode({
    mode:"REST",
    headers: {
       "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

Currently, api/scheduler_load.md does not support header/payload parameters, so if you need them for GET request, 
you'll have to send xhr manually and load data into scheduler using api/scheduler_parse.md, for example:

~~~js
$.ajax({
    url: "/api",
    headers: {
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    },
    success: function (result) {
        scheduler.parse(result, "json");
    }
});
~~~

### Adding custom parameters to the request

There are a couple of ways to send additional parameters to requests.

As you know, scheduler sends all properties of the data object back to the backend. 
Thus, you can add an additional property directly to the data object and it will be sent to the backend:

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    var event = scheduler.getEvent(id);
    event.userId = currentUser;
    return true;
});
~~~

Alternatively, you can add custom parameters to all requests sent by data processor, using the **payload** property of
the [setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) parameter:

~~~js
scheduler.init("gantt_here");
scheduler.load("/api");
 
var dp = new dataProcessor("/api");
dp.init(scheduler);
dp.setTransactionMode({
    mode:"REST",
    payload: {
       token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

Triggering Data Saving from Script
------------------------------------

If you have dataProcessor initialized, any change made by the user or programmatically will be automatically saved in the data source.

Generally, to update a specific event programmatically, use the api/scheduler_addevent.md method:

~~~js
scheduler.parse([
     { id:1, start_date:"2017-05-13 6:00", end_date:"2017-05-13 8:00", text:"Event 1"},
     { id:2, start_date:"2017-06-09 6:00", end_date:"2017-06-09 8:00", text:"Event 2"}
],"json");
 
scheduler.getEvent(1).text = "Conference"; //changes event's data
scheduler.addEvent(1); // renders the updated event
~~~

When called for an event that is already loaded into the scheduler, api/scheduler_addevent.md will trigger an *update* request, otherwise *insert* will be called.

The methods that invoke sending an update to the backend:

- api/scheduler_addevent.md
- api/scheduler_deleteevent.md


Saving Changes without DataProcessor
----------------

dhtmlxScheduler can be used without gantt.dataProcessor. In that case you'll have to monitor all changes made in the scheduler manually and then send them to your backend.
Here is the list of events you'll need to listen to:

- api/scheduler_oneventadded_event.md
- api/scheduler_oneventchanged_event.md
- api/scheduler_oneventdeleted_event.md

When an event is created on the client side, it obtains a temporary id which is used until the item gets a permanent database id.

Once you insert a new item into the database, you'll need to pass it back to the client side and apply it to the related event using the api/scheduler_changeeventid.md method:

~~~js
// assume that eventService is some kind of CRUD service implementation

scheduler.attachEvent('onEventAdded', function(id, event) {
  eventService.create(event)
    .then(function(result){
      scheduler.changeEventId(id, result.databaseId);
    });
});

scheduler.attachEvent('onEventChanged', function(id, event) {
  eventService.update(event);
});

scheduler.attachEvent('onEventDeleted', function(id) {
  eventService.delete(id);
});
~~~

Error Handling
------------------------------------------

A server can inform Scheduler that an action has failed by returning the "action":"error" response:

~~~js
{"action":"error"}
~~~

Such a response can be captured on the client with the help of dataProcessor:

~~~js
var dp = new dataProcessor("apiUrl");
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // do something here
    }
});
~~~

The response object may contain any number of additional properties, they can be accessed via the `response` argument of the onAfterUpdate handler.



XSS, CSRF and SQL Injection Attacks
----------------------------

Pay attention that Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. 
It is important that responsibility for keeping an application safe is on the developers implementing the backend. 

Check the app_security.md article to learn the most vulnerable points of the component and the measures you can take to improve the safety of your application. 


@index:
- app_security.md
- using_connectors.md
- server_php.md
- server_nodejs.md
- server_dotnet.md
- server_ruby.md