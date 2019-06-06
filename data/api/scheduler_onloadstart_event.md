onLoadStart
=============

@short:
	fires immediately before loading data from the data source has been started
@params:

@example:
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});


@template:	api_event
@descr:

@related:
	loading_data.md
	server_integration.md

@relatedapi:
api/scheduler_load.md
api/scheduler_onloadend_event.md
api/scheduler_onbeforeparse_event.md
api/scheduler_onparse_event.md