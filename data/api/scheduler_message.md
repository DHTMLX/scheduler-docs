message
=============


@short:
	calls a message box of the specified type

@params:
- config		object			the message box's configuration

@returns:

- div			HTMLElement		the div container of the message box


@example:
var box = scheduler.message({ 
    type:"confirm-warning", 
    text:"Are you sure you want to do it?"
});

@template:	api_method
@descr:

For details about the supported configuration options of a message box, see the integration_with_dhtmlxmessage.md article.


@relatedapi:
- api/scheduler_alert.md
- api/scheduler_confirm.md
- api/scheduler_modalbox.md
- 
@related:integration_with_dhtmlxmessage.md
@changelog:
added in version 6.0