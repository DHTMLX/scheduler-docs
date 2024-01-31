tooltip_offset_y
=============

@short:sets the top (if positive) offset of the tooltip's position
	

@type: number
@default:20
@example:
scheduler.config.tooltip_offset_y = 40;

scheduler.init('scheduler_here',new Date(2023,10,20),"week");

@template:	api_config
@descr:

{{note This option is defined in the **tooltip** extension, so you need to activate the [tooltip](extensions_list.md#tooltip) plugin. Read the details in the tooltips.md article.}}


@related:
   tooltips.md
@relatedapi:
   api/scheduler_tooltip_offset_x_config.md

