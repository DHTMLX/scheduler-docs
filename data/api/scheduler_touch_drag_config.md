touch_drag
=============
@short:defines the time period in milliseconds that is used to differ the long touch gesture from the scroll gesture
	

@type:number, boolean
@default:500
@example:
scheduler.config.touch_drag = 750;
...
scheduler.init('scheduler_here',new Date(2013,3,10),"week");

@template:	api_config

@related:
	touch_support.md
@relatedapi:
	api/scheduler_touch_config.md
    api/scheduler_touch_tip_config.md
    api/scheduler_touch_tooltip_config.md
    
@descr:
Note, if you set the parameter to *false*, the user won't be able to drag events.

@apigroup: General settings/Touch support