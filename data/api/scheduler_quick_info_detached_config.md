quick_info_detached
=============
@short:defines whether the event form will appear from the left/right side of the screen or near the selected event
	
@require:quick_info
@type: boolean
@default:true (<i>the event form will appear  near the selected event</i>)
@example:
scheduler.config.quick_info_detached = false;
...
scheduler.init('scheduler_here',new Date(2013,5,30),"day");


@template:	api_config
@descr:


@relatedsample:
	03_extensions/29_quick_info.html
    03_extensions/30_quick_info_detached.html
@related:
	touch_support.md

@apigroup: General settings/Quick info