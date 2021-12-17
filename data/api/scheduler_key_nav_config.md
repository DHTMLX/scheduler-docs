key_nav
=============

@short: enables the keyboard navigation in the scheduler
	

@type: boolean
@default:true

@example:

scheduler.config.key_nav = true;

@template:	api_config
@descr:
{{note The property requires the [key_nav](extensions_list.md#keyboardnavigation) extension to be enabled.}}

@related:
	extensions_list.md#keyboardnavigation
    keyboard_navigation.md
@relatedsample:
	13_accessibility/01_regular_skin_all_views.html

@relatedapi:
api/scheduler_key_nav_step_config.md
api/scheduler_focus.md
api/scheduler_addshortcut.md
api/scheduler_getshortcuthandler.md
api/scheduler_removeshortcut.md

@apigroup: Events
	