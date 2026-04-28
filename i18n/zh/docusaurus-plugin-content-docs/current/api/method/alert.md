---
sidebar_label: "alert"
title: "alert method"
description: "显示一个 alert 消息框"
---

# alert

### Description

@short: 显示一个 alert 消息框

@signature: alert: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - alert 框的配置设置

### Returns
- ` div` - (HTMLElement) - 包含 alert 框的 div 元素

### Example

~~~jsx
const box = scheduler.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});
~~~

### Details

有关 alert 消息框可用配置选项的更多信息，请参阅 [Popup Messages and Modal Boxes](guides/popups-and-modals.md) 文章。

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- 版本 6.0 中添加
