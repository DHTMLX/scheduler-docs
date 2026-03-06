---
sidebar_label: message
title: "message method"
description: "calls a message box of the specified type"
---

# message

### Description

@short: Calls a message box of the specified type

@signature: message: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - the message box's configuration

### Returns
- ` div` - (HTMLElement) - the div container of the message box

### Example

~~~jsx
var box = scheduler.message({ 
    type:"confirm-warning", 
    text:"Are you sure you want to do it?"
});
~~~

### Details

For details about the supported configuration options of a message box, see the [Popup Messages and Modal Boxes](guides/popups-and-modals.md) article.

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- added in version 6.0
