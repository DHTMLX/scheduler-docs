full_day
=============
@short:enables setting of the event's duration to the full day
	

@type: boolean
@default:false
@example:
scheduler.config.full_day = true;
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");


@template:	api_config
@relatedsample:
	02_customization/12_full_day_event.html
@descr:
The property is available from version 2.3.

If the option is set to *true*, entry fields in the '**Time period**' section of the lightbox are blocked and the time period is set to the full day from **00.00** the current cell date untill **00.00** next day.


