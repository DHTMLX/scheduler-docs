Keyboard Navigation
=======================

You can get access to Scheduler and its elements via keys or keys' combinations. This article will give you all the necessary information 
on the peculiarities of keyboard navigation with Scheduler, including focus behavior, usage of ready shortcuts and creation of custom ones.

##Focus behavior during keyboard navigation

###Focus on Scheduler

When the Tab key is pressed, Scheduler gets focus the same as any usual element. 
After that to navigate Scheduler, you can use the arrow keys and other ones. 

When the Tab key is pressed for the second time, the focus leaves Scheduler and is moved to some other place on the page.

###Focus on a modal window

When a modal window (a lightbox, a confirm window) opens, the focus moves from the Scheduler to this window and 
navigation happens inside of it as in a simple form. When the window is closed, focus goes back to the Scheduler.

To return focus back to Scheduler, you need to use the api/scheduler_focus.md method. 
When Scheduler gets focus again, it places the focus on the active element inside, or on the first row, or on the latest selected element.

The default navigation actions in a modal window are as follows:

- *Enter* - confirm and close
- *Escape* - close without any changes

If the focus is set on some button of the form, pressing *Space* or *Enter* will call pressing the button under focus and not the action.

##Enabling the functionality

In order to use keyboard navigation in Scheduler, you need to include the **ext/dhtmlxscheduler_key_nav.js** extension on the page. 

~~~html
<script src="../../codebase/ext/dhtmlxscheduler_key_nav.js" type="text/javascript" 
	charset="utf-8"></script>
~~~

##Scopes

An action called on a key click depends on the context. It means that different actions can be attached to different elements (scopes). 
There are the following context elements (scopes) in Scheduler:

- **"scheduler"** - The whole scheduler
- **"timeSlot"** - A time slot
- **"event"** - An event
- **"minicalDate"** - A date in the mini calendar
- **"minicalButton"** - An arrow button in the mini calendar

If one and the same shortcut is attached to several scopes, the more specific shortcut will trigger. It means that if the same shortcut is attached 
to Scheduler and to its element, the shortcut attached to an element will be called rather than the shortcut attached to the whole Scheduler. 

###Adding a shortcut

To create a new keyboard shortcut, you need to use the api/scheduler_addshortcut.md method and pass three parameters to it:

- shortcut - (string) a new shortcut key or keys' combination name
- handler - (function) a handler function that will be called on the shortcut call 
- scope - (string) the name of the context element to attach the handler function to

~~~js
scheduler.addShortcut("shift+w", function(e){ 
    var eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

###Removing a shortcut

To remove a shortcut from the scope, you need to use the api/scheduler_removeshortcut.md method. The method takes two parameters:

- shortcut - (string) the name of the key or the keys' combination for shortcut 
- scope - (string) the name of the context element to which the shortcut is attached

~~~js
scheduler.removeShortcut("shift+w","event");
~~~

###Getting a shortcut handler

You can get the handler of the keyboard shorcut with the help of the method api/scheduler_getshortcuthandler.md. It takes two parameters:

- **shortcut** - (*string*) the name of the key or the keys' combination for shortcut 
- **scope** - (*string*) the name of the context element to which the shortcut is attached

~~~js
var shortcut_handler = scheduler.getShortcutHandler("shift+w","event");
~~~

The method returns a function, which presents the handler of the shortcut call. 


##Shortcut syntax

A keyboard shortcut can consist of the following keys or key combinations:

- a modifier key + a character key ("ctrl+a");
- a modifier key + a non-character key ("ctrl+space");
- a character key ("a");
- a non-character key ("space")

There can be several key combinations for one action. In this case, all the combinations are listed with comma delimiter: "ctrl+a, ctrl+space".

###The list of supported keys to use in shortcuts

- modifier keys: **shift**, **alt**, **ctrl**, **meta**;
- non-character keys: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**,
**insert**, **plus**, **f1-f12**.

##Existing shortcuts 

There is a set of ready shortcuts that you can use to navigate Scheduler:

###General keyboard shortcuts

- **Tab** -  puts focus on Scheduler
- **Alt+1,Alt+2,Alt+3,...** - switch between views
- **Ctrl+Left/Right** - move to the next/previous date
- **Ctrl+Up/Down** - scroll data area
- **Ctrl+Enter** - create a new event
- **E, Shift+E** - select next/previous event
- **Home** - switch to the current date
- **Ctrl+C, Ctrl+X, Ctrl+V** - copy/cut/paste an event

###Shortcuts for Time slots

- **Up/Down/Left/Right Arrow Keys** - navigate over time slots 
- **Shift+Up/Down/Left/Right Arrow Keys** - extend a time slot 
- **Enter** - create an event in the selected time slot

###Shortcuts for Events

- **Up/Down/Left/Right Arrow Keys** - go to a time slot
- **Enter** - open the lightbox


###Shortcuts for Mini Calendar

- **Tab** -  puts focus on Mini Calendar
- **Up/Down/Left/Right Arrow Keys** - navigate over buttons/cells
- **Enter** - click on a button/cell


{{sample13_accessibility/01_regular_skin_all_views.html}}

{{sample
	03_extensions/07_navigation_plugin.html
}}


###Related events

- api/scheduler_oneventcopied_event.md
- api/scheduler_oneventcut_event.md
- api/scheduler_oneventpasted_event.md

@linkclass:hidden