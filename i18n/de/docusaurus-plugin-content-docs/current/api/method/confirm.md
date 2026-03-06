---
sidebar_label: "confirm"
title: "confirm method"
description: "öffnet eine confirm Messagebox"
---

# confirm

### Description

@short: Öffnet eine confirm Messagebox

@signature: confirm: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - die Einstellungen für die confirm Box

### Returns
- ` div` - (HTMLElement) - das div-Element, das die confirm Box enthält

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

Weitere Informationen zu den verfügbaren Konfigurationsoptionen für eine confirm Messagebox finden Sie im Artikel [Popup-Nachrichten und Modale Fenster](guides/popups-and-modals.md).

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup-Nachrichten und Modale Fenster](guides/popups-and-modals.md)

### Change log
- hinzugefügt in Version 6.0
