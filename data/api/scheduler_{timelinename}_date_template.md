{timelineName}_date
=============
@short:specifies the date in the header of the view
	

@params:
- date1 	Date	 the date when an event is scheduled to begin
- date2 	Date	the date when an event is scheduled to be completed


@example:
scheduler.templates.timeline_date = function(date1, date2){
	if (date1.getDay()==date2.getDay() && date2-date1<(24*60*60*1000))
			return scheduler.templates.day_date(date1);
		return scheduler.templates.week_date(date1, date2); 
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

{{note The template requires the [timeline](extensions_list.md#timeline) plugin to be activated.}}

Note, if the [timeline_date](api__scheduler_%7Btimelinename%7D_date_template.html) template isn't specified, the date in the header will be set according to the [week_date](api__scheduler_week_date_template.html) template.

@views:timeline


@related:
	timeline_view_templates.md

@edition:pro