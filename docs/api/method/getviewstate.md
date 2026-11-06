---
sidebar_label: getViewState
title: "getViewState method"
description: Returns the last completed Scheduler view state
---

# getViewState

### Description

@short: Returns the last completed Scheduler view state

@signature: getViewState(): ViewState | null

### Returns

- `state` - (ViewState | null) - the last published view state, or `null` before the first completed render

### Example

~~~js
const state = scheduler.getViewState();
if (state) {
  console.log(state.mode, state.label);
}
~~~

### Details

Returns the current Scheduler-owned mode, date, date label, and ARIA label, or
`null` before the first completed render. The returned date is a copy. This
state is authoritative over a Toolbar `views` value, including after direct
`updateView()` calls.
