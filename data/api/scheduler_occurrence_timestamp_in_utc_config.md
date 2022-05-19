occurrence_timestamp_in_utc
=============
@short:allows working with recurring events independently of time zones

@type:boolean
@default:false
@example:
scheduler.config.occurrence_timestamp_in_utc = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@related:recurring_events.md
@template:	api_config
@descr:
{{note The property requires the [recurring](extensions_list.md#recurring) extension to be enabled.}}

{{note
Watch out! The option is intended for 'newborn' schedulers with no existing recurring events.
Applying to the scheduler with already existing recurring events will break them.
}}
- If the option is enabled, timestamps of events are stored as UNIX time.
- The option is available from version 3.5.

@apigroup: Time, time zones