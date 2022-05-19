onEventCopied
=============

@short: fires when the user presses the 'CTRL+C' keyboard command (only with the 'keyboard navigation' extension enabled)
	

@params: 
- ev		object 		the object of the copied event 

@example: 
	
scheduler.attachEvent("onEventCopied", function(ev) {
	dhtmlx.message("You've copied the event: <br/><b>"+ev.text+"</b>");
	scheduler.updateEvent(ev.id);
});

@template:	api_event
@descr: 
{{note The event requires the [key_nav](extensions_list.md#keyboardnavigation) extension to be enabled.}}

@related:
	api/scheduler_oneventcut_event.md
    api/scheduler_oneventpasted_event.md

@relatedsample:
	03_extensions/07_navigation_plugin.html
	03_extensions/01_recurring_events.html
    09_api/02_dhtmlx_message.html