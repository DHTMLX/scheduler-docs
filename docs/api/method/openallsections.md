---
sidebar_label: openAllSections
title: "openAllSections method"
description: "opens all sections in the currently active view (if the opened view isn't Timeline in the 'Tree' mode - the method will be ignored)"
---

# openAllSections

### Description

@short: Opens all sections in the currently active view (if the opened view isn't Timeline in the 'Tree' mode - the method will be ignored)

@signature: openAllSections: () =\> void

### Example

~~~jsx
scheduler.openAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The method requires the [treetimeline](guides/extensions-list.md#treetimeline) plugin to be activated. 
:::

:::note

The method is used for the Tree mode only
 
:::

### Related API
- [closeAllSections](api/method/closeallsections.md)
- [closeSection](api/method/closesection.md)
- [openSection](api/method/opensection.md)
