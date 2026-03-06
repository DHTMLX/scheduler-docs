---
sidebar_label: "ajax_error"
title: "ajax_error config"
description: "определяет, как отображается стандартное уведомление об ошибке при сбое загрузки XML данных"
---

# ajax_error

### Description

@short: Определяет, как отображается стандартное уведомление об ошибке при сбое загрузки XML данных

@signature: ajax_error: string | boolean

### Example

~~~jsx
// выводит сообщение об ошибке в консоль
scheduler.config.ajax_error = "console";

// или
// отключает стандартные сообщения об ошибках
// scheduler.config.ajax_error = false;

scheduler.init("scheduler_here");
~~~

**Default value:** "alert"

### Details

По умолчанию уведомление об ошибке (когда <code>scheduler.config.ajax_error = "alert"</code>) выглядит следующим образом:

![ajax_error_property](/img/ajax_error_property.png)
