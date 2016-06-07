cascade_event_margin
=============

@short:sets the left margin for a cascade of events
	

@type: number
@default:30
@views:day, week, units


@example:
scheduler.config.cascade_event_display = true;
scheduler.config.cascade_event_count = 4;     
scheduler.config.cascade_event_margin = 30; 
...
scheduler.init('scheduler_here',new Date(2009,5,30),"week");



@template:	api_config

@relatedapi:
	api/scheduler_cascade_event_display_config.md
    api/scheduler_cascade_event_count_config.md
@relatedsample:
	02_customization/24_cascade_event_display.html
    
@descr:

<img src="api/cascadeEventmargin_property.png"/>

@apigroup: Events/Cascade events
