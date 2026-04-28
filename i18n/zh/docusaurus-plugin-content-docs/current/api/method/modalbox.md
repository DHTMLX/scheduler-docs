---
sidebar_label: "modalbox"
title: "modalbox method"
description: "打开一个 modalbox"
---

# modalbox

### Description

@short: 打开一个 modalbox

@signature: modalbox: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - modalbox 的设置参数

### Returns
- ` div` - (HTMLElement) - 包含 modalbox 的 div 元素

### Example

~~~jsx
const box = scheduler.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

关于 modalbox 可用配置选项的更多信息，请参阅 [Popup Messages and Modal Boxes](guides/popups-and-modals.md) 文章。

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- 版本 6.0 中新增
