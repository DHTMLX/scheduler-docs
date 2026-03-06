---
sidebar_label: "drag_out"
title: "drag_out config"
description: "Запретить перетаскивание событий из этого scheduler в другие"
---

# drag_out

### Description

@short: Запретить перетаскивание событий из этого scheduler в другие

@signature: drag_out: boolean

### Example

~~~jsx
scheduler.config.drag_out = false; // отключить перетаскивание событий из этого scheduler в другие
scheduler.init('scheduler_here', new Date(2009,05,30), "week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2', new Date(2009,05,30), "week");
~~~

**Default value:** true

### Details

:::note

Эта функция доступна только в лицензиях Scheduler PRO (коммерческая с 6 октября 2021), Enterprise и Ultimate.
 
:::

:::note
 Для работы функции требуется включенный плагин [outerdrag](guides/extensions-list.md#outerdrag). 
:::

### Related API
- [drag_in](api/config/drag_in.md)

### Related Guides
- [Операции Drag-and-Drop](guides/drag-between.md)
- [Создание нескольких планировщиков на странице](guides/multiple-per-page.md)
