tooltip_timeout
=============

@short:sets the timeout in milliseconds before the tooltip is displayed for a task
	
@default:30
@type: number
@example:
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init('scheduler_here',new Date(2023,10,20),"week");


@template:	api_config
@descr:

{{note This option is defined in the **tooltip** extension, so you need to activate the [tooltip](extensions_list.md#tooltip) plugin. Read the details in the tooltips.md article.}}



@relatedapi:
api/scheduler_tooltip_hide_timeout_config.md

@related:
   tooltips.md
