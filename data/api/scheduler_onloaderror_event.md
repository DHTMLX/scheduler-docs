onLoadError
=============

@short: fires if the scheduler has failed to parse data, or if the server has returned 4xx or 5xx response status
	

@params:
- response		XMLHttpRequest		an Ajax request object

@example:
scheduler.attachEvent("onLoadError", function(response){
	dhtmlx.message("Failed to load data");
});

@template:	api_event
@descr:

The event is invoked by the api/scheduler_parse.md and api/scheduler_load.md methods.

In case the event is invoked by the **parse** method, the handler function will take as a parameter an object with the *responseText* property, which will contain data to be parsed as a value:

~~~js
{
	responseText: parseArgument
}
~~~

 