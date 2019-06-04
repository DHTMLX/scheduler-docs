onXLS
=============

@short:fires immediately before loading data from the data source has been started
	
@example: 
scheduler.attachEvent("onXLS", function (){
	//any custom logic here
});



@template:	api_event
@descr: 


@related:
loading_data.md

@relatedapi: 
api/scheduler_onxle_event.md
api/scheduler_load.md

@deprecated:
Will be removed in future versions. Use api/scheduler_onloadstart_event.md instead.

~~~js
scheduler.attachEvent("onLoadStart", function(){
    //any custom logic here
});
~~~

@changelog:
deprecated since v5.2