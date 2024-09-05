Server-Side Integration
==================================

<style>
    .dp_table{
        width: 100%;
    }
    .dp_table td{
        min-width:80px;

    }
</style>

The recommended approach to connect dhtmlxScheduler to a backend is to implement RESTful API on the server and use dhtmlxDataProcessor on the client.

[DataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) is a client-side library included into dhtmlxScheduler.js. 
It monitors data changes and gets the server requests on the client side.

It's possible to bind dhtmlxScheduler to the server side using REST API together with different frameworks and programming languages. 
Here's a list of available server side implementations that you can use for Scheduler backend integration:

- howtostart_php_slim4.md
- howtostart_dotnet_core.md
- howtostart_dotnet.md
- howtostart_nodejs.md
- howtostart_plain_php.md
- howtostart_php_laravel.md
- howtostart_ruby.md
- howtostart_php.md

Technique
------------------

Generally, to load data from the server side using REST API, you need to:

###Client side

1) Call the api/scheduler_load.md method, where as a parameter specify the URL that returns Scheduler data in the [JSON](data_formats.md#json) format

2) Call the [createDataProcessor](api/scheduler_createdataprocessor.md) method and pass an object with configuration options as its parameter:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST"
});
~~~

Alternatively, create the dataProcessor using constuctor and attach it to the dhtmlxScheduler object. The scheduler.DataProcessor constructor accepts the path to the same server-side script:
           
~~~js
scheduler.init("scheduler_here", new Date(), "month");
scheduler.load("apiUrl");

const dp = new scheduler.DataProcessor("apiUrl");
dp.init(scheduler);
~~~



Check the detailed info in the next section.

<h3 id="createdp">Creating DataProcessor</h3>

While creating a DataProcessor via the API method [createDataProcessor](api/scheduler_createdataprocessor.md) you have several possible options for passing parameters.

1\. Use one of the predefined request modes, as in:

~~~js
const dp = scheduler.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

where:

- **url** - the URL to the server side
- **mode** - the mode of sending data to the server: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"

2\. Provide a custom **router** object:

~~~js
const dp = scheduler.createDataProcessor(router);
~~~

where the router is either a function:

~~~js
const server = "/api";

// entity - "event"
// action - "create"|"update"|"delete"
// data - an object with event data
// id – the id of a processed object (event)
const dp = scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
           	return scheduler.ajax.post(
                `${server}/${entity}`,
                data
           	);
        break;
        case "update":
           	return scheduler.ajax.put(
                `${server}/${entity}/${id}`,
                data
            );
        break;
        case "delete":
           	return scheduler.ajax.del(
                `${server}/${entity}/${id}`
           	);
        break;
   	}
});
~~~

or an object of the following structure:

~~~js
const dp = scheduler.createDataProcessor({ 
   event: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

All the functions of the router object should return either a Promise or a data response object. This is needed for the dataProcessor to apply the database id and to hook **onAfterUpdate** event of the data processor.

~~~js
const router = function(entity, action, data, id) {
    return new Promise(function(resolve, reject) {
        // … some logic
        return resolve({tid: databaseId});
    });
}
~~~

Thus you can use DataProcessor for saving data in localStorage, or any other storage which is not linked to a certain URL, or in case if there are two different servers (URLs) responsible for creation and deletion of objects.
	
<h3 id="requestresponsedetails">Request and response details</h3>

The URL is formed by the following rule:

- api/eventId

where "api" is the url you've specified in the dataProcessor configuration.


####REST mode

To enable the REST mode, specify the `mode` property of api/scheduler_createdataprocessor.md configuration object:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST"
});
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
        <td>/apiUrl/:id</td>
        <td>{"action":"updated"}</td>
	</tr>
	<tr>
    	<td>delete an event</td>
		<td>DELETE</td>
        <td>/apiUrl/:id</td>
        <td>{"action":"deleted"}</td>
	</tr>
</table>

####REST-JSON mode

To use the REST-JSON mode, specify the `mode` property of api/scheduler_createdataprocessor.md configuration object:
~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "REST-JSON"
});

~~~

In this mode, the scheduler will send POST/PUT/DELETE requests using application/json content type.

The list of possible requests and responses is:

<table class="dp_table">
	<tr>
    	<th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Request Body</b></th><th><b>Response</b></th>
    </tr>
	<tr>
    	<td>load data</td>
		<td>GET</td>
        <td></td>
        <td><a href="data_formats.md#json">JSON format</a></td>
	</tr>
    <tr>
		<td>add a new event</td>
		<td>POST</td>
        <td>/apiUrl</td>
        <td>{ <br>
                "start_date":"2019-12-18 00:00",
                "end_date":"2019-12-18 00:05",
                "text":"New event",
                ... 
            }
        </td>
        <td>{
                "action":"inserted", 
                "tid":"eventId"
            }
        </td>
    </tr>
	<tr>
    	<td>update an event</td>
		<td>PUT</td>
        <td>/apiUrl/:id</td>
        <td>{<br>
                "start_date":"2024-12-18 00:00",
                "end_date":"2024-12-18 00:05",
                "text":"New event",
                ...
            }
        </td>
        <td>{"action":"updated"}</td>
	</tr>
	<tr>
    	<td>delete an event</td>
		<td>DELETE</td>
        <td>/apiUrl/:id</td>
        <td>
        </td>
        <td>{"action":"deleted"}</td>
	</tr>
</table>

####POST mode

To enable the POST mode, specify the `mode` property of api/scheduler_createdataprocessor.md configuration object:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "POST"
});
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

####JSON mode

To enable the JSON mode, specify the `mode` property of api/scheduler_createdataprocessor.md configuration object:

~~~js
const dp = scheduler.createDataProcessor({
    url: "apiUrl",
    mode: "JSON"
});
~~~

In this mode, the scheduler will send POST request to the server after each updating of data (similarly to the POST mode, except for the request format).

The list of possible requests and responses is:

<table class="dp_table">
	<tr>
    	<th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>Request Body</b></th><th><b>Response</b></th>
    </tr>
	<tr>
    	<td>load data</td>
		<td>GET</td>
        <td></td>
        <td><a href="data_formats.md#json">JSON format</a></td>
	</tr>
    <tr>
		<td>add a new event</td>
		<td>POST</td>
        <td>{
                "id": temporaryId,
                "action":"inserted", <br>
                "data":{ <br>
                    "start_date":"2019-12-18 00:00",
                    "end_date":"2019-12-18 00:05",
                    "text":"New event",
                    ... 
                } <br>
            }
        </td>
        <td>{
                "action":"inserted", 
                "tid":"eventId"
            }
        </td>
    </tr>
	<tr>
    	<td>update an event</td>
		<td>POST</td>
        <td>{   
            "id": id,
            "action":"updated",
            "data":{ <br>
                "start_date":"2019-12-18 00:00",
                "end_date":"2019-12-18 00:05",
                "text":"New event",
                ...
                } <br>
            }
        </td>
        <td>{"action":"updated"}</td>
	</tr>
	<tr>
    	<td>delete an event</td>
		<td>POST</td>
        <td>{   
            "id": id,
            "action":"deleted",
            "data":{ <br>
                "start_date":"2019-12-18 00:00",
                "end_date":"2019-12-18 00:05",
                "text":"New event",
                ...
                }<br>
            }
        </td>
        <td>{"action":"deleted"}</td>
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
- **start_date**: 2024-11-04 15:00
- **end_date**: 2024-11-04 18:00
- **text**:  Recinto Ferial - Valencia 
- **details**: Details for  Recinto Ferial - Valencia 
- **!nativeeditor_status**: updated

{{note The **!nativeeditor_status** parameter is relevant for the POST mode only.}}

###Server side

On each action performed in Scheduler (adding, updating or deleting events), dataProcessor reacts by sending an AJAX request to the server.

Each request contains all the data needed to save changes in the database.
As we initialized dataProcessor in the REST mode, it will use different HTTP verbs for each type of operation.

{{note If by some reason you don't want to use REST API, the best solution is [to use dhtmlxConnector library](howtostart_connector.md).}}

Recurring events
------------------------------

Recurring events are stored in the database as records that contain both all [fields of a regular event](loading_data.md#dataproperties) and several additional fields: **rrule**, **duration**, **recurring_event_id**, **original_start**, **deleted**.

Read more in the [Recurring Events](recurring_events.md#serversideintegration) article.

In addition to extra fields, a specific logic needs to be added to the server-side controller:

- for the **insert** action:
  - if **event.deleted === true**, the response must have the 'deleted' status
- for the **update** action:
  - if **event.rrule** is not empty and **event.recurring_event_id** is empty, all events where **recurring_event_id == event.id** must be deleted
- for the **delete** action:
  - if **event.rrule** is not empty and **event.recurring_event_id** is empty, all events where **recurring_event_id == event.id** must be deleted
  - if **event.recurring_event_id** is not empty, the event should be updated with **event.deleted = true** instead of deleting.

{{note You can have a look at the detailed example on editing and deleting recurring events in the [related section of the Recurring Events article](recurring_events.md#editingdeletingacertainoccurrenceintheseries).}}


Custom Request Headers and Parameters 
----------------

### Adding custom request headers

When you need Scheduler to send additional headers to your backend, you can specify them using the [dataProcessor.setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) method.

For example, let's suppose that you need to add an authorization token to your requests:

~~~js
scheduler.init("scheduler_here");
scheduler.load("/api");
 
const dp = scheduler.createDataProcessor("/api");
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
const authToken = '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b';

fetch("/api", {
    method: "GET", 
    headers: {
        "Content-Type": "application/json", 
        "Authorization": `Token  ${authToken}`
    }
})
.then(response => response.json()) 
.then(data => {
    scheduler.parse(data);
})
.catch(error => {
    console.error("Error:", error);
});
~~~

### Adding custom parameters to the request

There are several ways to send additional parameters to requests.

As you know, scheduler sends all properties of the data object back to the backend. 
Thus, you can add an extra property directly to the *data object* and it will be sent to the backend:

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    const event = scheduler.getEvent(id);
    event.userId = currentUser;
    return true;
});
~~~

Alternatively, you can add custom parameters to all requests sent by data processor, using the **payload** property of
the [setTransactionMode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) parameter:

~~~js
scheduler.init("gantt_here");
scheduler.load("/api");
 
const dp = scheduler.createDataProcessor("/api");
dp.init(scheduler);
dp.setTransactionMode({
    mode:"REST",
    payload: {
       token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

Payload will be added into the query string of the request.

One more way to add custom parameters to a request is to use the [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html) event of DataProcessor:

~~~js
const dp = scheduler.createDataProcessor("data/events.php");

dp.attachEvent("onBeforeUpdate", function(id, state, data){
	data.productName = "Product 2";
	return true;
});
~~~

The event is called for each record sent to the backend and a custom parameter will be added to each Scheduler event, prefixed by an event id, like this:

~~~js
123_productName:Product 2
~~~


Triggering Data Saving from Script
------------------------------------

If you have dataProcessor initialized, any change made by the user or programmatically will be automatically saved in the data source.

Generally, to update a specific event programmatically, use the api/scheduler_addevent.md method:

~~~js
scheduler.parse([
     { id:1, start_date:"2017-05-13 6:00", end_date:"2017-05-13 8:00", text:"Event 1"},
     { id:2, start_date:"2017-06-09 6:00", end_date:"2017-06-09 8:00", text:"Event 2"}
]);

const event = scheduler.getEvent(1);
event.text = "Conference"; //changes event's data
scheduler.addEvent(event); // renders the updated event
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

Custom Routing
----------------

In case RESTful AJAX API isn't what you need on the backend, or if you want to manually control what is sent to the server, you can make use of custom routing.

For example, if you use Angular, React, or any other framework where a component on a page doesn't send changes directly to the server, but passes them to a different component which is responsible for data saving.

To provide custom routing options for DataProcessor, you should use the [**createDataProcessor()**](#createdp) method:

~~~js
const server = "/api";

scheduler.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
            return scheduler.ajax.post(
                `${server}/${entity}`,
                data
            );
        break;
        case "update":
            return scheduler.ajax.put(
                `${server}/${entity}/${id}`,
                data
            );
        break;
        case "delete":
            return scheduler.ajax.del(
                `${server}/${entity}/${id}`
           );
        break;
    }
});
~~~

### Using AJAX for setting custom routers

[Scheduler AJAX module](api/scheduler_ajax_other.md) can be useful for setting custom routes. Scheduler expects a custom router to return a Promise object as a result of an operation, which allows catching the end of an action. 
The AJAX module supports promises and is suitable for usage inside of custom routers. Scheduler will get Promise and process the content of Promise, when it is resolved.  

In the example below a new task is created. If the server response includes the id of a newly created task, Scheduler will be able to apply it.

~~~js
scheduler.createDataProcessor(function(entity, action, data, id){
...
 
    switch (action) {
        case "create":
            return scheduler.ajax.post({
                headers: { 
                    "Content-Type": "application/json" 
                },
                url: server + "/" + entity + "/" + id,
                data: JSON.stringify(data)
            });
        break;
    }
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
const dp = scheduler.createDataProcessor("apiUrl");
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action === "error"){
        // do something here
    }
});
~~~

The response object may contain any number of additional properties, they can be accessed via the `response` argument of the onAfterUpdate handler.

If the server responded with an error on some of your action but the changes were saved on the client side, the best way to synchronize their states is to clear the client's state, and reload the correct data from the server side:

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action === "error"){
        scheduler.clearAll();
        scheduler.load(url);
    }
});
~~~

In cases when you don't want to fully reload the data, you can delete a single event from only the client-side using the **silent** parameter of the [deleteEvent](api/scheduler_deleteevent.md) method:

~~~js
// removes the specified event only from the client-side, without server calls
scheduler.deleteEvent(id, true); 
~~~

XSS, CSRF and SQL Injection Attacks
----------------------------

Pay attention that Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. 
It is important that responsibility for keeping an application safe is on the developers implementing the backend. 

Check the app_security.md article to learn the most vulnerable points of the component and the measures you can take to improve the safety of your application. 


@index:
- app_security.md

