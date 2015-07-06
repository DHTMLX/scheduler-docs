month_events_link
=============
@short:specifies the presentation of the 'View more' link in the cell of the Month view
	
@params:
- date	Date	the date of a month cell
- count	number	the number of events in the cell

@example:
//default definition
scheduler.templates.month_events_link = function(date, count){
	return "<a>View more("+count+" events)</a>";
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


@views: month
@related: 
	month_view_templates.md
	month_view.md#limitingthenumberofeventsinacell
@relatedapi:
	api/scheduler_max_month_events_config.md
    api/scheduler_onviewmoreclick_event.md