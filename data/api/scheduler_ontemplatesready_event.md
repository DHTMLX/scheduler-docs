onTemplatesReady
=============

@short:fires when the scheduler templates are initialized
	



@example: 
scheduler.attachEvent("onTemplatesReady", function(){
	//any custom logic here
});

@template:	api_event
@descr: 
The event informs that templates of the scheduler are ready.

It's a good practice to write the code of custom view creation in the handler of the **onTemplatesReady** event. It will guarantee that custom view's templates 
will be ready before scheduler initialization, and custom view will be correctly rendered on the page.



@relatedsample:
	02_customization/07_custom_view.html
    09_api/05_mouse_over_highlight.html