---
sidebar_label: "ajax_error"
title: "ajax_error config"
description: "定义当 XML 数据加载失败时默认错误通知的显示方式"
---

# ajax_error

### Description

@short: 定义当 XML 数据加载失败时默认错误通知的显示方式

@signature: ajax_error: string | boolean

### Example

~~~jsx
// 将错误信息记录到控制台
scheduler.config.ajax_error = "console";

// 或者
// 禁用默认错误消息
// scheduler.config.ajax_error = false;

scheduler.init("scheduler_here");
~~~

**Default value:** "alert"

### Details

默认情况下，当 <code>scheduler.config.ajax_error = "alert"</code> 时，错误通知显示如下:

![ajax_error_property](/img/ajax_error_property.png)
