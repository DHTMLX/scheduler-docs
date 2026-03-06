---
sidebar_label: "drag_in"
title: "drag_in config"
description: "Ограничивает перетаскивание событий так, чтобы их можно было перемещать только внутри того scheduler, который инициализировал drag, предотвращая переносы между разными schedulers."
---

# drag_in

### Description

@short: Ограничивает перетаскивание событий так, чтобы их можно было перемещать только внутри того scheduler, который инициализировал drag, предотвращая переносы между разными schedulers.

@signature: drag_in: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2009,05,30),"week");
scheduler.load("./data/units.xml");
 
scheduler2.config.drag_in = false; // отключает перетаскивание событий в этот scheduler
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2009,05,30),"week");
~~~

**Default value:** true

### Details

:::note

Эта функция доступна исключительно для лицензий Scheduler PRO (коммерческая с 6 октября 2021), Enterprise и Ultimate.
 
:::

:::note
 Плагин [outerdrag](guides/extensions-list.md#outerdrag) должен быть включён для работы этого свойства. 
:::

### Related API
- [drag_out](api/config/drag_out.md)

### Related Guides
- [Операции Drag-and-Drop](guides/drag-between.md)
- [Создание нескольких планировщиков на странице](guides/multiple-per-page.md)
