parse
=============

@short: 
	loads data from a client-side resource

@params: 
- data	object	 a string or object which represents data


@example: 
scheduler.parse([
     { start_date:"2020-05-13 6:00", end_date:"2020-05-13 8:00", text:"Event 1"},
     { start_date:"2020-06-09 6:00", end_date:"2020-06-09 8:00", text:"Event 2"}
]);



@template:	api_method
@related:
	data_formats.md
@relatedsample:
	02_customization/01_events_coloring.html
    02_customization/24_cascade_event_display.html
@descr: 


### Migration

In v5.2 and upper, scheduler detects the format of data automatically. 

But before v5.2, the method included two parameters:

- **data** - (*object*)	a string or object which represents data;
- **type** - (*string*)	optional, (<i>'json', 'xml', 'ical'</i>) the data type. The default value - <i>'xml'</i>

@relatedapi:
api/scheduler_onbeforeparse_event.md
api/scheduler_onparse_event.md
api/scheduler_parse_date_template.md

@changelog: 
The second **type** parameter of the method has been removed in v5.2.