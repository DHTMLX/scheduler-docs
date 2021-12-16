{timelineName}_second_scale_date
=============

@short:specifies items of the second X-Axis
	
@params:
- date	Date	the date which needs formatting

@example:
scheduler.templates.timeline_second_scale_date = function(date){
	var timeline = scheduler.matrix.timeline;
	var func = scheduler.date.date_to_str(
    	(timeline.second_scale && timeline.second_scale.x_date)?
        timeline.second_scale.x_date:scheduler.config.hour_date
    );
	return func(date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [timeline](extensions_list.md#timeline) plugin to be activated.}}

@views:timeline


@related:
	timeline_view_templates.md

@edition:pro