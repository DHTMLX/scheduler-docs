onBeforeEventPasted
=============


@short: fires before the user presses the 'CTRL+V' keyboard command
	

@params:
- isCopy			boolean 		indicates whether the event was copied or cut before pasting. The <em>true</em> value 'says' that the event was copied
- pasted_ev			object			the object of the new data item (the event that is created after pasting)
- original_ev		object			the object of the original data item (the event that was copied/cut)

@returns:

- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
scheduler.attachEvent("onBeforeEventPasted", function(isCopy,pasted_ev,original_ev) {
    // here you can modify `pastedEvent`
    return true; 
});

@template:	api_event
@descr:
The 'keyboard navigation' extension should be enabled.

@relatedapi: api/scheduler_oneventpasted_event.md
