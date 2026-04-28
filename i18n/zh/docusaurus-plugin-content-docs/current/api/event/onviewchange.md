---
sidebar_label: onViewChange
title: "onViewChange 事件"
description: "在当前视图切换为其他视图后触发"
---

# onViewChange

### Description

@short: 在当前视图切换为其他视图后触发

@signature: onViewChange: (new_mode: string, new_date: Date) =\> void

### Parameters

- `new_mode` - (required) *string* - 新的视图
- `new_date` - (required) *Date* - 新日期

### Example

~~~jsx
scheduler.attachEvent("onViewChange", (new_mode, new_date) => {
    // 在此处编写任意自定义逻辑
});
~~~

### Details

每次将当前视图切换为其他视图时，该事件都会被调用。