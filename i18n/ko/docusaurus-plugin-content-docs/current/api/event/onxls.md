---
sidebar_label: "onXLS"
title: "onXLS event"
description: "데이터 소스가 로딩을 시작하기 직전에 트리거됩니다"
---

# onXLS
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 데이터 소스가 로딩을 시작하기 직전에 트리거됩니다

@signature: onXLS: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLS", function (){
    //여기에 커스텀 로직을 작성하세요
});
~~~

### Related API
- [onXLE](api/event/onxle.md)
- [load](api/method/load.md)

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md)

### Change log
- v5.2부터 deprecated되었습니다
