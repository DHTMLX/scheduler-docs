onBeforeQuickInfo
=============


@short:
fires immediately before the Quick Info popup is displayed for an event
	

@params:
id	number|string	the event's id

@example:

scheduler.attachEvent("onBeforeQuickInfo", function(id) {
   if(scheduler.getEvent(id).readonly){
   	return false;
   }
   
   return true;
});

@template:	api_event
@descr:

The event is blockable. Return false to cancel the default processing.


@related:
touch_support.md#quickinfoextension



