wai_aria_application_role
=============


@short: 
	defines whether role="application" will be used for the main scheduler container and minicalendar elements 
	
@default:true
@type:boolean 
@example:
scheduler.config.wai_aria_application_role = true;
...
scheduler.init("scheduler_here");

@template:	api_config
@descr:
added in version 5.0

Defines how screen readers interact with the scheduler. 


@related:
accessibility.md