---
sidebar_label: unmarkTimespan
title: "unmarkTimespan method"
description: "removes marking/blocking set by the markTimespan() method"
---

# unmarkTimespan

### Description

@short: Removes marking/blocking set by the markTimespan() method

@signature: unmarkTimespan: (divs: HTMLElement|any[]) =\> void

### Parameters

- `divs` - (required) *HTMLElement | array* -     a timespan to remove marking/blocking from (or an array of timespans)

### Example

~~~jsx
var spanDIV = scheduler.markTimespan({  
    days:  [0,6],  
    zones: "fullday"
});

scheduler.unmarkTimespan(spanDIV);
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)

### Details

:::note

Available from version 3.5
 
:::

:::note
 The method requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::

### Related API
- [markTimespan](api/method/marktimespan.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
