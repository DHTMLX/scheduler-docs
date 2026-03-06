---
sidebar_label: "onParse"
title: "onParse event"
description: "在数据解析完成并准备好供 API 使用，但尚未显示在 Scheduler 中时触发"
---

# onParse

### Description

@short: 在数据解析完成并准备好供 API 使用，但尚未显示在 Scheduler 中时触发

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
- [데이터 불러오기](guides/loading-data.md)
