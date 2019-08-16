onXLE
=============

@short:fires after loading data from the data source is complete
	

@example: 
scheduler.attachEvent("onXLE", function (){
	//any custom logic here
});



@template:	api_event
@descr: 

@related:
loading_data.md


@relatedapi: 
api/scheduler_onxls_event.md
api/scheduler_load.md

@deprecated:
Will be removed in future versions. Use api/scheduler_onloadend_event.md instead.

~~~js
scheduler.attachEvent("onLoadEnd", function(){
    //any custom logic here
});
~~~ 

@changelog: deprecated since v5.2