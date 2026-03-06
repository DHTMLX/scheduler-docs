---
sidebar_label: "show_loading"
title: "show_loading config"
description: "Отображает индикатор прогресса или спиннер во время загрузки данных, что удобно для сценариев динамической загрузки."
---

# show_loading

### Description

@short: Отображает индикатор прогресса или спиннер во время загрузки данных, что удобно для сценариев динамической загрузки.

@signature: show_loading: boolean

### Example

~~~jsx
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** false

### Related Guides
- [Загрузка данных](guides/loading-data.md#dynamic-loading)
