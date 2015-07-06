onLightboxButton
=============
@short:fires when the user clicks on a custom button in the lightbox
	

@params: 
- id	string	the button's id
- node	HTMLElement	 an HTML element of the clicked button
- e		event	 a native 'click' event object

@example: 
scheduler.attachEvent("onLightboxButton ", function (id, node, e){
	//any custom logic here
});



@template:	api_event
@descr: 
The event fires only for custom buttons at the bottom of the lightbox and doesn't fire
for the default or section buttons.

@relatedsample:
	02_customization/22_opertions_with_lightbox.html