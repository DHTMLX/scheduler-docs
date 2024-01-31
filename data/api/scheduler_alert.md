alert
=============


@short:
	calls an alert message box

@params:
- config		object			the alert box's configuration

@returns:

- div			HTMLElement		the div container of the alert box


@example:
var box = scheduler.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});

@template:	api_method
@descr:
For details about the supported configuration options of an alert message box, see the integration_with_dhtmlxmessage.md article.


@relatedapi:
- api/scheduler_confirm.md
- api/scheduler_message.md
- api/scheduler_modalbox.md

@related: integration_with_dhtmlxmessage.md 
@changelog:
added in version 6.0
