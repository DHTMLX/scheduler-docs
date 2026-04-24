---
sidebar_label: init
title: "init method"
description: "a constructor of a dhtmlxScheduler object"
---

# init

### Description

@short: A constructor of a dhtmlxScheduler object

@signature: init: (container: string|HTMLElement, date?: Date, view?: string) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* - an HTML container (or its id) where a dhtmlxScheduler object will be initialized
- `date` - (optional) *Date* - the initial date of the scheduler (by default, the current date)
- `view` - (optional) *string* - the name of the initial view (by default, "week")

### Example

~~~jsx
scheduler.init("scheduler_here", new Date(2027, 0, 6), "month");
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)
