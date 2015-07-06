onMouseMove
=============
@short:fires when the mouse cursor is moved over the scheduler
	

@params: 
- id	string	the event's id
- e		Event	a native event object

@example: 
scheduler.attachEvent("onMouseMove", function (id, e){
	//any custom logic here
});



@template:	api_event
@descr: 
If the user moves the cursor over an event, the handler function takes the event's id, otherwise - null.


@relatedsample:
	09_api/06_hightlight_and_single_click_create.html
    10_integration/02_dhtmlxTree_outer_drag.html