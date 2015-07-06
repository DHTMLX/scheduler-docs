occurrence_timestamp_in_utc
=============
@short:allows working with recurring events independently of time zones
	
@require:recurring
@type:boolean
@default:false
@example:
scheduler.config.occurrence_timestamp_in_utc = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@related:recurring_events.md
@template:	api_config
@descr:
{{note
Watch out! The option is intended for 'newborn' schedulers and won't affect the already running ones.
}}
- If the option is enabled, timestamps of events are stored as UNIX time.
- The option is available from version 3.5.
