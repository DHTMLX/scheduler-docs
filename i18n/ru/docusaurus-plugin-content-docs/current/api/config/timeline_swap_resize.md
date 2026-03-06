---
sidebar_label: "timeline_swap_resize"
title: "timeline_swap_resize config"
description: "позволяет при изменении размера события менять местами дату окончания и дату начала, если дата окончания перемещается до даты начала"
---

# timeline_swap_resize
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Позволяет при изменении размера события менять местами дату окончания и дату начала, если дата окончания перемещается до даты начала

@signature: timeline_swap_resize: boolean

### Example

~~~jsx
scheduler.config.timeline_swap_resize = false;
~~~

**Default value:** true

### Details

:::note
 Это свойство требует включения плагина [timeline](guides/extensions-list.md#timeline). 
:::

Если установлено в *false*, изменение размера события не позволит перетаскивать дату окончания за дату начала (или дату начала за дату окончания) с помощью drag and drop.

### Related Guides
- [Полный список расширений](guides/extensions-list.md#timeline)

### Change log
- добавлено в версии 4.4
