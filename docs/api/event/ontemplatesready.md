---
sidebar_label: onTemplatesReady
title: "onTemplatesReady event"
description: "fires when the scheduler templates are initialized"
---

# onTemplatesReady

### Description

@short: Fires when the scheduler templates are initialized

@signature: onTemplatesReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onTemplatesReady", function(){
    //any custom logic here
});
~~~

### Related samples
- [Custom view](https://docs.dhtmlx.com/scheduler/samples/02_customization/07_custom_view.html)
- [Pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/05_mouse_over_highlight.html)

### Details

The event informs that templates of the scheduler are ready.

It's a good practice to write the code of custom view creation in the handler of the **onTemplatesReady** event. It will guarantee that custom view's templates 
will be ready before scheduler initialization, and custom view will be correctly rendered on the page.
