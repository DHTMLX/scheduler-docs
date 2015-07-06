onOptionsLoad
=============
@short:fires after a collection of options or sections has been loaded from the server, but isn't parsed yet
	

@example: 
scheduler.attachEvent("onOptionsLoad", function (){
	//any custom logic here
});



@template:	api_event
@descr: 
The event fires only when a collection is loaded with the help of dhtxmlConnector or through the [updateCollection](api__scheduler_updatecollection.html) method.
