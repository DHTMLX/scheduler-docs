---
sidebar_label: show_loading
title: "Конфигурация show_loading"
description: "позволяет отображать progress/spinner во время загрузки данных (полезно для динамической загрузки)"
---

# show_loading

### Description

@short: Позволяет отображать progress/spinner во время загрузки данных (полезно для динамической загрузки)

@signature: show_loading: boolean

### Example

~~~jsx
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Значение по умолчанию:** false

### Related Guides
- [Загрузка данных](guides/loading-data.md#dynamic-loading)