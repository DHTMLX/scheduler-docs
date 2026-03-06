---
sidebar_label: onLimitViolation
title: "onLimitViolation event"
description: "fires when the user tries to set for an event the time that is currently limited/blocked"
---

# onLimitViolation

### Description

@short: Fires when the user tries to set for an event the time that is currently limited/blocked

@signature: onLimitViolation: (id: string, obj: object) =\> void;

### Parameters

- `id` - (required) *string* - the event id
- `obj` - (required) *object* - the event object

### Example

~~~jsx
scheduler.attachEvent("onLimitViolation", function  (id, obj){
    //any custom logic here
});
~~~

### Details

Note, the event is called when the user tries to set for an event the time that is currently limited/blocked through:


- the [limit_start](api/config/limit_start.md) and [limit_end](api/config/limit_end.md) configuration options
- the  [addMarkedTimespan](api/method/addmarkedtimespan.md) method

:::note

If you return 'true' from the handler, the related event won't be blocked and can have non-allowed time.
 
:::
