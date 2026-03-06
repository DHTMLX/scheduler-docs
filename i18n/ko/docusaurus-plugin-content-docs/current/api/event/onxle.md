---
sidebar_label: "onXLE"
title: "onXLE event"
description: "데이터 소스에서 데이터 로딩이 완료되었을 때 한 번 발생합니다."
---

# onXLE
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 데이터 소스에서 데이터 로딩이 완료되었을 때 한 번 발생합니다.

@signature: onXLE: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLE", function (){
    //여기에 커스텀 로직을 작성할 수 있습니다.
});
~~~

### Related API
- [onXLS](api/event/onxls.md)
- [load](api/method/load.md)

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md)

### Change log
- v5.2부터 deprecated 되었습니다.
