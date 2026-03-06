---
sidebar_label: "confirm"
title: "confirm method"
description: "打开一个 confirm 消息框"
---

# confirm

### Description

@short: 打开一个 confirm 消息框

@signature: confirm: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - confirm 消息框的配置设置

### Returns
- ` div` - (HTMLElement) - 包含 confirm 消息框的 div 元素

### Example

~~~jsx
var box = scheduler.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        if(result){
            scheduler.message("Yes!");
        }else{
            scheduler.message("No...");
        }
    }
});
~~~

### Details

有关 confirm 消息框可用配置选项的更多信息，请参阅 [Popup Messages and Modal Boxes](guides/popups-and-modals.md) 文章。

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- 版本 6.0 中新增
