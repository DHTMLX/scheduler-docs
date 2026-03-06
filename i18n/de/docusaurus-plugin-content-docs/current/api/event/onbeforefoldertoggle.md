---
sidebar_label: "onBeforeFolderToggle"
title: "onBeforeFolderToggle event"
description: "Wird ausgelöst, kurz bevor ein Tree-Branch geöffnet oder geschlossen wird (gilt nur in der Timeline-Ansicht, im 'tree'-Modus)."
---

# onBeforeFolderToggle
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Wird ausgelöst, kurz bevor ein Tree-Branch geöffnet oder geschlossen wird (gilt nur in der Timeline-Ansicht, im 'tree'-Modus).

@signature: onBeforeFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> boolean

### Parameters

- `section` - (required) *object | boolean* -      Das Konfigurationsobjekt des Branches, der geöffnet oder geschlossen werden soll. <br> Es ist <i>true</i>, wenn alle Branches gleichzeitig mit den Methoden closeAllSections()/openAllSections() geschlossen oder geöffnet werden.
- `isOpen` - (required) *boolean* - Zeigt an, ob der Branch geöffnet (<i>true</i>) oder geschlossen (<i>false</i>) wird.
- `allSections` - (required) *boolean* - Ist <i>true</i>, wenn alle Tree-Branches gleichzeitig über closeAllSections()/openAllSections() geöffnet oder geschlossen werden, oder <i>false</i>, wenn nur ein einzelner Branch betroffen ist.

### Returns
- ` result` - (boolean) - Bestimmt, ob die Standardaktion des Events ausgeführt werden soll (<b>true</b>) oder abgebrochen wird (<b>false</b>).

### Example

~~~jsx
scheduler.attachEvent("onBeforeFolderToggle", function(section,isOpen,allSections){
    //beliebige eigene Logik hier
    return true;
});
~~~

### Related API
- [onAfterFolderToggle](api/event/onafterfoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
