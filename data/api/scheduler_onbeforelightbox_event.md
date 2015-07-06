onBeforeLightbox
=============

@short:fires immediately before the user opens the lightbox (edit form)

	

@params: 
- id	string	the event's id

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@example:
scheduler.attachEvent("onBeforeLightbox", function (id){
	//any custom logic here
	return true;
});



@template:	api_event
@descr: 
The event is blockable. Return *false* to cancel the default processing (opening of the lightbox).

@relatedsample:
	02_customization/26_linked_selects_in_lightbox.html
    02_customization/29_changing_lightbox_configurations.html