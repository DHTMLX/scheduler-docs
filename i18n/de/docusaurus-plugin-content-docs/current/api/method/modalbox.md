---
sidebar_label: "modalbox"
title: "modalbox method"
description: "öffnet eine modalbox"
---

# modalbox

### Description

@short: Öffnet eine modalbox

@signature: modalbox: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - Einstellungen für die modalbox

### Returns
- ` div` - (HTMLElement) - das div-Element, das die modalbox enthält

### Example

~~~jsx
var box = scheduler.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

Für weitere Informationen zu den verfügbaren Konfigurationsoptionen einer modalbox siehe den Artikel [Popup-Nachrichten und Modale Fenster](guides/popups-and-modals.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [Popup-Nachrichten und Modale Fenster](guides/popups-and-modals.md)

### Change log
- hinzugefügt in Version 6.0
