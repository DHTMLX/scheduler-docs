---
sidebar_label: drag_in
title: "Конфигурация drag_in"
description: "ограничивает перетаскивание событий к вызывающему планировщику со стороны любых других планировщиков"
---

# drag_in

### Description

@short: Ограничивает перетаскивание событий к вызывающему планировщику со стороны любых других планировщиков

@signature: drag_in: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2027,05,30),"week");
scheduler.load("./data/units.xml");
 
scheduler2.config.drag_in = false; // отключает перетаскивание событий в этот scheduler
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027,05,30),"week");
~~~

**Default value:** true

### Details

:::note

Это свойство доступно только для Scheduler PRO (коммерческая версия (с 6 октября 2021 года), лицензии Enterprise и Ultimate)

:::

:::note
 Свойство требует активации плагина [outerdrag](guides/extensions-list.md#outerdrag). 
:::

### Related API
- [drag_out](api/config/drag_out.md)

### Related Guides
- [Drag-and-Drop Operations](guides/drag-between.md)
- [Creating Multiple Schedulers on a Page](guides/multiple-per-page.md)