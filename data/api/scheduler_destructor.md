destructor
=============



@short: destroys a scheduler instance
	

@params:





@example:
var myScheduler = Scheduler.getSchedulerInstance();
 
//destroying a scheduler instance
myScheduler.destructor();

@template:	api_method
@descr:

The method destroys a scheduler instance and calls the api/scheduler_ondestroy_event.md event.

Calling the destructor will:

- clear the data loaded into a scheduler instance
- destroy the api/scheduler_dataprocessor.md (if it is attached to the scheduler)
- detach the scheduler from DOM
- detach all DOM events attached via the api/scheduler_event.md method

{{note
If you use a package that does not allow creating multiple instances of a scheduler (GPL or Individual editions), calling the scheduler destructor will make scheduler inaccessible until a page is reloaded.
}}

@related:
	multiple_per_page.md#destructorofscheduleranddataprocessorinstances
@relatedapi:
    api/scheduler_ondestroy_event.md
@changelog:
added in version 6.0