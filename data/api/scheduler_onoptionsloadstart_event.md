onOptionsLoadStart
=============
@short: fires before a collection of options or sections  starts to be loaded from the server  (the Timeline view only)
	

@example: 
scheduler.attachEvent("onOptionsLoadStart", function (){
	//any custom logic here
});



@template:	api_event
@descr: 
The event fires only when a collection is loaded with the help of dhtxmlConnector or through the [updateCollection](api__scheduler_updatecollection.html) method.
