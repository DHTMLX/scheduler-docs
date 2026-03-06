---
sidebar_label: scrollUnit
title: "scrollUnit method"
description: "scrolls the specified number of units in the Units view"
---

# scrollUnit
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Scrolls the specified number of units in the Units view

@signature: scrollUnit: (step: number) =\> void

### Parameters

- `step` - (required) *number* - the number of units to scroll (<i>set the positive value to scroll units to the right <br> side,  the negative value - to the left side</i>).

### Example

~~~jsx
scheduler.scrollUnit(5);  //scrolls 5 units to the right 
...
scheduler.scrollUnit(-5); // scrolls 5 units to the left
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 The method requires the [units](guides/extensions-list.md#units) plugin to be activated. 
:::
