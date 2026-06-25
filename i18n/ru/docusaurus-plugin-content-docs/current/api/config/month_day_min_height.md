---
sidebar_label: month_day_min_height
title: "month_day_min_height конфигурация"
description: "устанавливает минимальную высоту ячеек в месячном виде"
---

# month_day_min_height

### Description

@short: Устанавливает минимальную высоту ячеек в месячном виде

@signature: month_day_min_height: number

### Example

~~~jsx
scheduler.config.month_day_min_height = 150;
...
scheduler.init('scheduler_here',new Date(2027,5,30),"month");
~~~

**Значение по умолчанию:** 90

**Доступные представления:** [месячный вид](views/month.md)

### Details

:::note
 Свойство требует включённого плагина [container_autoresize](guides/extensions-list.md#container-autoresize) для корректной работы.
:::

### Related API
- [month_day](api/config/month_day.md)