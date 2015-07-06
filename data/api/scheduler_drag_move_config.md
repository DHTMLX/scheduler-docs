drag_move
=============

@short: enables the possibility to move events by drag-and-drop
	

@type: boolean

@default:true
@views;day, month, timeline, week, weekagenda,units

@example:
scheduler.config.drag_move = false;
...
scheduler.init('scheduler_here',new Date(2013,5,30),"week");

@template:	api_config
@relatedapi:
	api/scheduler_drag_lightbox_config.md
    api/scheduler_drag_resize_config.md
    api/scheduler_drag_create_config.md

@descr: