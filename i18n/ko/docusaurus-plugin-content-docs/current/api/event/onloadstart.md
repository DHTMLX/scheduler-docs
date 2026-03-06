---
sidebar_label: "onLoadStart"
title: "onLoadStart event"
description: "데이터 소스에서 데이터 로딩 프로세스가 시작되기 직전에 트리거됩니다."
---

# onLoadStart

### Description

@short: 데이터 소스에서 데이터 로딩 프로세스가 시작되기 직전에 트리거됩니다.

@signature: onLoadStart: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onLoadStart", function(){  
    scheduler.config.readonly = true;  
});  

scheduler.attachEvent("onLoadEnd", function(){  
    scheduler.config.readonly = false;  
});
~~~

### Related API
- [load](api/method/load.md)
- [onLoadEnd](api/event/onloadend.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md)
- ["Server-Side Integration"](guides/server-integration.md)
