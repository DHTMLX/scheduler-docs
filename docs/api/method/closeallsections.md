---
sidebar_label: closeAllSections
title: "closeAllSections method"
description: "closes all sections in the currently active view"
---

# closeAllSections
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Closes all sections in the currently active view

@signature: closeAllSections: () =\> void

### Example

~~~jsx
scheduler.closeAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The method requires the [treetimeline](guides/extensions-list.md#treetimeline) plugin to be activated. 
:::

:::note

If the opened view isn't Timeline in the 'Tree' mode, the method will be ignored.
 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [openAllSections](api/method/openallsections.md)
- [openSection](api/method/opensection.md)
