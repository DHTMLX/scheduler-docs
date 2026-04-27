---
sidebar_label: выбор
title: "конфигурация select"
description: "показывает/скрывает панель выбора в окне события"
---

# select

### Description

@short: Показывает/скрывает панель выбора в окне события

@signature: select: boolean

### Example

~~~jsx
scheduler.config.select = false;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Значение по умолчанию:** true

### Details

![select_property](/img/select_property.png)