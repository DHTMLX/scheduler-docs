---
sidebar_label: isViewExists
title: "Метод isViewExists"
description: "проверяет, существует ли вид с указанным именем"
---

# isViewExists

### Description

@short: Проверяет, существует ли вид с указанным именем

@signature: isViewExists: (name: string) => boolean

### Parameters

- `name` - (обязательно) *string* - имя вида

### Returns
- ` isExist` - (boolean) - <i>true</i>, если view найден; иначе <i>false</i>

### Example

~~~jsx
scheduler.init('scheduler_here');
scheduler.load("data/events.xml");

scheduler.isViewExists("month"); //->true  /*!*/
~~~