---
sidebar_label: eventGroups
title: "eventGroups API"
description: "控制活动事件组"
---

# eventGroups

### 描述

@short: 控制活动事件组

@signature: scheduler.ext.eventGroups: EventGroupsApi

### 示例

~~~js
scheduler.ext.eventGroups.setActive("personal", false);
if (scheduler.ext.eventGroups.isActive("work")) {
    scheduler.render();
}
~~~

### 详细说明

`setActive(key, active)` 更改已知组的活动状态，并在状态更改时返回 `true`。它先触发 `onBeforeEventGroupActiveChange`；若该事件返回 `false`，则不会更改组。更改成功后会重新绘制 Scheduler 并触发 `onEventGroupActiveChange`。`isActive(key)` 返回已知组是否处于活动状态。

### 相关指南

- [事件组](guides/event-groups.md)