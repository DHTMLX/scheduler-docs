---
sidebar_label: "unmarkTimespan"
title: "unmarkTimespan method"
description: "очищает разметку или блокировку, применённую методом markTimespan()"
---

# unmarkTimespan

### Description

@short: Очищает разметку или блокировку, применённую методом markTimespan()

@signature: unmarkTimespan: (divs: HTMLElement|any[]) =\> void

### Parameters

- `divs` - (required) *HTMLElement | array* -      элемент(ы) timespan, с которых нужно снять разметку/блокировку (может быть один элемент или массив)

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
  
Доступно начиная с версии 3.5 
 
:::

:::note
 Метод требует включения плагина [limit](guides/extensions-list.md#limit). 
:::

### Related API
- [markTimespan](api/method/marktimespan.md)

### Related Guides
- [Блокировка и выделение дат](guides/limits.md)
