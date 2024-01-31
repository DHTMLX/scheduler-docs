onDestroy
=============

@short: fires after scheduler has been cleared by the api/scheduler_destructor.md method
	

@params:

@example:
scheduler.attachEvent("onDestroy", function(){
   alert("free custom resources");
});

scheduler.destructor();

@template:	api_event
@descr:

@relatedapi:
api/scheduler_destructor.md

@changelog: added in v6.0