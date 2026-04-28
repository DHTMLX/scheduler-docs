---
sidebar_label: "destructor"
title: "destructor method"
description: "移除一个 scheduler 实例"
---

# destructor

### Description

@short: 移除一个 scheduler 实例

@signature: destructor: () =\> void

### Example

~~~jsx
const myScheduler = Scheduler.getSchedulerInstance();
 
// 移除一个 scheduler 实例
myScheduler.destructor();
~~~

### Details

此方法用于移除一个 scheduler 实例，并触发 [onDestroy](api/event/ondestroy.md) 事件。

当调用 destructor 时，它将:

- 清除加载到该 scheduler 实例中的所有数据
- 销毁与 scheduler 关联的 [DataProcessor](api/method/dataprocessor.md)
- 从 DOM 中移除该 scheduler
- 解绑所有通过 [event](api/method/event.md) 方法绑定的 DOM 事件

:::note

对于不支持多个 scheduler 实例的版本（GPL 或 Individual 版本），调用 destructor 后该 scheduler 将不可用，直到页面刷新。
 
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- [페이지에서 여러 개의 Scheduler 생성하기](guides/multiple-per-page.md#destructorofscheduleranddataprocessorinstances)

### Change log
- 版本 6.0 中新增
