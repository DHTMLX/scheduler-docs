touch
=============
@short:enables/disables the touch support in the scheduler
	

@type: boolean, string
@default:true
@example:
scheduler.config.touch = "force";
...
scheduler.init('scheduler_here',new Date(2013,3,10),"week");

@template:	api_config
@descr:
As a string, the parameter can take the only value - **'force'**.

<br>

So, there are 3 possible values that the parameter can take:

- *true* - the scheduler tries to detect the touch device by analyzing the user-agent string of the browser and, if a  touch device is detected, enables the touch support.
- *'force'* - enables the persistent touch support, no matter what kind of device is used.
- *false* - disables the touch support.

@related:
	touch_support.md
@relatedapi:
	api/scheduler_touch_drag_config.md
    api/scheduler_touch_tip_config.md
    api/scheduler_touch_tooltip_config.md
@relatedsample:
	01_initialization_loading/13_touch_ui.html
    
    
