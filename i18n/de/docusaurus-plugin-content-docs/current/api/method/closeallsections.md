---
sidebar_label: "closeAllSections"
title: "closeAllSections method"
description: "schließt alle Sections in der aktuell aktiven Ansicht"
---

# closeAllSections
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Schließt alle Sections in der aktuell aktiven Ansicht

@signature: closeAllSections: () =\> void

### Example

~~~jsx
scheduler.closeAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Die Methode funktioniert nur, wenn das [treetimeline](guides/extensions-list.md#treetimeline) Plugin aktiviert ist. 
:::

:::note

Wenn die aktive Ansicht nicht die Timeline im 'Tree'-Modus ist, hat diese Methode keine Auswirkung.
 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [openAllSections](api/method/openallsections.md)
- [openSection](api/method/opensection.md)
