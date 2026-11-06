---
sidebar_label: onBeforeEventGroupActiveChange
title: "onBeforeEventGroupActiveChange 事件"
description: "在事件组的活动状态更改前触发"
---

# onBeforeEventGroupActiveChange

### 描述

@short: 在事件组的活动状态更改前触发

@signature: onBeforeEventGroupActiveChange: (key: string | number | boolean, active: boolean) => boolean

### 参数

- `key` - （必需）*string | number | boolean* - 状态将要更改的组键
- `active` - （必需）*boolean* - 请求的活动状态

### 返回值

- `result` - (boolean) - 返回 `false` 可取消更改

### 示例

~~~js
scheduler.attachEvent("onBeforeEventGroupActiveChange", (key, active) => {
    return key !== "personal" || active;
});
~~~

### 详细说明

该事件在 `scheduler.ext.eventGroups.setActive()` 更改组之前，以及事件组列表应用复选框更改之前触发。返回 `false` 会保留当前状态，并阻止 `onEventGroupActiveChange` 触发。