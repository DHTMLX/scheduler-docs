addEvent
=============
@short: 
	adds a new event

@params: 
- event	object	the event object

@returns:
- id	string	the event's id
@example: 
scheduler.addEvent({
	start_date: "16-06-2013 09:00",
	end_date:	"16-06-2013 12:00",
	text:	"Meeting",
	holder:	"John", // userdata
    room:	"5"     // userdata
});



@template:	api_method
@related:
	adding_events.md
@relatedapi:
	api/scheduler_api_date_config.md
    api/scheduler_addeventnow.md
    api/scheduler_deleteevent.md
@relatedsample:
	02_customization/08_validation.html
    02_customization/27_custom_event_box.html
@descr: 
{{note
The method invokes the api/scheduler_oneventadded_event.md or api/scheduler_oneventchanged_event.md event
}}

The event object can have the following properties:

- **start_date** - (*Date,string*) the date, when the event is scheduled to begin. If the property is specified as a string, the "%d-%m-%Y %H:%i" format should be used (to change the default format, 
use the api/scheduler_api_date_config.md option). For [recurring events](recurring_events.md) the value of the **start_date** property must have the Date type.	
- **end_date** - (*Date,string*) the date, when the event is scheduled to be completed. If the property is specified as a string, the "%d-%m-%Y %H:%i" format should be used (to change the default format, 
use the api/scheduler_api_date_config.md option). For [recurring events](recurring_events.md) the value of the **end_date** property must have the Date type.
- **text** - (*string*) the event's text.
- **id** - (*string*) the event's id. If not specified, the id for the event will be generated automatically.
- **userdata** - (*hash*) a collection of custom properties presented as 'key-value' pairs.


