---
sidebar_label: "destructor"
title: "destructor method"
description: "удаляет экземпляр планировщика"
---

# destructor

### Description

@short: Уничтожает экземпляр планировщика

@signature: destructor: () =\> void

### Example

~~~jsx
const myScheduler = Scheduler.getSchedulerInstance();
 
//удаление экземпляра планировщика
myScheduler.destructor();
~~~

### Details

Этот метод удаляет экземпляр планировщика и вызывает событие [onDestroy](api/event/ondestroy.md).

При вызове destructor он выполнит следующие действия:

- очистит все данные, загруженные в экземпляр планировщика
- уничтожит [DataProcessor](api/method/dataprocessor.md), если он связан с планировщиком
- удалит планировщик из DOM
- отвяжет все DOM-события, прикрепленные через метод [event](api/method/event.md)

:::note

Для пакетов, которые не поддерживают несколько экземпляров планировщика (GPL или Individual editions), вызов destructor сделает планировщик недоступным до обновления страницы.
 
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- [Создание нескольких планировщиков на странице](guides/multiple-per-page.md#destructor-of-scheduler-and-dataprocessor-instances)

### Change log
- добавлено в версии 6.0
