---
sidebar_label: "unmarkTimespan"
title: "unmarkTimespan method"
description: "entfernt die Markierung oder Blockierung, die durch die Methode markTimespan() angewendet wurde"
---

# unmarkTimespan

### Description

@short: Entfernt die Markierung oder Blockierung, die durch die Methode markTimespan() angewendet wurde

@signature: unmarkTimespan: (divs: HTMLElement|any[]) =\> void

### Parameters

- `divs` - (required) *HTMLElement | Array* -      das/die Timespan-Element(e), von dem/denen die Markierung/Blockierung entfernt werden soll (kann ein einzelnes Element oder ein Array sein)

### Example

~~~jsx
const spanDIV = scheduler.markTimespan({  
    days:  [0,6],  
    zones: "fullday"
});

scheduler.unmarkTimespan(spanDIV);
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)

### Details

:::note
  
Verfügbar ab Version 3.5 
 
:::

:::note
 Die Methode erfordert, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

### Related API
- [markTimespan](api/method/marktimespan.md)

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md)
