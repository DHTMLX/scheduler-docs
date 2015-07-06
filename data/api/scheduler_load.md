load
=============
@short: 
	loads data to the scheduler from an external data source

@params: 
- url	string  the server side url (may be a static file or a server side script which outputs data <br>  as XML)
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
