{timelineName}_cell_value
=============

@short:specifies the number of scheduled events in a cell of the view
	

@params:
- evs	array 	an array of objects of events contained in a cell
- date	Date	the date of a cell
- section	object	the section object


@example:
scheduler.templates.timeline_cell_value = function(evs, date, section){
	return evs?evs.length:"";
};
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note
By default, the template is called only in the 'cell' mode of the Timeline view. But if you enable the **cell_template** config of the [Timeline view](api/scheduler_createtimelineview.md), the template will be called in [all other modes of the view](timeline_view.md#customcontentincells) as well.
}}

	
@require:timeline
@views:timeline


@related:
	timeline_view_templates.md
    
@relatedapi: api/scheduler_{timelinename}_row_class_template.md

@edition:pro