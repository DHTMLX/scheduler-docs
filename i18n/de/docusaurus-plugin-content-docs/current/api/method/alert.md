---
sidebar_label: "alert"
title: "alert method"
description: "zeigt ein Alert-Message-Box an"
---

# alert

### Description

@short: Zeigt ein Alert-Message-Box an

@signature: alert: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - Konfigurationseinstellungen für die Alert-Box

### Returns
- ` div` - (HTMLElement) - das div-Element, das die Alert-Box enthält

### Example

~~~jsx
const box = scheduler.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});
~~~

### Details

Für weitere Informationen zu den verfügbaren Konfigurationsoptionen für eine Alert-Message-Box siehe den Artikel [Popup-Nachrichten und Modale Fenster](guides/popups-and-modals.md).

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup-Nachrichten und Modale Fenster](guides/popups-and-modals.md)

### Change log
- hinzugefügt in Version 6.0
