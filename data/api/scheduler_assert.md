assert
=============


@short:
	if the specified expression is false, an errorMessage is shown in a red popup at the top right corner of the screen

@params:

- expression		boolean			true to assert the expression, false - if assertion fails
- errorMessage		string			an error message that will be shown in a red popup



@example:
scheduler.attachEvent("onLoadEnd", function(){
   scheduler.assert(scheduler.getTaskCount(), "no data loaded");
});

@template:	api_method
@descr:
dhtmlxScheduler codebase uses **scheduler.assert()** to detect an invalid state of the component.

An error display can be changed using the api/scheduler_show_errors_config.md config.

Errors can be traced programmatically, using the api/scheduler_onerror_event.md event.

@changelog: added in v6.0