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
{{note The template requires the [timeline](extensions_list.md#timeline) plugin to be activated.}}
	
@views:timeline



@related:
	timeline_view_templates.md
    
@relatedapi: api/scheduler_{timelinename}_row_class_template.md

@edition:pro