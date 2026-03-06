---
sidebar_label: "isViewExists"
title: "isViewExists method"
description: "проверяет, существует ли view с заданным именем"
---

# isViewExists

### Description

@short: Проверяет, существует ли view с заданным именем

@signature: isViewExists: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - имя view

### Returns
- ` isExist` - (boolean) - <i>true</i>, если view найден; иначе <i>false</i>

### Example

~~~jsx
scheduler.init('scheduler_here');
scheduler.load("data/events.xml");

scheduler.isViewExists("month"); //->true  /*!*/
~~~
