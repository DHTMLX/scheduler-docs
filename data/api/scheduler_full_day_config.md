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

If the option is set to *true*, entry fields in the '**Time period**' section of the lightbox are blocked and the time period is set to the full day from **00.00** of the current cell date until **00.00** of the next day.

@apigroup: Time, time zones

@changelog:
added in version 2.3