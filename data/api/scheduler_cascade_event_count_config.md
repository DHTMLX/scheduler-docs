cascade_event_count
=============

@short:sets the maximum number of events in a cascade
	

@type: number
@example:
// how many events will be displayed in a cascade (max)
scheduler.config.cascade_event_count = 4; 

@template:	api_config
@default:4
@views:day, week, units
@descr:
Events 'exceeding' the set value will be drawn over the cascade. 



@relatedapi:
	api/scheduler_cascade_event_display_config.md
    api/scheduler_cascade_event_margin_config.md
@relatedsample:
	02_customization/24_cascade_event_display.html

@apigroup: Events/Cascade events
	