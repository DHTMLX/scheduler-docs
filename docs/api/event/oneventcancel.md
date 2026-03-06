---
sidebar_label: onEventCancel
title: "onEventCancel event"
description: "fires when the user clicks on the 'Cancel' button in the lightbox (edit form)"
---

# onEventCancel

### Description

@short: Fires when the user clicks on the 'Cancel' button in the lightbox (edit form)

@signature: onEventCancel: (id: string, flag: boolean) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `flag` - (required) *boolean* - returns 'true', if the user is cancelling a new event,<br> 'false' - if the edited event already exists

### Example

~~~jsx
scheduler.attachEvent("onEventCancel", function(id, flag){
    //any custom logic here
});
~~~
