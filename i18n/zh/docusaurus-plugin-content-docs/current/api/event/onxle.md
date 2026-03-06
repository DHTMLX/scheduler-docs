---
sidebar_label: "onXLE"
title: "onXLE event"
description: "当从数据源加载数据完成时触发一次"
---

# onXLE
:::warning 
此功能已棄用。
:::
### Description

@short: 当从数据源加载数据完成时触发一次

@signature: onXLE: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLE", function (){
    // 这里可以编写自定义逻辑
});
~~~

### Related API
- [onXLS](api/event/onxls.md)
- [load](api/method/load.md)

### Related Guides
- [데이터 불러오기](guides/loading-data.md)

### Change log
- 自 v5.2 起废弃
