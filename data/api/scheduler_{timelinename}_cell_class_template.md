{timelineName}_cell_class
=============

@short:specifies the CSS class that will be applied to a cell of the view
	

@params:
- evs	array 	an array of objects of events contained in a cell (defined only in the 'cell' mode)
- date 	Date	the date of a column
- section	object	the section object


@example:
scheduler.templates.timeline_cell_class = function(evs, date, section){
	return "";
};
@template:	api_template
@returns:
- css_class    string     css class for related element
@descr:
	
@require:timeline
@views:timeline


@related:
	timeline_view_templates.md

@edition:pro