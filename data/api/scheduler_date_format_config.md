date_format
=============

@short:
sets the date format that is used to parse data from a data set and to send dates back to the server
	

@type:string
@example:
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(2019,0,10),"week");
scheduler.load("/data/events");

@template:api_config
@descr:
This config value is used to generate api/scheduler_parse_date_template.md and api/scheduler_format_date_template.md template functions. 
If you want to use a custom format, you can either change this config, or redefine **parse_date** and **format_date** templates directly.

@default:"%Y-%m-%d %H:%i"
@related:
	settings_format.md
@relatedsample:
	01_initialization_loading/01_basic_init.html
    01_initialization_loading/02_hour_scale_format.html
    
@apigroup: Date format

@relatedapi:
api/scheduler_parse_date_template.md
api/scheduler_format_date_template.md

