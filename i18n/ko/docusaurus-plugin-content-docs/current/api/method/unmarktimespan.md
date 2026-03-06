---
sidebar_label: "unmarkTimespan"
title: "unmarkTimespan method"
description: "markTimespan() 메서드로 적용된 표시 또는 차단을 해제합니다"
---

# unmarkTimespan

### Description

@short: MarkTimespan() 메서드로 적용된 표시 또는 차단을 해제합니다

@signature: unmarkTimespan: (divs: HTMLElement|any[]) =\> void

### Parameters

- `divs` - (required) *HTMLElement | array* -      표시/차단을 해제할 타임스팬 요소(단일 요소 또는 배열일 수 있음)

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
  
버전 3.5부터 사용 가능합니다 
 
:::

:::note
 이 메서드는 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [markTimespan](api/method/marktimespan.md)

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md)
