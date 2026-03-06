---
sidebar_label: alert
title: "alert method"
description: "calls an alert message box"
---

# alert

### Description

@short: Calls an alert message box

@signature: alert: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - the alert box's configuration

### Returns
- ` div` - (HTMLElement) - the div container of the alert box

### Example

~~~jsx
var box = scheduler.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});
~~~

### Details

For details about the supported configuration options of an alert message box, see the [Popup Messages and Modal Boxes](guides/popups-and-modals.md) article.

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- added in version 6.0
