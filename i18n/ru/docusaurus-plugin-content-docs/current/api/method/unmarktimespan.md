---
sidebar_label: unmarkTimespan
title: "метод unmarkTimespan"
description: "удаляет пометку/блокировку, установленную методом markTimespan()"
---

# unmarkTimespan

### Description

@short: Удаляет пометку/блокировку, установленную методом markTimespan()

@signature: unmarkTimespan: (divs: HTMLElement|any[]) =\> void

### Parameters

- `divs` - (обязательно) *HTMLElement | массив* - временной интервал, из которого нужно удалить пометку/блокировку (или массив временных интервалов)

### Example

~~~jsx
var spanDIV = scheduler.markTimespan({  
    days:  [0,6],  
    zones: "fullday"
});

scheduler.unmarkTimespan(spanDIV);
~~~

### Related samples
- [Обработка выделения указателя](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)

### Details

:::note

Доступно начиная с версии 3.5
 
:::

:::note
 Методу требуется активированый плагин [limit](guides/extensions-list.md#limit).
:::

### Related API
- [markTimespan](api/method/marktimespan.md)

### Related Guides
- [Блокировка и пометка дат](guides/limits.md)