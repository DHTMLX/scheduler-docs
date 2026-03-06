---
sidebar_label: onScaleAdd
title: "onScaleAdd event"
description: "fires after a single view unit (column, section, day cell etc.) has been rendered in the scheduler"
---

# onScaleAdd

### Description

@short: Fires after a single view unit (column, section, day cell etc.) has been rendered in the scheduler

@signature: onScaleAdd: (unit: HTMLElement, date: object) =\> void

### Parameters

- `unit` - (required) *HTMLElement* - an HTML object of the related view unit
- `date` - (required) *object* - the date of the unit

### Example

~~~jsx
scheduler.attachEvent("onScaleAdd", function (unit, date){
    //any custom logic here
});
~~~

### Details

Available views have different units:

- **Day view** - a column with a day (the whole view);
- **Week view** - a column with a day;
- **Month view** - a cell with a day;
- **Units** - a section;
- **Timeline** - a section;
- **Year** - a cell with a day.
