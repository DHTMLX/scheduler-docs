destroyCalendar
=============
@short: 
	destroys previously created mini-calendar

@params: 
*	name	object	the mini-calendar's object (if not specified, the scheduler attempts <br> to destroy the last created mini calendar)

@require:minical
@example: 
var calendar = scheduler.renderCalendar(...);
...
scheduler.destroyCalendar(calendar);



@template:	api_method

@related:
	minicalendar.md
@relatedapi:
	api/scheduler_rendercalendar.md
@relatedsample:
	05_calendar/01_select.html
    05_calendar/06_recurring_form.html
@descr: 






