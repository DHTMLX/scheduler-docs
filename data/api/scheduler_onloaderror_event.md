onLoadError
=============
@short: fires when some error happened while data loading 
	

@params:
- response	XMLHttpRequest	an Ajax request object

@example:
scheduler.attachEvent("onLoadError", function(resp){
	dhtmlx.message("Failed to load data");
});

@template:	api_event
@descr:

The event is invoked by the api/scheduler_parse.md and api/scheduler_load.md methods