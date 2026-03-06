---
sidebar_label: "message"
title: "message method"
description: "打开一个指定类型的 message box"
---

# message

### Description

@short: 打开一个指定类型的 message box

@signature: message: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - message box 的配置设置

### Returns
- ` div` - (HTMLElement) - 包含 message box 的 div 元素

### Example

~~~jsx
var box = scheduler.message({ 
    type:"confirm-warning", 
    text:"Are you sure you want to do it?"
});
~~~

### Details

有关 message box 可用配置选项的更多信息，请参见 [Popup Messages and Modal Boxes](guides/popups-and-modals.md) 文章。

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)
-

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- 在版本 6.0 中添加
