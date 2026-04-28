---
sidebar_label: prevent_cache
title: "prevent_cache конфигурация"
description: "Включает/выключает кэширование GET-запросов в браузере"
---

# prevent_cache

### Description

@short: Включает/выключает кэширование GET-запросов в браузере

@signature: prevent_cache: boolean

### Example

~~~jsx
scheduler.config.prevent_cache = true;
...
scheduler.init('scheduler_here',new Date(2027,10,1),"month");
~~~

**Значение по умолчанию:** false

### Related samples
- [Загрузка данных из базы данных](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

Рекомендуется включать данное свойство.