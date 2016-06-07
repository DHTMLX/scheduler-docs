repeat_date
=============

@short:sets the date format of the 'End by' field in the 'recurring' lightbox
	

@type: string
@default:"%m.%d.%Y"
@require:recurring
@example:
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"month");


@template:	api_config
@related:recurring_events.md
@relatedapi:
	api/scheduler_include_end_by_config.md
@descr:

By default, the date in the 'End by' field is exclusive.

@apigroup: Date format