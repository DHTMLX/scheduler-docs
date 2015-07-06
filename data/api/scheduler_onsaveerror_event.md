onSaveError
=============
@short: fires when some error happened while data updating 
	

@params:
- events	array	an array of events' ids that failed to update
- response	XMLHttpRequest	an Ajax request object

@example:
scheduler.attachEvent("onSaveError", function(id, resp){
	dhtmlx.message("Failed to  update data");
})


@template:	api_event
@descr:
{{note
The event will be invoked only if you use dataProcessor library for client-server communication.
}}
