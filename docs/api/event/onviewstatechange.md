---
sidebar_label: onViewStateChange
title: "onViewStateChange event"
description: Fires after Scheduler publishes a view state
---

# onViewStateChange

### Description

@short: Fires after Scheduler publishes a view state

@signature: onViewStateChange: (state: ViewState) => void

### Parameters

- `state` - (required) *ViewState* - the published Scheduler view state

### Example

~~~js
scheduler.attachEvent("onViewStateChange", state => {
    document.title = state.label;
});
~~~

### Details

Fires after Scheduler publishes its mode, date, date label, or ARIA view state.
It receives the same shape as `getViewState()` and also runs after a direct
`updateView()` call.
