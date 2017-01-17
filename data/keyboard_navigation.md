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

In order to use keyboard navigation in Scheduler, you need to include the **ext/dhtmlxscheduler_keyboard_navigation.js** extension on the page. 
There are two variants of keyboard navigation available:

- navigation by task rows

To enable it, set the api/scheduler_keyboard_navigation_config.md property to true.

- navigation by task cells  

To use this type of navigation, set the api/scheduler_keyboard_navigation_cells_config.md property to true.

##Scopes

An action called on a key click depends on the context. It means that different actions can be attached to different elements (scopes). 
There are the following context elements (scopes) in Scheduler:

- **"scheduler"** - The whole scheduler
- **"taskRow"** - A row with a task
- **"taskCell"** - A cell of the row with a task
- **"headerCell"** - A cell of the header

If one and the same shortcut is attached to several scopes, the more specific shortcut will trigger. It means that if the same shortcut is attached 
to Scheduler and to its element, the shortcut attached to an element will be called rather than the shortcut attached to the whole Scheduler. 

###Adding a shortcut

To create a new keyboard shortcut, you need to use the api/scheduler_addshortcut.md method and pass three parameters to it:

- shortcut - (string) a new shortcut key or keys' combination name
- handler - (function) a handler function that will be called on the shortcut call 
- scope - (string) the name of the context element to attach the handler function to

~~~js

~~~

###Removing a shortcut

To remove a shortcut from the scope, you need to use the api/scheduler_removeshortcut.md method. The method takes two parameters:

- shortcut - (string) the name of the key or the keys' combination for shortcut 
- scope - (string) the name of the context element to which the shortcut is attached

~~~js

~~~

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

###General keyboard shortcuts:

- **Tab** -  move browser focus to Scheduler or MiniCalendar element 
<br><br>
- **Alt+Up/Down** - scroll Scheduler vertically
- **Alt+Left/Right** - scroll Scheduler horizontally
- **Ctrl+Enter** - create a new event
- **Ctrl+Z** - undo the action
- **Ctrl+R** - redo the action

###Shortcuts for MiniCalendar

- **Up/Down/Left/Right Arrow Keys** - navigate over MiniCalendar elements
- **Enter** - select date or press the Arrow button 

###Shortcuts for Scheduler

- **Up/Down/Left/Right Arrow Keys** - navigate between time slots (similar to MS Outlook)
- **Shift+Down/Up Arrow Keys** - allocate the time slot 
- **Enter** - create an event in the allocated time slot
- **Alt+1, Alt+2, Alt+3,...** - switch between modes of scheduler (order of views is the same as the order of tabs in the header of calendar)
- **Alt+Left/Right Arrow Keys** - change the displayed date
- **Home** - switch to the current date

###Schortcuts for events

- **E** - select next event, 
- **Shift+E** - select previous event, press enter to open the details form for a selected event
- **Enter** - to open the details form for a selected event



{{sample 02_extensions/17_keyboard_navigation_cell.html}}



Key_nav extension
------------------

The keyboard navigation functionality is included into the **ext/dhtmlxscheduler_key_nav.js** extension.

###Keyboard commands

Once the extension file is included on the page, you can use the following command to navigate through the scheduler:


<table class="list" cellspacing="0" cellpadding="5" border="0">
	<thead>
	<tr>
		<th>
			Key 
		</th>
		<th>
			Description
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>Right arrow key</td>
        <td>scrolls to the next time period (next month, week, day, etc. depending on the currently active view)</td>
    </tr>
	<tr>
		<td>Left arrow key</td>
        <td>scrolls to the previous time period (last month, week, day, etc. depending on the currently active view)</td>
    </tr>
	<tr>
		<td>Ctrl + C</td>
        <td>copies the selected event to the clipboard</td>
    </tr>
	<tr>
		<td>Ctrl + V</td>
        <td>pastes the previously copied event from the clipboard to the scheduler</td>
    </tr>
	<tr>
		<td>Ctrl + X</td>
        <td>cuts the selected event</td>
    </tr>
    </tbody>
</table>

{{sample
	03_extensions/07_navigation_plugin.html
}}


###Related events

- api/scheduler_oneventcopied_event.md
- api/scheduler_oneventcut_event.md
- api/scheduler_oneventpasted_event.md


@todo: 

add links to API, check extension name, update scopes, shortcuts examples, links to samples