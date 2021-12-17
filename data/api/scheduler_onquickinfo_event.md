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

@template:	api_event


@descr:
{{note The event requires the [quick_info](extensions_list.html#quickinfo) plugin to be activated.}}

@changelog:
added in version 4.4

@related:
extensions_list.md#quickinfo
touch_support.md

@relatedapi:
api/scheduler_showquickinfo.md
api/scheduler_hidequickinfo.md
api/scheduler_quick_info_detached_config.md
api/scheduler_onafterquickinfo_event.md

