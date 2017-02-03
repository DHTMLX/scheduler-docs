removeShortcut
=============

@short:
	removes a keyboard shortcut

@params:

- shortcut		string		the key name or the name of keys combination for a shortcut (<a href="keyboard_navigation.md#shortcutsyntax">shortcut syntax</a>)
- scope			object		the element to which the shortcut is attached (<a href="keyboard_navigation.md#scopes">list of scopes</a>)


@example:

// adding a shortcut
scheduler.addShortcut("shift+w", function(e){ 
    var eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");

// removing a shortcut
scheduler.removeShortcut("shift+w","event");

@template:	api_method
@descr:
added in version 4.4

@relatedapi:
api/scheduler_addshortcut.md
api/scheduler_focus.md
api/scheduler_key_nav_config.md
api/scheduler_key_nav_step_config.md

@related:
keyboard_navigation.md

@relatedsample:
13_accessibility/01_regular_skin_all_views.html

