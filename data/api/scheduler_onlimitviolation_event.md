onLimitViolation
=============
@short:fires when the user tries to set for an event the time that is currently limited/blocked
	

@params: 
- id	string	the event id
- obj	object	the event object

@example: 
	
scheduler.attachEvent("onLimitViolation", function  (id, obj){
    //any custom logic here
});



@template:	api_event
@descr: 

Note, the event is called when the user tries to set for an event the time that is currently limited/blocked through:


- the api/scheduler_limit_start_config.md and api/scheduler_limit_end_config.md configuration options
- the  api/scheduler_blocktime.md or api/scheduler_addmarkedtimespan.md methods

{{note
If you return 'true' from the handler, the related event won't be blocked and can have non-allowed time.

}}

