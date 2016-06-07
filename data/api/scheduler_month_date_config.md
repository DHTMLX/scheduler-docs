month_date
=============
@short:sets the format for the header of the Month view 
	

@type:string
@default:"%F %Y"
@views:month

@example:
scheduler.config.month_date = "%F, %Y";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@related:
	settings_format.md
@descr:

<img src="api/monthView_properties.png"/>

@apigroup: Date format
