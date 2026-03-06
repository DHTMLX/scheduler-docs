---
sidebar_label: "onExternalDragIn"
title: "onExternalDragIn event"
description: "当数据从外部 DHTMLX 组件拖入 scheduler 时触发（需要启用 dnd 扩展）"
---

# onExternalDragIn

### Description

@short: 当数据从外部 DHTMLX 组件拖入 scheduler 时触发（需要启用 dnd 扩展）

@signature: onExternalDragIn: (id: string, source: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 数据项的 ID
- `source` - (required) *object* - 被拖入 scheduler 的源 HTML 元素
- `e` - (required) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 指示事件的默认操作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onExternalDragIn", function (id, source, e){
    scheduler.getEvent(id).text = source.innerHTML;
    return true;
});
~~~

### Related samples
- 10_integration/02_dhtmlxTree_outer_drag.html

### Details

:::note
 此事件需要启用 [outerdrag](guides/extensions-list.md#outerdrag) 插件。 
:::

- 此事件允许自定义由拖入操作创建的新事件。
- 通过返回 *false* 可以阻止该事件，防止在拖动过程中创建新事件。

### Related API
- [onBeforeExternalDragIn](api/event/onbeforeexternaldragin.md)
