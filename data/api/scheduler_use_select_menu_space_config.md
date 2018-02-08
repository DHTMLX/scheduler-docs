use_select_menu_space
=============

@short:
	defines that events occupy the whole width of the cell
	

@type: boolean
@default:true
@views:day, week, units

@example:

scheduler.config.use_select_menu_space = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");



@template:	api_config
@descr:
	By default events occupy the whole width of the cell. Set the option to *false* for an event to occupy just a part of the cell's width and leave space for the left-side menu.

@changelog:
	The property is available from version 3.5.

@apigroup: 
	General setting/View settings
