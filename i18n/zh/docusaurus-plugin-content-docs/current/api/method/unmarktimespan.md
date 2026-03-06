---
sidebar_label: "unmarkTimespan"
title: "unmarkTimespan method"
description: "清除由 markTimespan() 方法应用的标记或阻止"
---

# unmarkTimespan

### Description

@short: 清除由 markTimespan() 方法应用的标记或阻止

@signature: unmarkTimespan: (divs: HTMLElement | any[]) =\> void

### Parameters

- `divs` - (required) *HTMLElement | array* -      要清除标记/阻止的时间段元素（可以是单个元素或数组）

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
  
从版本 3.5 开始可用 
 
:::

:::note
 该方法需要启用 [limit](guides/extensions-list.md#limit) 插件。 
:::

### Related API
- [markTimespan](api/method/marktimespan.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)
