---
sidebar_label: details_on_dblclick
title: "details_on_dblclick конфигурация"
description: "Позволяет открывать lightbox после двойного клика по событию"
---

# details_on_dblclick

### Description

@short: Позволяет открывать лайтбокс двойным кликом по событию

@signature: details_on_dblclick: boolean

### Example

~~~jsx
scheduler.config.details_on_dblclick = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** true

**Applicable views:** [Дневной просмотр](views/day.md), [Недельный просмотр](views/week.md), [Вид по юнитам](views/units.md)

### Related samples
- [Автоматическая конечная дата](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)

### Change log
- Значение по умолчанию изменено на `true` в версии v7.0