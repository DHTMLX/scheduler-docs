---
sidebar_label: assert
title: "assert method"
description: "if the specified expression is false, an errorMessage is shown in a red popup at the top right corner of the screen"
---

# assert

### Description

@short: If the specified expression is false, an errorMessage is shown in a red popup at the top right corner of the screen

@signature: assert: (expression: boolean, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *boolean* - true to assert the expression, false - if assertion fails
- `errorMessage` - (required) *string* - an error message that will be shown in a red popup

### Example

~~~jsx
scheduler.attachEvent("onLoadEnd", function(){
   scheduler.assert(scheduler.getTaskCount(), "no data loaded");
});
~~~

### Details

dhtmlxScheduler codebase uses **scheduler.assert()** to detect an invalid state of the component.

An error display can be changed using the [show_errors](api/config/show_errors.md) config.

Errors can be traced programmatically, using the [onError](api/event/onerror.md) event.

### Change log
- added in v6.0
