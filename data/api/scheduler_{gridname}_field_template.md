{gridName}_field
=============

@short:specifies the text in the columns
	
@params:
- field_name		string	the column's id  
- event		object	the event object

@example:
scheduler.templates.grid_field = function(field_name, event){
	return event[field_name];
};

@views:grid

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [grid_view](extensions_list.md#gridview) plugin to be activated.}}

Note, the template isn't applied to columns with  id='date', id='start_date' or id='end_date'. Such columns use 
the <a href="api/scheduler_{gridname}_full_date_template.md">{gridName}_full_date</a> and <a href="api/scheduler_{gridname}_single_date_template.md">{gridName}_single_date</a>
templates, respectively.

@related:
	grid_view_templates.md

@edition:pro