---
sidebar_label: "skin"
title: "skin config"
description: "提供当前调度器使用的 skin"
---

# skin

### Description

@short: 提供当前调度器使用的 skin

@signature: skin: string

### Example

~~~jsx
const currentSkin = scheduler.skin;// -> 'glossy' 或 'classic'
~~~

### Details

此方法用于获取当前应用于调度器的 skin。如果调度器使用的不是默认的 *'terrace'* skin，则返回该 skin 的名称。当使用默认 skin 时，方法返回 'undefined'。
