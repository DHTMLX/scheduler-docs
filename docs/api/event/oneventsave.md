---
sidebar_label: onEventSave
title: "onEventSave event"
description: "fires when the user clicks on the 'save' button in the lightbox (edit form)"
---

# onEventSave

### Description

@short: Fires when the user clicks on the 'save' button in the lightbox (edit form)

@signature: onEventSave: (id: string, ev: object, original_ev: object) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `ev` - (required) *object* - an intermediate event's object that contains the lightbox's values. 
- `is_new` - (required) *Date* - returns the date of event's creation (i.e. the current date), if the user is saving a new event.  <i>null</i> - if the event to save already exists

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,ev,is_new){
    if (!ev.text) {
        alert("Text must not be empty");
        return false;
    }
    if (!ev.text.length<20) {
        alert("Text too small");
        return false;
    }
    return true;
})
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)

### Details

The event is blockable and can be used for validation. Return *false* to cancel the default processing.

Please, note:

- When the event fires - values set in the lightbox haven't beed applied to the original event yet and <code>scheduler.getEvent(id)</code> will return you an unmodified instance. 
- The 'ev' object will contain just values that are set by the lightbox, i.e. if the lightbox has just 1 input - the 'ev' object will have only 1 property defined
