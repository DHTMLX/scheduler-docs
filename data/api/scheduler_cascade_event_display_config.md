cascade_event_display
=============

@short:sets the 'cascade' display mode
	

@type: boolean
@views:day, week, units
@default:false


@example:
scheduler.config.cascade_event_display = true;
scheduler.config.cascade_event_count = 4;     
scheduler.config.cascade_event_margin = 30; 
...
scheduler.init('scheduler_here',new Date(2009,5,30),"week");
        

@template:	api_config

@relatedapi:
	api/scheduler_cascade_event_count_config.md
    api/scheduler_cascade_event_margin_config.md
@relatedsample:
	02_customization/24_cascade_event_display.html
    
@descr:
By default, events scheduled to the same time are displayed one by one. If you want to present such events as a cascade, set the option to *true*. 

<br>
<img src="api/cascadeEventDisplay_property.png"/>

@apigroup: Events/Cascade events
