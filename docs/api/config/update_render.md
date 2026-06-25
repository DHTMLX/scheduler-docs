---
sidebar_label: update_render
title: "update_render config"
description: "updates the mode when the scheduler fully repaints itself on any action"
---

# update_render

### Description

@short: Updates the mode when the scheduler fully repaints itself on any action

@signature: update_render: boolean

### Example

~~~jsx
scheduler.config.update_render = true;
...     
scheduler.init('scheduler_here',new Date(2027,7,11),"week");
~~~

**Default value:** false

### Details

When an event is being dragged or resized, the scheduler repaints only the affected event for the performance reasons. 
The full repainting happens only when the DnD is finished. 

However, in some cases the position of the dragged event affects the positions of surrounding events, and in order to display all events correctly you need to redraw the whole scheduler. 

<br>

For example, when you have several events in the same cell and is moving some lower one, the scheduler will repaint only the event you are moving and as a result, it may cover some higher events. 
When you will release the mouse button - all events will take the correct position but while moving events they may overlap each other.
Enabling the **update_render** property ensures that all data will be fully repainted after each action.
