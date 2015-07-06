include_end_by
=============
@short:defines whether the date specified in the 'End by' field should be exclusive or inclusive
	
@require:recurring
@type:boolean
@default:false
@example:
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");

@template:	api_config
@related:recurring_events.md
@relatedapi:
	api/scheduler_repeat_date_config.md
@descr:
By default, the date set in the 'End by' field is exclusive.

For example, if the user specifies value '15.01.2013' in the 'End by' field then:

- if <code>include_end_by = false</code> (default)  - the recurring series will be finished on 14.01.2013. 
- If <code>include_end_by = true</code> - the recurring series will be finished on 15.01.2013
