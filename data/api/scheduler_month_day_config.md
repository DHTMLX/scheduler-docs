month_day
=============
@short:sets the format for the day in the cells of the Month and Year views 
	

@type: string
@default:"%d"
@views:month, year
@example:
scheduler.config.month_day="%j";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@related:
	settings_format.md
@descr:
<img src="api/monthView_properties.png"/>

@apigroup: Date format
