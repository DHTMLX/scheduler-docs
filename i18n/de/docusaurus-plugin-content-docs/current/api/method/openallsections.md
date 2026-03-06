---
sidebar_label: "openAllSections"
title: "openAllSections method"
description: "öffnet jeden Abschnitt in der aktuell aktiven Ansicht (dies funktioniert nur, wenn die Ansicht Timeline im 'Tree'-Modus ist; andernfalls wird die Methode ignoriert)"
---

# openAllSections

### Description

@short: Öffnet jeden Abschnitt in der aktuell aktiven Ansicht (dies funktioniert nur, wenn die Ansicht Timeline im 'Tree'-Modus ist; andernfalls wird die Methode ignoriert)

@signature: openAllSections: () =\> void

### Example

~~~jsx
scheduler.openAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Diese Methode erfordert, dass das [treetimeline](guides/extensions-list.md#treetimeline) Plugin aktiviert ist. 
:::

:::note

Diese Methode gilt ausschließlich für den Tree-Modus
 
:::

### Related API
- [closeAllSections](api/method/closeallsections.md)
- [closeSection](api/method/closesection.md)
- [openSection](api/method/opensection.md)
