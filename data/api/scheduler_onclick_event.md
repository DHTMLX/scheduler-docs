onClick
=============


@short: fires when the user clicks the left mouse button on an event
	

@params: 
- id	string	the event's id
- e		Event  a native event object

@example: 
scheduler.attachEvent("onClick", function (id, e){
       //any custom logic here
       return true;
  });

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@template:	api_event
@descr: 
The event is blockable. If non-true value is returned from the handler, the default reaction will be blocked ( by default, the selection bar appears).

@relatedsample:
	02_customization/10_without_toolbar.html
    03_extensions/12_readonly_form.html
    
@related: lightbox_editors_manipulations.md#openingthelightboxonasingleclick