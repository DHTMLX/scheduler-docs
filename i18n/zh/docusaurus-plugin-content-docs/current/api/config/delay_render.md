---
sidebar_label: "delay_render"
title: "delay_render config"
description: "设置一个超时（以毫秒为单位），用于包装 [updateView](api/method/updateview.md) 和 [setCurrentView](api/method/setcurrentview.md) 的调用（这些调用会触发scheduler的重绘）"
---

# delay_render

### Description

@short: 设置一个超时（以毫秒为单位），用于包装 [updateView](api/method/updateview.md) 和 [setCurrentView](api/method/setcurrentview.md) 的调用（这些调用会触发scheduler的重绘）

@signature: delay_render: number

### Example

~~~jsx
scheduler.config.delay_render = 30;

scheduler.init("scheduler_here");
~~~

### Details

:::note

此选项有助于提升性能。
 
:::

:::note

若要确保某条命令仅在实际重绘完成后执行，请将其放入 [onViewChange](api/event/onviewchange.md) 事件的回调函数中。
 
:::

默认值为0。

许多 scheduler 配置需要重绘。在处理复杂配置时，你可能会有多个函数分别更新部分设置并刷新 scheduler 以应用更改。频繁的重绘会降低应用性能。

**delay_render** 选项有助于减少重绘次数。

<br>

例如，如果设置 <code>scheduler.config.delay_render = 30;</code>，每当请求重绘时，scheduler 会将调用排队并等待 30 毫秒。
如果在等待期间又收到另一个重绘请求，scheduler 会重置计时器，再等待 30 毫秒。
因此，如果 [updateView](api/method/updateview.md) 和/或 [setCurrentView](api/method/setcurrentview.md) 在短时间内被多次调用（通常发生在自定义代码不同部分触发重绘时），只有最后一次调用会真正执行。
