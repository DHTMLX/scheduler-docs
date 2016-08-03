auto_end_date
=============
@short:enables automatic changing of the end event date after changing the start date
	

@type: boolean
@default:false
@example:
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@template:	api_config
@descr:

- The parameter is available from version 2.3.
- The parameter is used only in pair with the api/scheduler_event_duration_config.md option.
- If the parameter is set to *true* then, when you change the start event time or date in the lightbox, the end event time and date will be changed automatically, in order to make the event's duration equal to the value of 
the api/scheduler_event_duration_config.md option.

@relatedapi:
	api/scheduler_event_duration_config.md
@relatedsample:
	02_customization/11_auto_end_date.html
    02_customization/13_single_checkbox_section.html
    
@apigroup: Time, time zones