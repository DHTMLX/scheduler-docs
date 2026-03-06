---
sidebar_label: "show_loading"
title: "show_loading config"
description: "在数据加载期间显示进度指示器或spinner，这对于动态加载场景非常有用。"
---

# show_loading

### Description

@short: 在数据加载期间显示进度指示器或spinner，这对于动态加载场景非常有用。

@signature: show_loading: boolean

### Example

~~~jsx
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** false

### Related Guides
- [데이터 불러오기](guides/loading-data.md#dynamic-loading)
