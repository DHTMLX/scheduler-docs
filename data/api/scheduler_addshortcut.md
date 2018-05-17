addShortcut
=============


@short:
	adds a new keyboard shortcut 

@params:

@params:
- shortcut		string			the key name or the name of keys combination for a shortcut (<a href="keyboard_navigation.md#shortcutsyntax">shortcut syntax</a>)
- handler		function		the handler of the shortcut call
- scope 		string			the name of the context element to attach the handler function to (<a href="keyboard_navigation.md#scopes">list of scopes</a>)


@example:

scheduler.addShortcut("shift+w", function(e){ 
    var eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");

@template:	api_method
@descr:
added in version 4.4

In case the third parameter is not set, the handler will be attached to the scheduler scope.

@relatedapi:
api/scheduler_getshortcuthandler.md
api/scheduler_removeshortcut.md
api/scheduler_focus.md
api/scheduler_key_nav_config.md
api/scheduler_key_nav_step_config.md

@related:
keyboard_navigation.md

@relatedsample:
13_accessibility/01_regular_skin_all_views.html