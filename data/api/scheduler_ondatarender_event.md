onDataRender
=============

@todo: check/complete the related api section

@short:fires after data has been rendered on the page
	
@example:
scheduler.attachEvent("onDataRender", function(){
	alert("Data was rendered on the page")
});

scheduler.init("scheduler_here");
scheduler.parse(demo_events);

@template:	api_event
@descr:

@relatedapi:
    api/scheduler_oneventloading_event.md
	api/scheduler_onschedulerready_event.md
    api/scheduler_onbeforesectionrender_event.md
  