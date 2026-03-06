---
sidebar_label: "onScaleAdd"
title: "onScaleAdd event"
description: "在调度器中单个视图单元（如列、区段或日期单元格）渲染完成后立即触发"
---

# onScaleAdd

### Description

@short: 在调度器中单个视图单元（如列、区段或日期单元格）渲染完成后立即触发

@signature: onScaleAdd: (unit: HTMLElement, date: object) =\> void

### Parameters

- `unit` - (required) *HTMLElement* - 表示特定视图单元的HTML元素
- `date` - (required) *object* - 与该单元关联的日期

### Example

~~~jsx
scheduler.attachEvent("onScaleAdd", function (unit, date){
    //在这里添加您的自定义逻辑
});
~~~

### Details

不同视图包含不同的单元:

- **Day view** - 代表整天的列；
- **Week view** - 每天对应一列；
- **Month view** - 每天对应一个单元格；
- **Units** - 一个区段；
- **Timeline** - 一个区段；
- **Year** - 代表一天的单元格。
