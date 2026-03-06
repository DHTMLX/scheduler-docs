---
sidebar_label: "onLightboxButton"
title: "onLightboxButton event"
description: "Wird ausgelöst, wenn ein Benutzer auf einen benutzerdefinierten Button innerhalb der Lightbox klickt"
---

# onLightboxButton

### Description

@short: Wird ausgelöst, wenn ein Benutzer auf einen benutzerdefinierten Button innerhalb der Lightbox klickt

@signature: onLightboxButton: (id: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Buttons
- `node` - (required) *HTMLElement* - das HTML-Element des geklickten Buttons
- `e` - (required) *event* - das native 'click' Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onLightboxButton", function (id, node, e){
    // hier kann benutzerdefinierte Logik eingefügt werden
});
~~~

### Related samples
- [Setting/getting values of lightbox's controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)

### Details

Dieses Event wird nur für benutzerdefinierte Buttons ausgelöst, die sich am unteren Rand der Lightbox befinden. Es wird nicht für Standard- oder Abschnitts-Buttons aktiviert.

Um zu prüfen, ob die Lightbox aktuell geöffnet oder geschlossen ist, können Sie die **lightbox_id** Eigenschaft aus dem State-Objekt verwenden, das von der Methode [getState](api/method/getstate.md) zurückgegeben wird. 
Wenn die Lightbox geöffnet ist, liefert diese Methode die ID des aktiven Events; ist sie geschlossen, gibt sie 'null' oder 'undefined' zurück:

~~~js
if (scheduler.getState().lightbox_id){
    // Logik, wenn die Lightbox geöffnet ist
} else {
    // Logik, wenn die Lightbox geschlossen ist
}
~~~

### Related Guides
- [Manipulationen mit dem Lightbox](guides/lightbox-editors-manipulations.md#checking-whether-the-lightbox-is-opened)
