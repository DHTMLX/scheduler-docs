---
sidebar_label: timeline_swap_resize
title: "timeline_swap_resize конфигурация"
description: "определяет, что во время изменения размера события конечная дата может быть обменяна на начальную дату (после того, как конечная дата станет запланированной перед начальной)"
---

# timeline_swap_resize
:::info
 Эта функциональность доступна только в PRO-версии. 
:::
### Description

@short: Определяет, что во время изменения размера события конечная дата может быть обменяна на начальную дату (после того, как конечная дата станет запланированной перед начальной)

@signature: timeline_swap_resize: boolean

### Example

~~~jsx
scheduler.config.timeline_swap_resize = false;
~~~

**Значение по умолчанию:** true

### Details

:::note
 Свойство требует включения плагина [timeline](guides/extensions-list.md#timeline).
:::

Если свойство установлено в *false*, оно не позволит перемещать конечную дату левее начальной даты (и наоборот) во время изменения размера события перетаскиванием.

### Related Guides
- [Полный список расширений](guides/extensions-list.md#timeline)

### Change log
- добавлено в версии 4.4