icons_edit
=============
@short:stores a collection of icons visible in the side edit menu of the event's box
	

@type: array
@default:['icon_save', 'icon_cancel']

@example:

scheduler.config.icons_edit = ['icon_custom', 'icon_save', 'icon_cancel'];
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@views:day, week, units
@related:
	customizing_edit_select_bars.md
@relatedapi:
	api/scheduler_icons_select_config.md
@descr:
<img src="api/iconsSelect_property.png"/>

@apigroup: Events/Select bar
