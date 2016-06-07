drag_create
=============

@short:enables the possibility to create new events by drag-and-drop
	

@type: boolean
@default:true

@example:
scheduler.config.drag_create = false;
...
scheduler.init('scheduler_here',new Date(2013,7,1),"week");
        
@views: day, month, timeline, week,units
@template:	api_config
@descr:

@relatedapi:
	api/scheduler_drag_lightbox_config.md
    api/scheduler_drag_move_config.md
    api/scheduler_drag_resize_config.md
@relatedsample:
	09_api/06_hightlight_and_single_click_create.html

@apigroup: Events/Drag-and-Drop operations
