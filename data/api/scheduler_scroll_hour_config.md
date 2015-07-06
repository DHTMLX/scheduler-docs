scroll_hour
=============
@short:sets the initial position of the vertical scroll in the scheduler (an hour in the 24-hour clock format)
	

@type: number
@example:
//the scheduler will display the current day scrolled to the current time initially
scheduler.config.scroll_hour = new Date().getHours();
...
scheduler.init('scheduler_here', new Date(), "week");
            
@default:0 (i.e. the scheduler displays the hours scale from the midnight - 00:00)
@template:	api_config
@views: day, week, units
@descr:

