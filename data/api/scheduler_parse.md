parse
=============

@short: 
	loads data from a client-side resource

@params: 
- data	object	 a string or object which represents data
* type	string	 (<i>'json', 'xml', 'ical'</i>) the data type. The default value - <i>'xml'</i>

@example: 
scheduler.parse([
     { start_date:"2013-05-13 6:00", end_date:"2009-05-13 8:00", text:"Event 1"},
     { start_date:"2013-06-09 6:00", end_date:"2009-06-09 8:00", text:"Event 2"}
],"json");



@template:	api_method
@related:
	data_formats.md
@relatedsample:
	02_customization/01_events_coloring.html
    02_customization/24_cascade_event_display.html
@descr: 


