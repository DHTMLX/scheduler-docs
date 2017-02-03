key_nav_step
=============


@short:
	defines the minimal step (in minutes) for navigating events
	
@type:number    
@require:key_nav
@default:30
 
@example:
scheduler.config.key_nav_step = 40;


@template:	api_config
@descr:

@related:
	extensions_list.md#keyboardnavigation
    keyboard_navigation.md
    
@relatedsample:
	13_accessibility/01_regular_skin_all_views.html

@relatedapi:
api/scheduler_key_nav_config.md
api/scheduler_focus.md
api/scheduler_addshortcut.md
api/scheduler_removeshortcut.md