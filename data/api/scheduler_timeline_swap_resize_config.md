timeline_swap_resize
=============

@short:
	defines that during event resizing the end date of the event can be swapped for the start date (after the end date becomes scheduled before the start one)
	
@default:true
@type: boolean
@example:
scheduler.config.timeline_swap_resize = false;

@require: timeline
@template:	api_config
@descr:
added in version 4.4

If the property is set to *false*, it won't allow you to drag the end date to the left of the start date (and vice versa) when you resize event via drag and drop.

@related:
extensions_list.md#timeline

@edition: pro