load
=============

@short: 
	loads data to the scheduler from an external data source

@params: 

- url			string  	the server-side URL (may be a static file or a server-side script which outputs data in one of the supported formats)
* callback		function 	the callback function

@example: 
scheduler.load("data"); // the format of loaded data is auto-detected
// or
scheduler.load("data",function(){
	alert("Data has been successfully loaded");
});


@template:	api_method
@related:
	data_formats.md
    loading_data.md
@relatedsample:
	01_initialization_loading/01_basic_init.html
    01_initialization_loading/05_loading_database.html
@descr: 
Pay attention that in case of dynamic loading the callback function that is passed as a second parameter will be called only during the initial loading of data.
While next portions of data will be loaded later, the callback function won't be called anymore.

If you need to call the callback function each time data is loaded into Scheduler, you can make use of the api/scheduler_onloadend_event.md event.

@relatedapi:
api/scheduler_onloadend_event.md
api/scheduler_onloadstart_event.md
api/scheduler_onbeforeparse_event.md
api/scheduler_onparse_event.md