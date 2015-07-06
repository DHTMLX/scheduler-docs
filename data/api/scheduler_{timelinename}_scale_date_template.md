{timelineName}_scale_date
=============
@short:specifies items of the X-Axis
	
@params:
- date	Date	the date which needs formatting

@example:
scheduler.templates.timeline_scale_date = function(date){
   var timeline = scheduler.matrix.timeline;
   var func=scheduler.date.date_to_str(timeline.x_date||scheduler.config.hour_date);
   return func(date);
}

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


	
@require:timeline
@views:timeline


@related:
	timeline_view_templates.md
 
@edition:pro