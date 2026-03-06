---
sidebar_label: renderEvent
title: "renderEvent method"
description: "generates HTML content for a custom event's box"
---

# renderEvent

### Description

@short: Generates HTML content for a custom event's box

@signature: renderEvent: (container: HTMLElement, event: any) =\> boolean

### Parameters

- `container` - (required) *HTMLElement* - the event container
- `event` - (required) *object* - the event object

### Returns
- ` display` - (boolean) - <ul><li><b>true</b> - the scheduler displays a custom form</li><li><b>false</b> - the scheduler displays the default form</li></ul>

### Example

~~~jsx
scheduler.renderEvent = function(container, ev) {
    var container_width = container.style.width;
    var html = "<div class='dhx_event_move my_event_move' style='width:" +
    + container_width + "'></div>";
    ...
    container.innerHTML = html;
    return true; 
}
~~~

### Related samples
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

Note, the method works only for views with the vertical scale, such as Day view, Week view etc.

### Related Guides
- [Custom Event's Box](guides/custom-events-display.md)
