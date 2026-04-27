---
sidebar_label: left_border
title: "Конфигурация left_border"
description: "добавляет пунктирную левую границу к планировщику"
---

# left_border

### Description

@short: Добавляет пунктирную левую границу к планировщику

@signature: left_border: boolean

### Example

~~~jsx
scheduler.config.left_border = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~

**Значение по умолчанию:** false

### Details

![leftBorder_property](/img/leftBorder_property.png)