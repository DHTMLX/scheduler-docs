year_x
=============
@short:sets the number of rows in the Year view
	

@type: number

@default:4
@views:year
@example:
scheduler.config.year_x = 5;
scheduler.config.year_y = 5;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"year");

@template:	api_config
@relatedapi:
	api/scheduler_year_y_config.md
@descr:
{{note The property requires the [year_view](extensions_list.md#year) plugin to be activated.}}

{{note The property is ignored in the Material skin. In the Material skin, the number of rows in the Year view is controlled by CSS.}}


@apigroup: Views/Year view
