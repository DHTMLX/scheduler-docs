---
sidebar_label: onLightboxButton
title: "onLightboxButton event"
description: "fires when the user clicks a custom button in the lightbox"
---

# onLightboxButton

### Description

@short: Fires when the user clicks a custom button in the lightbox

@signature: onLightboxButton: (id: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - the button's id
- `node` - (required) *HTMLElement* - an HTML element of the clicked button
- `e` - (required) *event* - a native 'click' event object

### Example

~~~jsx
scheduler.attachEvent("onLightboxButton", function (id, node, e){
    // any custom logic here
});
~~~

### Related samples
- [Setting/getting values of lightbox's controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)

### Details

The event fires only for custom buttons at the bottom of the lightbox and doesn't fire
for the default or section buttons.

To check whether the lightbox is currently opened or closed, use the **lightbox_id** property of the state object returned by the [getState](api/method/getstate.md) method. 
If the lightbox is opened, the method will return the id of the opened event, otherwise 'null' or 'undefined' will be returned:

~~~js
if (scheduler.getState().lightbox_id){
    //the code for the opened lightbox
} else {
    //the code for the closed lightbox
}
~~~

### Related Guides
- [Manipulations with Lightbox](guides/lightbox-editors-manipulations.md#checking-whether-the-lightbox-is-opened)
