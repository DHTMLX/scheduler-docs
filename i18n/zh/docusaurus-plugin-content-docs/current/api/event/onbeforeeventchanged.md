---
sidebar_label: onBeforeEventChanged
title: "onBeforeEventChanged 事件"
description: "在通过拖放更改事件后，尚未保存更改时触发。"
---

# onBeforeEventChanged

### Description

@short: 当事件通过拖放被修改时触发，但修改尚未保存。

@signature: onBeforeEventChanged: (ev: object, e: Event, is_new: boolean, original: object) => boolean

### Parameters

- `ev` - (必需) *object* - 变更后的事件数据对象
- `e` - (必需) *Event* - 原生事件对象
- `is_new` - (必需) *boolean* - 若用户修改的是新事件则返回 `true`；如果编辑的事件已存在则返回 `false`
- `original` - (必需) *object* - 变更前的事件数据对象

### Returns
- `result` - (boolean) - 指定事件的默认操作是否会被触发（`true`）还是取消（`false`）

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", (ev, e, is_new, original) => {
    // 在此处执行任意自定义逻辑
    return true;
});
~~~

### Details

该事件在通过拖放添加新事件或修改现有事件时触发。

- 请注意，处理函数的第一个参数取自数据项对象，而不是数据项的ID，因为新创建的数据项可能尚未具有ID。
- 创建新数据项时，未修改的事件对象将是一个空对象。
- 该事件是可阻塞的：从处理程序返回 `false` 将阻止数据更新。