modalbox
=============


@short:
	calls a modalbox

@params:
- config		object			the modal box's configuration

@returns:

- div			HTMLElement		the div container of the modalbox


@example:
var box = scheduler.modalbox({
	title: "Close",
 	type: "alert-warning"
});

@template:	api_method
@descr:

For details about the supported configuration options of a modalbox, see the integration_with_dhtmlxmessage.md article.


@related: integration_with_dhtmlxmessage.md
@relatedapi:
- api/scheduler_alert.md
- api/scheduler_confirm.md
- api/scheduler_message.md
@changelog:
added in version 6.0