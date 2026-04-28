---
sidebar_label: ajax_error
title: "конфигурация ajax_error"
description: "определяет, как отображать уведомление об ошибке по умолчанию в случае неудачной загрузки XML-данных"
---

# ajax_error

### Description

@short: Определяет, как отображать уведомление об ошибке по умолчанию в случае неудачной загрузки XML-данных

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

**Значение по умолчанию:** "alert"

### Details

Уведомление об ошибке по умолчанию (то есть когда <code>scheduler.config.ajax_error = "alert"</code>) выглядит так: 

![ajax_error_property](/img/ajax_error_property.png)