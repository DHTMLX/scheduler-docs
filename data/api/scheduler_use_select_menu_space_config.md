use_select_menu_space
=============
@short:'says' events to occupy the whole width of the cell
	

@type: boolean
@default:true
@views:day, week, units
@example:
scheduler.config.use_select_menu_space = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");



@template:	api_config
@descr:

By default, an event occupies just a part of the cell's width and leaves the place for the left-side menu.
Set the option to *false*, and events will start to occupy the whole width. 

The property is available from version 3.5.
