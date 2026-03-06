---
sidebar_label: "onXLS"
title: "onXLS event"
description: "在数据源开始加载之前触发"
---

# onXLS
:::warning 
此功能已棄用。
:::
### Description

@short: 在数据源开始加载之前触发

@signature: onXLS: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLS", function (){
    //在此处放置任何自定义逻辑
});
~~~

### Related API
- [onXLE](api/event/onxle.md)
- [load](api/method/load.md)

### Related Guides
- [데이터 불러오기](guides/loading-data.md)

### Change log
- 自 v5.2 起废弃
