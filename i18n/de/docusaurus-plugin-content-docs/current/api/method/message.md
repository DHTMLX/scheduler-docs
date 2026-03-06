---
sidebar_label: "message"
title: "message method"
description: "öffnet eine message box des gewählten Typs"
---

# message

### Description

@short: Öffnet eine message box des gewählten Typs

@signature: message: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - Konfigurationseinstellungen für die message box

### Returns
- ` div` - (HTMLElement) - das div-Element, das die message box enthält

### Example

~~~jsx
var box = scheduler.message({ 
    type:"confirm-warning", 
    text:"Are you sure you want to do it?"
});
~~~

### Details

Weitere Informationen zu den verfügbaren Konfigurationsoptionen für eine message box finden Sie im Artikel [Popup-Nachrichten und Modale Fenster](guides/popups-and-modals.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup-Nachrichten und Modale Fenster](guides/popups-and-modals.md)

### Change log
- hinzugefügt in Version 6.0
