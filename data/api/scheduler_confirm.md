confirm
=============

@short:
	calls a confirm message box

@params:
- config		object			the confirm box's configuration

@returns:

- div			HTMLElement		the div container of the confirm box



@example:
var box = scheduler.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        if(result){
            scheduler.message("Yes!");
        }else{
            scheduler.message("No...");
        }
    }
});

@template:	api_method
@descr:
For details about the supported configuration options of a confirm message box, see the integration_with_dhtmlxmessage.md article.

@relatedapi:
- api/scheduler_alert.md
- api/scheduler_message.md
- api/scheduler_modalbox.md

@related:integration_with_dhtmlxmessage.md
@changelog:
added in version 6.0
