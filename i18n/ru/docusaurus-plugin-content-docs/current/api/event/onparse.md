---
sidebar_label: "onParse"
title: "onParse event"
description: "срабатывает сразу после того, как данные были распарсены и готовы для API, но до того, как они отображаются в Scheduler"
---

# onParse

### Description

@short: Срабатывает сразу после того, как данные были распарсены и готовы для API, но до того, как они отображаются в Scheduler

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
- [Загрузка данных](guides/loading-data.md)
