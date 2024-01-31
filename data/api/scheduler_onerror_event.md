onError
=============

@short:
	fires when api/scheduler_assert.md receives the 'false' value, i.e. when assertion fails

@params:
- errorMessage		string			a string with an error from the api/scheduler_assert.md method

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
scheduler.attachEvent("onError", function(errorMessage){
	scheduler.message({
    	text:"Error"
    });
    return true;
});

@template:	api_event
@descr:
The event is blockable. Returning false will prevent the default behavior (showing error message in a red box at the top right corner)

@changelog:

added in version 6.0


