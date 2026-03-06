---
sidebar_label: "update_render"
title: "update_render config"
description: "控制调度器是否在每次操作后完全重绘自身"
---

# update_render

### Description

@short: 控制调度器是否在每次操作后完全重绘自身

@signature: update_render: boolean

### Example

~~~jsx
scheduler.config.update_render = true;
...     
scheduler.init('scheduler_here',new Date(2013,7,11),"week");
~~~

**Default value:** false

### Details

默认情况下，当拖动或调整事件大小时，调度器只会重绘被更改的事件，以提升性能。整个调度器只会在拖放操作完成后重新绘制。

在某些情况下，被拖动事件的位置可能会影响附近事件的布局。为了确保在操作过程中所有内容都能正确显示，需要对调度器进行完全重绘。

<br>

例如，如果多个事件占据同一个单元格，当你移动其中一个较低的事件时，移动过程中只有该事件会被重绘。这可能会导致它暂时与上方的事件视觉重叠。鼠标按钮释放后，所有事件会调整到正确的位置。启用 **update_render** 选项可以强制调度器在每次操作后完全重绘，从而避免此类视觉重叠。
