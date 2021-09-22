onOptionsLoad
=============
@short: fires after sections of the Timeline/Units view have been updated
	

@example: 
scheduler.attachEvent("onOptionsLoad", function (){
	//any custom logic here
});



@template:	api_event
@descr: 
When this event is fired, the following happens:

- Timeline/Unit view recalculates visible sections based on the current value of the [y_unit](timeline_view.md#initialization) or [list](units_view.md#initialization) property respectively;
- [scheduler.resetLightbox](api/scheduler_resetlightbox.md) is called;
- [scheduler.setCurrentView](api/scheduler_setcurrentview.md) is called.

The event is fired in several cases:

- On initialization of the Timeline/Units view, when sections are parsed for the first time;
- When sections are loaded with the [data](data_formats.md#jsonwithcollections);
- Whenever [scheduler.updateCollection](api/scheduler_updatecollection.md) is called.