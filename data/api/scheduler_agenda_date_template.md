agenda_date
=============
@short:specifies the date in the header of the view
	
@params:
- start 	Date 	the start date of the view
- end 	Date 	the end date of the view

@example:
//default definition
scheduler.templates.agenda_date = function(start, end) {
 	return '';
};

@returns: 
- text      string       the html text which will be rendered

@require:agenda_view
@views:agenda

@template:	api_template
@descr:

@related:
	agenda_view_templates.md