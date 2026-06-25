---
sidebar_label: onClick
title: "onClick event"
description: "当用户对事件点击左键时触发"
---

# onClick

### Description

@short: 当用户对事件点击左键时触发

@signature: onClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (必需) *string* - 事件的 id
- `e` - (必需) *Event* - 原生事件对象

### Returns
- `result` - (boolean) - 定义事件的默认操作是否将被触发（`true`）还是被取消（`false`）

### Example

~~~jsx
scheduler.attachEvent("onClick", (id, event) => {
    // 在此处编写任意自定义逻辑
    return true;
});
~~~

### Related samples
- [隐藏事件框的选择栏](https://docs.dhtmlx.com/scheduler/samples/02_customization/10_without_toolbar.html)
- [只读 Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

该事件是可阻止的（blockable）。如果处理函数返回非 `true` 值，默认反应将被阻止。默认情况下，选择栏会显示。

### Related Guides
- [Lightbox 的操作](guides/lightbox-editors-manipulations.md#opening-the-lightbox-on-a-single-click)