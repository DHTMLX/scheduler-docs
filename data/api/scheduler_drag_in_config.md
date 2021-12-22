drag_in
=============
@short:restrict dragging events to the calling scheduler from any other scheduler(s)
	

@type: boolean
@default:true

@example:
scheduler.init('scheduler_here',new Date(2009,05,30),"week");
scheduler.load("./data/units.xml");
 
 
scheduler2.config.drag_in = false;//restrict dragging events to this scheduler 
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2009,05,30),"week");

@template:	api_config
@descr:

{{note
This property is available for Scheduler PRO (Commercial (since October 6, 2021), Enterprise and Ultimate licenses ) only
}}

{{note The property requires the [outerdrag](extensions_list.md#outerdrag) plugin to be activated.}}

@related:
	dhtmlx_components_integration.md
    multiple_per_page.md
@relatedapi:
	api/scheduler_drag_out_config.md

@apigroup: Events/Drag-and-Drop operations
	