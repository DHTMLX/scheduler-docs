---
sidebar_label: "quick_info_detached"
title: "quick_info_detached config"
description: "управляет тем, будет ли форма события появляться с левой/правой стороны экрана или непосредственно рядом с выбранным событием"
---

# quick_info_detached

### Description

@short: Управляет тем, будет ли форма события появляться с левой/правой стороны экрана или непосредственно рядом с выбранным событием

@signature: quick_info_detached: boolean

### Example

~~~jsx
scheduler.config.quick_info_detached = false;
...
scheduler.init('scheduler_here',new Date(2013,5,30),"day");
~~~

**Default value:** true (<i>форма события будет отображаться рядом с выбранным событием</i>)

### Related samples
- [Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)
- [Touch-oriented scheduler. Managing the event form position](https://docs.dhtmlx.com/scheduler/samples/03_extensions/30_quick_info_detached.html)

### Details

:::note
 Это свойство требует включения плагина [quick_info](guides/extensions-list.md#quickinfo). 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Мобильная адаптивность Scheduler](guides/touch-support.md)
- [Полный список расширений](guides/extensions-list.md#quickinfo)
