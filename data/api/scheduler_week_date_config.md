week_date
=============
@short:sets the format of the date in the sub-header of the Month view 
	

@type: string
@default:"%l"
@views:month
@example:
scheduler.config.week_date="%l, %W";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@related:
	settings_format.md
    
@descr:
<img src="api/monthView_properties.png"/>

@apigroup: Date format