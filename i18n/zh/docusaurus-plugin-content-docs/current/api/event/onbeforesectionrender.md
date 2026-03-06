---
sidebar_label: "onBeforeSectionRender"
title: "onBeforeSectionRender event"
description: "在单个 Timeline 区段设置但尚未渲染之前触发（仅适用于 Timeline 视图）"
---

# onBeforeSectionRender
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在单个 Timeline 区段设置但尚未渲染之前触发（仅适用于 Timeline 视图）

@signature: onBeforeSectionRender: (mode: string, section: object, timeline: object) =\> object

### Parameters

- `mode` - (required) *string* - Timeline 模式:'cell'、'bar' 或 'tree'
- `section` - (required) *object* - 包含 'key' 和 'label' 属性的区段对象，这些属性定义于 Timeline 配置的 'y_unit' 数组中（例如，\{key:1, label:"James Smith"\}）
- `timeline` - (required) *object* - Timeline 配置对象

### Returns
- ` result` - (object) - 区段对象

### Example

~~~jsx
scheduler.attachEvent("onBeforeSectionRender", function(mode, section, timeline){
    // 可以在这里添加自定义逻辑
    return section;
});
~~~

### Details

此事件允许您在 Timeline 区段渲染之前对其进行自定义。
