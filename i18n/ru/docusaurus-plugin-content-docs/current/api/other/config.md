---
sidebar_label: "config"
title: "config config"
description: "определяет параметры конфигурации для дат, шкалы, элементов управления"
---

# config

### Description

@short: Определяет параметры конфигурации для дат, шкалы, элементов управления

@signature: config: SchedulerConfigOptions

### Example

~~~jsx
//устанавливает формат отображения элементов оси Y
scheduler.config.hour_date = "%H:%i:%s";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~

### Details

Свойства объекта **config** подробно описаны в отдельном разделе основной страницы API [Scheduler API: Properties](api/overview/properties_overview.md).
