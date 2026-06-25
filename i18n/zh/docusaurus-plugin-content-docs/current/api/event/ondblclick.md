---
sidebar_label: onDblClick
title: "onDblClick event"
description: "当用户对事件进行双击时触发"
---

# onDblClick

### Description

@short: 当用户对事件进行双击时触发

@signature: onDblClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 事件的 ID
- `e` - (required) *Event* - 原生事件对象

### Returns
- `result` - (boolean) - 指定事件的默认行为是否会被触发（`true`）还是取消（`false`）

### Example

~~~jsx
scheduler.attachEvent("onDblClick", (id, e) => {
    // 在此处编写任意自定义逻辑
    return true;
});
~~~

### Details

该事件是可阻止的。返回 `false` 以取消默认行为。