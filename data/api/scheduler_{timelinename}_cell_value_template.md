{timelineName}_cell_value
=============

@short:specifies the number of scheduled events in a cell of the view
	

@params:
- evs	array 	an array of objects of events contained in a cell
- date	Date	the date of a cell



@example:
scheduler.templates.timeline_cell_value = function(evs, date){
	return evs?evs.length:"";
};
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note
The Timeline view, 'tree' mode only
}}

	
@require:timeline
@views:timeline


@related:
	timeline_view_templates.md

@edition:pro