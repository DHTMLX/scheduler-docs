---
sidebar_label: onParse
title: "Событие onParse"
description: "Срабатывает после того, как данные распарсены (становятся доступными для API), но до того, как данные будут отрисованы в Scheduler"
---

# onParse

### Description

@short: Вызывается после того, как данные распарсены (становятся доступными для API), но до того, как данные будут отрисованы в Scheduler

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