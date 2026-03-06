---
sidebar_label: onSaveError
title: "onSaveError event"
description: "fires when some error has happened during data updating"
---

# onSaveError

### Description

@short: Fires when some error has happened during data updating

@signature: onSaveError: (ids: array, response: XMLHttpRequest) =\> void

### Parameters

- `ids` - (required) *array* - an array of events' ids that failed to update
- `response` - (required) *XMLHttpRequest* - an Ajax request object

### Example

~~~jsx
scheduler.attachEvent("onSaveError", function(ids, resp){
    dhtmlx.message("Failed to  update data");
})
~~~

### Details

:::note

The event will be invoked only if you use dataProcessor library for client-server communication.
 
:::
