getShortcutHandler
=============

@short:
	gets a key navigation shortcut handler

@params:
- shortcut		string			the key name or the name of keys combination for a shortcut (<a href="keyboard_navigation.md#shortcutsyntax">shortcut syntax</a>)
* scope 		string			(optional) the name of the context element to attach the handler function to (<a href="keyboard_navigation.md#scopes">list of scopes</a>)

@returns:
- shortcut_handler			function		the handler of the shortcut call

@example:
var shortcut_handler = scheduler.getShortcutHandler("ctrl+a", "event");

@template:	api_method

@descr:
added in version 5.0

@relatedapi:
api/scheduler_addshortcut.md
api/scheduler_removeshortcut.md
api/scheduler_key_nav_config.md
api/scheduler_key_nav_step_config.md
api/scheduler_focus.md


@related:
keyboard_navigation.md

@relatedsample:
13_accessibility/01_regular_skin_all_views.html

