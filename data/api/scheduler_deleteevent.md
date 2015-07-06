deleteEvent
=============
@short: 
	deletes the specified event

@params: 
- id	string, number	the event's id
@example: 
scheduler.init('scheduler_here',new Date(2009,5,30),"day");
scheduler.parse([
   {id:1, start_date:"06/30/2009 09:00", end_date:"06/30/2009 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2009 12:00", end_date:"06/30/2009 20:00", text:"Task2"},
   {id:3, start_date:"06/30/2009 08:00", end_date:"06/30/2009 12:00", text:"Task3"}
],"json");
...
scheduler.deleteEvent(3);

@template:	api_method

@relatedsample:
	02_customization/16_custom_form.html
    03_extensions/01_recurring_events.html
@relatedapi:
	api/scheduler_addevent.md
    api/scheduler_addeventnow.md
@related:
	adding_events.md

@descr: 

