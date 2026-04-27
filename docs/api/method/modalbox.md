---
sidebar_label: modalbox
title: "modalbox method"
description: "calls a modalbox"
---

# modalbox

### Description

@short: Calls a modalbox

@signature: modalbox: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - the modal box's configuration

### Returns
- ` div` - (HTMLElement) - the div container of the modalbox

### Example

~~~jsx
const box = scheduler.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

For details about the supported configuration options of a modalbox, see the [Popup Messages and Modal Boxes](guides/popups-and-modals.md) article.

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- added in version 6.0
