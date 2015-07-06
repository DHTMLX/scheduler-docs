onSchedulerResize
=============

@short:	fires before the scheduler changes its size

@example: 
	
scheduler.attachEvent("onSchedulerResize", function(){
      //any custom logic here
});



@template:	api_event
@descr: 

The event informs that the size of the scheduler was changed, and data area needs repainting. Normally, you don't need to care about this event: it can be useful only if you create some custom view.

