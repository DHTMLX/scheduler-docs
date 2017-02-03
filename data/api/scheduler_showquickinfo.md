showQuickInfo
=============
@short: displays the pop-up event form for the specified event

@params: 
- id	string 	the event's id

@example: 
var eventId = scheduler.addEvent({
    start_date: "08-06-2013 09:00",
    end_date:   "08-06-2013 11:00",
    text:   "Meeting"
});

window.setTimeout(function(){
	scheduler.showQuickInfo(eventId);	
},1);	


@require:quick_info
@template:	api_method

@descr: 

@related:
	touch_support.md
    extensions_list.md#quickinfo
@relatedapi:
	api/scheduler_hidequickinfo.md
    api/scheduler_quick_info_detached_config.md
    api/scheduler_onafterquickinfo_event.md
    api/scheduler_onquickinfo_event.md



