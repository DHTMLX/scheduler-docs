---
sidebar_label: onLoadError
title: "onLoadError event"
description: "fires if the scheduler has failed to parse data, or if the server has returned 4xx or 5xx response status"
---

# onLoadError

### Description

@short: Fires if the scheduler has failed to parse data, or if the server has returned 4xx or 5xx response status

@signature: onLoadError: (response: XMLHttpRequest) =\> void

### Parameters

- `response` - (required) *XMLHttpRequest* - an Ajax request object

### Example

~~~jsx
scheduler.attachEvent("onLoadError", function(response){
    dhtmlx.message("Failed to load data");
});
~~~

### Details

The event is invoked by the [parse](api/method/parse.md) and [load](api/method/load.md) methods.

In case the event is invoked by the **parse** method, the handler function will take as a parameter an object with the *responseText* property, which will contain data to be parsed as a value:

~~~js
{
    responseText: parseArgument
}
~~~
