---
sidebar_label: "scrollUnit"
title: "scrollUnit method"
description: "scrollt die angegebene Anzahl von Einheiten in der Units-Ansicht"
---

# scrollUnit
:::info
 Diese Funktionalität ist nur in der PRO-Version verfügbar. 
:::
### Description

@short: Scrollt die angegebene Anzahl von Einheiten in der Units-Ansicht

@signature: scrollUnit: (step: number) =\> void

### Parameters

- `step` - (required) *number* - die Anzahl der Einheiten, die gescrollt werden sollen (<i>verwenden Sie einen positiven Wert, um Einheiten nach rechts zu scrollen <br> und einen negativen Wert, um nach links zu scrollen</i>).

### Example

~~~jsx
scheduler.scrollUnit(5);  // scrollt 5 Einheiten nach rechts
...
scheduler.scrollUnit(-5); // scrollt 5 Einheiten nach links
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 Die Methode erfordert das aktivierte [units](guides/extensions-list.md#units) Plugin. 
:::
