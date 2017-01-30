onQuickInfo
=============


@short:
	fires when the pop-up edit form appears


@params:
- eventId		string			the event id

@example:
scheduler.attachEvent("onQuickInfo",function(eventId){
    // your code here
});

@require:quick_info
@template:	api_event


@descr:
added in version 4.4

@related:
extensions_list.md#quickinfo
touch_support.md

@relatedapi:
api/scheduler_showquickinfo.md
api/scheduler_hidequickinfo.md
api/scheduler_quick_info_detached_config.md
api/scheduler_onafterquickinfo_event.md

