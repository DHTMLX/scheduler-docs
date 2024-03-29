onEventCut
=============
@short: fires when the user presses the 'CTRL+X' keyboard command (only with the 'keyboard navigation' extension enabled)
	

@params: 
- ev		object 		the event's object 

@example: 
	
scheduler.attachEvent("onEventCut", function(ev) {
	dhtmlx.message("You've cut the event: <br/><b>"+ev.text+"</b>");
	scheduler.updateEvent(ev.id);
});

@template:	api_event
@descr: 
{{note The event requires the [key_nav](extensions_list.md#keyboardnavigation) extension to be enabled.}}

@related:
	api/scheduler_oneventcopied_event.md
    api/scheduler_oneventpasted_event.md
@relatedsample:
	03_extensions/07_navigation_plugin.html
	03_extensions/01_recurring_events.html
