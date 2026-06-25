---
sidebar_label: "deleteMarkedTimespan"
title: "deleteMarkedTimespan method"
description: "addMarkedTimespan() 메서드를 사용해 생성된 마킹 또는 차단을 제거합니다."
---

# deleteMarkedTimespan

### Description

@short: AddMarkedTimespan() 메서드를 사용해 생성된 마킹 또는 차단을 제거합니다.

@signature: deleteMarkedTimespan: (config?: any) =\> void

### Parameters

- `config` - (optional) *string | object* -  타임스팬 ID 또는 해당 구성 속성을 포함하는 객체

### Example

~~~jsx
const spanID = scheduler.addMarkedTimespan({  
    days:  [0,1], 
    zones: "fullday"              
});
scheduler.deleteMarkedTimespan(spanID);
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note

이 기능은 버전 3.5부터 제공됩니다.
 
:::

:::note
 이 메서드는 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::

이 메서드는 다음 세 가지 방식으로 호출할 수 있습니다:

1. **deleteMarkedTimespan()** - 매개변수 없이 호출 시 모든 마킹/차단을 제거합니다.
2. **deleteMarkedTimespan(id)** - 지정한 id를 가진 타임스팬을 제거합니다.
3. **deleteMarkedTimespan(config)** - 주어진 구성 속성과 일치하는 타임스팬을 제거합니다.
  
  
~~~js
const spanID = scheduler.addMarkedTimespan({  
    days:  [3,4,5], 
    zones: [100,400]          
});

// 매주 일요일의 마킹을 제거합니다.
scheduler.deleteMarkedTimespan({ 
    days:  0,
});

// 매주 금요일 250분에서 350분 사이의 마킹을 제거합니다.
// 따라서 금요일에는 두 개의 마킹 블록이 남게 됩니다: 100-250 및 350-400
scheduler.deleteMarkedTimespan({ 
    days:  5,
    zones: [250,350]
});

// 금요일 Units 뷰에서 id=3인 항목의 마킹을 제거합니다.
scheduler.deleteMarkedTimespan({ 
    days:  5,
    zones: [250,350],
    sections:{ unit:3 }        
});

~~~

### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
