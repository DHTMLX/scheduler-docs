---
title: "Fully Custom Lightbox"
sidebar_label: "Fully Custom Lightbox"
---

# Fully Custom Lightbox

To specify a fully custom lightbox for the scheduler, redefine the [`showLightbox()`](api/method/showlightbox.md) method:

~~~js
scheduler.showLightbox = (id) => {
    // id - id of event
    ... code to show any custom form ...
};
~~~

There are 2 helper methods you can use to simplify the implementation:

- [`startLightbox()`](api/method/startlightbox.md) - shows a custom lightbox in the specified HTML container centered on the screen
- [`endLightbox()`](api/method/endlightbox.md) - closes the lightbox

Assume that you have the `#custom_form` HTML container somewhere on the page. Then you can implement a custom lightbox like this:

~~~js
const customForm = document.getElementById("custom_form");

scheduler.showLightbox = (id) => {
    const event = scheduler.getEvent(id);
    scheduler.startLightbox(id, customForm);
    ...'here you need to set values in the form'...
    // document.getElementById("some_input").value = event.text;
};

// needs to be attached to the 'save' button
const saveForm = () => {
    const event = scheduler.getEvent(scheduler.getState().lightbox_id);
    ...'here you need to retrieve values from the form'...
    // event.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, customForm);
};

// needs to be attached to the 'cancel' button
const closeForm = () => {
    scheduler.endLightbox(false, customForm);
};
~~~

### Related samples

- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
