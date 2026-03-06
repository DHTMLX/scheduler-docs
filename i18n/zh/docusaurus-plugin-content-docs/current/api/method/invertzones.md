---
sidebar_label: "invertZones"
title: "invertZones method"
description: "翻转给定的时区范围"
---

# invertZones

### Description

@short: 翻转给定的时区范围

@signature: invertZones: (zones: any[]) =\> void

### Parameters

- `zones` - (required) *array* - 一个数组 **[start_minute,end_minute,..,start_minute_N,end_minute_N]** <br>每对数字定义一个具体的时间范围（以分钟为单位）。该数组可以包含任意数量的 <br>这些时间范围对

### Example

~~~jsx
var zones = scheduler.invertZones([500, 1000]); // => [0, 500, 1000, 1440]
~~~

### Details

:::note

从版本 3.5 开始支持
 
:::

:::note
 此方法需要启用 [limit](guides/extensions-list.md#limit) 插件。 
:::
