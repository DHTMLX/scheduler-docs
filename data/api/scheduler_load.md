load
=============
@short: 
	loads data to the scheduler from an external data source

@params: 
- url	string  the server side URL (may be a static file or a server side script which outputs data <br>  as XML)
* type	string	<i>('json', 'xml', 'ical')</i> the data type. The default value - <i>'xml'</i>
* callback		function 	the callback function

@example: 
scheduler.load("data.php",function(){
	alert("Data has been successfully loaded");
});
//or
scheduler.load("data.xml"); //loading data in the XML format
//or
scheduler.load("data.ical","ical"); //loading data in the iCal format
//or
scheduler.load("data.json","json"); //loading data in the JSON format

@template:	api_method
@related:
	data_formats.md
    loading_data.md
@relatedsample:
	01_initialization_loading/01_basic_init.html
    01_initialization_loading/05_loading_database.html
@descr: 

Pay attention that in case of dynamic loading the callback function that is passed as the third parameter will be called only during the initial loading of data.
While next portions of data will be loaded later, the callback function won't be called anymore.

If you need  to call the callback function each time data is loaded into Scheduler, you can make use of the api/scheduler_onxle_event.md event.

