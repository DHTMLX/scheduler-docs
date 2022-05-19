timeline_swap_resize
=============

@short:
	defines that during event resizing the end date of the event can be swapped for the start date (after the end date becomes scheduled before the start one)
	
@default:true
@type: boolean
@example:
scheduler.config.timeline_swap_resize = false;

@template:	api_config
@descr:
{{note The property requires the [timeline](extensions_list.md#timeline) plugin to be enabled.}}

If the property is set to *false*, it won't allow you to drag the end date to the left of the start date (and vice versa) when you resize event via drag and drop.

@changelog:
added in version 4.4

@related:
extensions_list.md#timeline

@edition: pro