tooltip_hide_timeout
=============
@short:sets the length of time in milliseconds before the tooltip hides
	

@type:number
@example:

scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init('scheduler_here',new Date(2023,10,20),"week");

@template:	api_config
@descr:

{{note This option is defined in the **tooltip** extension, so you need to activate the [tooltip](extensions_list.md#tooltip) plugin. Read the details in the tooltips.md article.}}




@related:
   tooltips.md
@relatedapi:
   api/scheduler_tooltip_timeout_config.md