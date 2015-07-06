onEventSave
=============
@short:fires when the user clicks on the 'save' button in the lightbox (edit form)
	

@params: 
- id	string		the event's id
- ev   object	an intermediate event's object that contains the lightbox's values. 

- is_new	Date 	returns the date of event's creation (i.e. the current date), if the user is saving a new event.  <i>null</i> - if the event to save already exists

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

@example: 
scheduler.attachEvent("onEventSave",function(id,ev,is_new){
	if (!ev.text) {
		alert("Text must not be empty");
		return false;
	}
	if (!ev.text.length<20) {
		alert("Text too small");
		return false;
	}
	return true;
})


@template:	api_event
@descr: 
The event is blockable and can be used for validation. Return *false* to cancel the default processing.

Please, note:

- When the event fires - values set in the lightbox haven't beed applied to the original event yet and <code>scheduler.getEvent(id)</code> will return you an unmodified instance. 
- The 'ev' object will contain just values that are set by the lightbox, i.e. if the lightbox has just 1 input - the 'ev' object will have only 1 property defined


@relatedsample:
	02_customization/08_validation.html