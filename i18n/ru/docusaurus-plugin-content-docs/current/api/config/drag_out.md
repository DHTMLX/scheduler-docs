---
sidebar_label: drag_out
title: "drag_out конфигурация"
description: "ограничивает перетаскивание событий из вызывающего планировщика к любому другому планировщику(-ам)"
---

# drag_out

### Description

@short: Ограничивает перетаскивание событий из вызывающего планировщика к любому другому планировщику(-ам)

@signature: drag_out: boolean

### Example

~~~jsx
scheduler.config.drag_out = false; // отключить перетаскивание событий из этого scheduler в другие
scheduler.init('scheduler_here', new Date(2027,05,30), "week");
scheduler.load("./data/units.xml");
 
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027,05,30),"week");
~~~

**Значение по умолчанию:** true

### Details

:::note

Это свойство доступно только для Scheduler PRO (коммерческая версия с 6 октября 2021 года), а также лицензии Enterprise и Ultimate.

::: 

:::note
 Своество требует активации плагина [outerdrag](guides/extensions-list.md#outerdrag). 
::: 

### Related API
- [drag_in](api/config/drag_in.md)

### Related Guides
- [Операции перетаскивания](guides/drag-between.md)
- [Создание нескольких планировщиков на одной странице](guides/multiple-per-page.md)