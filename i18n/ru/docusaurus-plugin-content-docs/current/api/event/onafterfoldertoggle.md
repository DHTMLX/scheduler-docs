---
sidebar_label: "onAfterFolderToggle"
title: "onAfterFolderToggle event"
description: "срабатывает сразу после того, как ветка дерева была открыта или закрыта (применимо только в режиме Timeline, 'tree')"
---

# onAfterFolderToggle
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает сразу после того, как ветка дерева была открыта или закрыта (применимо только в режиме Timeline, 'tree')

@signature: onAfterFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> void

### Parameters

- `section` - (required) *object | boolean* -      конфигурационный объект для ветки, которая была переключена. <br>Будет true, если все ветки были одновременно открыты или закрыты с помощью методов closeAllSections()/openAllSections().
- `isOpen` - (required) *boolean* - указывает, была ли ветка открыта (<i>true</i>) или закрыта (<i>false</i>)
- `allSections` - (required) *boolean* - будет <i>true</i>, если все ветки дерева были переключены одновременно методами closeAllSections()/openAllSections(), 

### Example

~~~jsx
scheduler.attachEvent("onAfterFolderToggle", function(section, isOpen, allSections){
    //разместите здесь любую кастомную логику
});
~~~

### Related API
- [onBeforeFolderToggle](api/event/onbeforefoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
