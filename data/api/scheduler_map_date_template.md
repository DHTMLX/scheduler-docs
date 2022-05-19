map_date
=============
@short:specifies the date in the header of the view
	

@params:
- start 	Date 	the start date of the view
- end 	Date 	the end date of the view

@example:
//default definition
scheduler.templates.map_date = function(start, end) {
 	return '';
};

@views:map


@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

@related:
	map_view_templates.md
@relatedsample:
	03_extensions/23_map_view_timeframes.html
	