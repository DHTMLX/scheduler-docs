---
sidebar_label: "onBeforeExternalDragIn"
title: "onBeforeExternalDragIn event"
description: "在元素开始从外部 DHTMLX 组件拖入 scheduler 之前触发（需要启用 dnd 扩展）"
---

# onBeforeExternalDragIn

### Description

@short: 在元素开始从外部 DHTMLX 组件拖入 scheduler 之前触发（需要启用 dnd 扩展）

@signature: onBeforeExternalDragIn: (source: HTMLElement, dhtmlx: object, tArea: HTMLElement, tNode: HTMLElement, e: Event) =\> boolean

### Parameters

- `source` - (required) *HTMLElement* - 即将被拖入 scheduler 的 HTML 元素
- `dhtmlx` - (required) *object* - 全局 DHTMLX 对象
- `tArea` - (required) *HTMLElement* - 表示 scheduler 数据区域的 HTML 元素
- `tNode` - (required) *HTMLElement* - scheduler 内的目标 HTML 元素（如 Day 视图中的某列或 Timeline 视图中的某部分）
- `e` - (required) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 决定默认事件动作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeExternalDragIn",function(source,dhtmlx,tArea,tNode,e)
{
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

:::note
 该事件需要启用 [outerdrag](guides/extensions-list.md#outerdrag) 插件。 
:::

此事件可以被阻止。返回 *false* 将阻止外部元素被拖入 scheduler。

### Related API
- [onExternalDragIn](api/event/onexternaldragin.md)
