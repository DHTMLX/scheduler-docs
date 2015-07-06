onOptionsLoadFinal
=============
@short: fires after loading of an options(sections) collection  is complete (the Timeline view only)

@example: 
scheduler.attachEvent("onOptionsLoadFinal", function (){
	//any custom logic here
});



@template:	api_event
@descr: 
The event fires only when a collection is loaded with the help of dhtxmlConnector or through the [updateCollection](api__scheduler_updatecollection.html) method.
