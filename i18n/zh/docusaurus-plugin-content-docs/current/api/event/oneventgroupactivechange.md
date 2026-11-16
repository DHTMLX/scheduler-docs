---
sidebar_label: onEventGroupActiveChange
title: "onEventGroupActiveChange 事件"
description: "在事件组的活动状态更改后触发"
---

# onEventGroupActiveChange

### 描述

@short: 在事件组的活动状态更改后触发

@signature: onEventGroupActiveChange: (key: string | number | boolean, active: boolean) => void

### 参数

- `key` - （必需）*string | number | boolean* - 已更改的组键
- `active` - （必需）*boolean* - 组的新活动状态

### 示例

~~~js
scheduler.attachEvent("onEventGroupActiveChange", (key, active) => {
    console.log(key, active ? "is visible" : "is hidden");
});
~~~

### 详细说明

事件组通过 `scheduler.ext.eventGroups.setActive()` 或 Sidebar 的事件组列表更改状态后触发该事件。Scheduler 会在更改过程中刷新事件显示。