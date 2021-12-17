drag_out
=============
@short:restrict dragging events from the calling scheduler to any other scheduler(s)
	

@type: boolean
@default:true

@example:
scheduler.config.drag_out = false;//restrict dragging events from this scheduler 
scheduler.init('scheduler_here',new Date(2009,05,30),"week");
scheduler.load("./data/units.xml");
 
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2009,05,30),"week");

@template:	api_config
@descr:
{{note
This property is available for Scheduler PRO ( Commercial, Enterprise and Ultimate licenses ) only
}}

{{note The property requires the [outerdrag](extensions_list.md#outerdrag) plugin to be activated.}}

@related:
	dhtmlx_components_integration.md
    multiple_per_page.md
@relatedapi:
	api/scheduler_drag_in_config.md

@apigroup: Events/Drag-and-Drop operations
	