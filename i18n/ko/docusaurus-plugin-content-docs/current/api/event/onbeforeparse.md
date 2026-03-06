---
sidebar_label: "onBeforeParse"
title: "onBeforeParse event"
description: "데이터 파싱이 시작되기 직전에 트리거됩니다."
---

# onBeforeParse

### Description

@short: 데이터 파싱이 시작되기 직전에 트리거됩니다.

@signature: onBeforeParse: () =\> void

### Example

~~~jsx
scheduler.init("scheduler_here");
scheduler.attachEvent("onBeforeParse", function(){ 
    //여기에 사용자 정의 로직 작성
});
scheduler.parse(events);
~~~

### Related API
- [load](api/method/load.md)
- [parse](api/method/parse.md)
- [onParse](api/event/onparse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md)
