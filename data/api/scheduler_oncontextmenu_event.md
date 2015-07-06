onContextMenu
=============
@short: fires when the user calls the context menu by clicking the right mouse button inside the scheduler
	

@params: 
- id 	string		the event's id
- e		Event		a native event object

@example: 
scheduler.attachEvent("onContextMenu", function (id, e){
	//any custom logic here
});



@template:	api_event
@descr: 
if the user clicks on an event, the handler will take the event's id, otherwise - null.


@relatedsample:
	10_integration/01_dhtmlxMenu.html