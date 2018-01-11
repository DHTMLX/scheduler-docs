onLightboxButton
=============


@short:fires when the user clicks a custom button in the lightbox
	

@params: 
- id		string			the button's id
- node		HTMLElement	 	an HTML element of the clicked button
- e			event	 		a native 'click' event object

@example: 
scheduler.attachEvent("onLightboxButton", function (id, node, e){
	// any custom logic here
});



@template:	api_event
@descr: 
The event fires only for custom buttons at the bottom of the lightbox and doesn't fire
for the default or section buttons.

To check whether the lightbox is currently opened or closed, use the **lightbox_id** property of the state object returned by the api/scheduler_getstate.md method. 
If the lightbox is opened, the method will return the id of the opened event, otherwise 'null' or 'undefined' will be returned:

~~~js
if (scheduler.getState().lightbox_id){
	//the code for the opened lightbox
} else {
	//the code for the closed lightbox
}
~~~


@related:
lightbox_editors_manipulations.md#checkingwhetherthelightboxisopen

@relatedsample:
	02_customization/22_opertions_with_lightbox.html