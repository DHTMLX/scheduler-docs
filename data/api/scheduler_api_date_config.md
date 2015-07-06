api_date
=============


@short: sets the date format that will be used by the addEvent() method to parse the start_date, end_date properties in case they are specified as strings
	

@type: string
@example:
scheduler.config.api_date="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(2009,10,1),"week");

scheduler.addEvent({
	id:2,
	start_date:"2009-11-20 15:00",
	end_date:"2009-11-25 19:00",
	text:"New event"
});


@default: %d-%m-%Y %H:%i


@template:	api_config

@descr:

@related:
	settings_format.md
@relatedsample:
	03_extensions/14_readonly_event.html
@relatedapi:
	api/scheduler_addevent.md 