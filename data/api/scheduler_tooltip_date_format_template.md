tooltip_date_format
=============
@short:specifies the format of start and end dates displayed in the tooltip

@params:
- date	Date	the date which needs formatting

@example:
scheduler.templates.tooltip_date_format=function (date){
	var formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
}


@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [tooltip](extensions_list.md#tooltip) plugin to be enabled.}}

@relatedapi:
	api/scheduler_tooltip_text_template.md
@related:
	common_templates.md#tooltips