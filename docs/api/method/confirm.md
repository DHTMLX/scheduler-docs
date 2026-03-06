---
sidebar_label: confirm
title: "confirm method"
description: "calls a confirm message box"
---

# confirm

### Description

@short: Calls a confirm message box

@signature: confirm: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - the confirm box's configuration

### Returns
- ` div` - (HTMLElement) - the div container of the confirm box

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

For details about the supported configuration options of a confirm message box, see the [Popup Messages and Modal Boxes](guides/popups-and-modals.md) article.

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- added in version 6.0
