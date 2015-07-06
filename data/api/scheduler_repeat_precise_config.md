repeat_precise
==============

@short: prevents including past days to events with the 'weekly' recurrence
	

@type: boolean
@default: false
@require: recurring
@example:
scheduler.config.repeat_precise = true;

@related:recurring_events.md
@template:	api_config
@descr:
By default, when the user specifies the 'weekly' recurrence, the scheduler includes the current week to this recurrence, 
regardless of whether the user creates an event after, between or before the included day(s).<br>

For example, the user creates an event on Thursday and sets the 'weekly' repetition on Monday and Wednesday. 
The saved event will contain the current week, i.e. the past Monday and Wednesday, even though it has been created on Thursday. 

If you set the **repeat_precise** option to *true*, the start date of a recurring event 
will be the date of the first real occurrence, i.e. in our example it will be Monday of the next week.