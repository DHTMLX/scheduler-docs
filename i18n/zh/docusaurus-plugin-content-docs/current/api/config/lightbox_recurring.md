---
sidebar_label: "lightbox_recurring"
title: "lightbox_recurring config"
description: "控制编辑重复事件时 lightbox 的行为方式"
---

# lightbox_recurring

### Description

@short: 控制编辑重复事件时 lightbox 的行为方式

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
 该属性需要启用 [recurring](guides/extensions-list.md#recurring) 扩展。 
:::

此选项自版本 3.5 起可用。
