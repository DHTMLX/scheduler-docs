showLightbox
=============

@short: 
	opens the lightbox for the specified event

@params: 
- id	string	the event's id

@example: 
var eventId = scheduler.addEvent({
    start_date: "08-06-2013 09:00",
    end_date:   "08-06-2013 11:00",
    text:   "Meeting"
});
...
scheduler.showLightbox(eventId);



@template:	api_method
@relatedsample:
	02_customization/17_lightbox_header.html
    02_customization/16_custom_form.html
@descr: 

@relatedapi:
api/scheduler_hidelightbox.md



