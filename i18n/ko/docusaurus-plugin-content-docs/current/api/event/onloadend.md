---
sidebar_label: "onLoadEnd"
title: "onLoadEnd event"
description: "데이터 소스에서 데이터 로딩이 완료되면 한 번 실행됩니다."
---

# onLoadEnd

### Description

@short: 데이터 소스에서 데이터 로딩이 완료되면 한 번 실행됩니다.

@signature: onLoadEnd: () =\> void

### Example

~~~jsx
```javascript
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
```
~~~

### Related API
- [load](api/method/load.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md)
- ["Server-Side Integration"](guides/server-integration.md)
