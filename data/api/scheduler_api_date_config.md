api_date
=============


@short: defines the date format for the <strong>api_date</strong> template
	

@type: string
@example:
scheduler.config.api_date="%Y-%m-%d %H:%i";

scheduler.init("scheduler_here",new Date(2009,10,1),"week");


@default: "%d-%m-%Y %H:%i"


@template:	api_config

@descr:

@related:
	settings_format.md
@relatedsample:
	03_extensions/14_readonly_event.html
@relatedapi:
	api/scheduler_api_date_template.md

@apigroup: Date format
	