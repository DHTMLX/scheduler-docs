---
sidebar_label: "lightbox_recurring"
title: "lightbox_recurring config"
description: "управляет поведением lightbox при редактировании повторяющегося события"
---

# lightbox_recurring

### Description

@short: Управляет поведением lightbox при редактировании повторяющегося события

@signature: lightbox_recurring: string

### Example

~~~jsx
scheduler.config.lightbox_recurring = 'series';
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** 'ask'

### Details

:::note
 Это свойство требует включения расширения [recurring](guides/extensions-list.md#recurring). 
:::

Эта опция доступна с версии 3.5.
