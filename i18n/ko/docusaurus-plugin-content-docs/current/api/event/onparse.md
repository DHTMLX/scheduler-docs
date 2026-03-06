---
sidebar_label: "onParse"
title: "onParse event"
description: "데이터가 파싱되어 API에 준비된 직후, 하지만 Scheduler에 표시되기 전 시점에 트리거됩니다."
---

# onParse

### Description

@short: 데이터가 파싱되어 API에 준비된 직후, 하지만 Scheduler에 표시되기 전 시점에 트리거됩니다.

@signature: onParse: () =\> void

### Example

~~~jsx
scheduler.init("scheduler_here");
scheduler.attachEvent("onParse", function(){alert("Data was parsed")});
scheduler.parse(events);
~~~

### Related API
- [load](api/method/load.md)
- [parse](api/method/parse.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md)
