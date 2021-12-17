onBeforeExternalDragIn
=============
@short:fires before some element starts to be dragged into the scheduler from an outside DHTMLX component (only with dnd extension enabled)
	

@params: 
- source	HTMLElement 	an HTML element that will be dragged into the scheduler
- dhtmlx	object 			a global DHTMLX object
- tArea	HTMLElement		an HTML object of the scheduler's data area
- tNode	HTMLElement		the target scheduler's HTML object (a column in the Day view, a section in the Timeline view, etc.)
- e		Event 	a native event object

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@example:
scheduler.attachEvent("onBeforeExternalDragIn",function(source,dhtmlx,tArea,tNode,e)
{
	//any custom logic here
    return true;
});


@relatedapi:api/scheduler_onexternaldragin_event.md

@template:	api_event
@descr: 

{{note The event requires the [outerdrag](extensions_list.md#outerdrag) plugin to be activated.}}

The event is blockable. Return *false* and  the external element won't be dragged to the scheduler. 
