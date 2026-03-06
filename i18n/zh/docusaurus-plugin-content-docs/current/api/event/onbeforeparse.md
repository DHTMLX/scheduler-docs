---
sidebar_label: "onBeforeParse"
title: "onBeforeParse event"
description: "在数据解析开始之前触发"
---

# onBeforeParse

### Description

@short: 在数据解析开始之前触发

@signature: onBeforeParse: () =\> void

### Example

~~~jsx
scheduler.init("scheduler_here");
scheduler.attachEvent("onBeforeParse", function(){ 
    //在这里编写任何自定义逻辑
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
- [데이터 불러오기](guides/loading-data.md)
