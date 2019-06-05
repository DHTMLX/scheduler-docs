onBeforeParse
=============


@short:
	fires before data started to be parsed


@params:

@example:
scheduler.init("scheduler_here");
scheduler.attachEvent("onBeforeParse", function(){ 
    //any custom logic here
});
scheduler.parse(events);

@template:	api_event
@descr:

@related:
	loading_data.md

@relatedapi:
api/scheduler_load.md
api/scheduler_parse.md
api/scheduler_onparse_event.md
api/scheduler_onloadstart_event.md
api/scheduler_onloadend_event.md