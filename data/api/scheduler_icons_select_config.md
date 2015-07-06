icons_select
=============

@short:stores a collection of icons visible in the side selection menu of the event's box
	

@type: array
@default:['icon_details', 'icon_edit', 'icon_delete']
@views:day, week, units
@example:
scheduler.config.icons_select = ['icon_details', 'icon_delete'];
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "week");


@template:	api_config

@related:
	customizing_edit_select_bars.md
@relatedapi:
	api/scheduler_icons_edit_config.md
@relatedsample:
	02_customization/27_custom_event_box.html

@descr:
<img src="api/iconsSelect_property.png"/>
