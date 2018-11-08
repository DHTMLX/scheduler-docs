limit_time_select
=============

@short:sets max and min values of time selector in the lightbox to the values of the 'last_hour' and 'first_hour' options
	

@type:boolean

@example:
scheduler.config.limit_time_select = true;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");

@default:false

@template:	api_config
@descr:
@relatedapi:
	 api/scheduler_last_hour_config.md
     api/scheduler_first_hour_config.md

@apigroup: Lightbox
