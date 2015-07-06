load_date
=============
@short:sets the format of server request parameters 'from', 'to' in case of dynamic loading
	

@type: string
@default:"%Y-%m-%d"

@example:
scheduler.config.load_date = "%Y.%m.%d";
scheduler.init('scheduler_here',new Date(2009,10,1),"month");

scheduler.setLoadMode("month");
scheduler.load("data/events.php");

@relatedapi:
	api/scheduler_setloadmode.md
    api/scheduler_load_format_template.md
@related:
	loading_data.md#dynamicloading
@template:	api_config
@descr:


