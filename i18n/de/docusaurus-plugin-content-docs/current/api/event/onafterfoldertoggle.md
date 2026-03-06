---
sidebar_label: "onAfterFolderToggle"
title: "onAfterFolderToggle event"
description: "Wird unmittelbar ausgelöst, nachdem ein Baumzweig entweder geöffnet oder geschlossen wurde (nur anwendbar in der Timeline-Ansicht im 'tree'-Modus)."
---

# onAfterFolderToggle
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Wird unmittelbar ausgelöst, nachdem ein Baumzweig entweder geöffnet oder geschlossen wurde (nur anwendbar in der Timeline-Ansicht im 'tree'-Modus).

@signature: onAfterFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> void

### Parameters

- `section` - (required) *object | boolean* -      Das Konfigurationsobjekt für den Zweig, der umgeschaltet wurde. <br>Es ist true, wenn alle Zweige gleichzeitig mit den Methoden closeAllSections()/openAllSections() geöffnet oder geschlossen wurden.
- `isOpen` - (required) *boolean* - Gibt an, ob der Zweig geöffnet (<i>true</i>) oder geschlossen (<i>false</i>) wurde.
- `allSections` - (required) *boolean* - Ist <i>true</i>, wenn alle Baumzweige gleichzeitig durch die Methoden closeAllSections()/openAllSections() umgeschaltet wurden, 

### Example

~~~jsx
scheduler.attachEvent("onAfterFolderToggle", function(section, isOpen, allSections){
    //füge hier eigene Logik ein
});
~~~

### Related API
- [onBeforeFolderToggle](api/event/onbeforefoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
