onEventPasted
=============

@short: fires when the user presses the 'CTRL+V' keyboard command
	

@params: 
- isCopy			boolean 		indicates whether the event was copied or cut before pasting. The <em>true</em> value 'says' that the event was copied
- pasted_ev			object			the object of the new data item (the event that is created after pasting)
- original_ev		object			the object of the original data item (the event that was copied/cut)

@example: 
scheduler.attachEvent("onEventPasted", function(isCopy, pasted_ev, original_ev) {
	//any custom logic here
});



@template:	api_event
@descr: 
The 'keyboard navigation' extension should be enabled.

@require: key_nav

@related:
    api/scheduler_oneventcopied_event.md
	api/scheduler_oneventcut_event.md

@relatedsample:
	03_extensions/07_navigation_plugin.html
