onParse
=============

@short:
	fires after data was parsed (became available for API) but before it was rendered in the Scheduler


@params:

@example:
scheduler.init("scheduler_here");
scheduler.attachEvent("onParse", function(){alert("Data was parsed")});
scheduler.parse(events);


@template:	api_event
@descr:

@relatedapi:
api/scheduler_load.md
api/scheduler_parse.md
api/scheduler_onbeforeparse_event.md
api/scheduler_onloadstart_event.md
api/scheduler_onloadend_event.md

@related:
	loading_data.md
