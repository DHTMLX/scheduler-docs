---
sidebar_label: onAfterFolderToggle
title: "onAfterFolderToggle событие"
description: "срабатывает сразу после того, как ветка дерева была открыта или закрыта (применимо только в режиме Timeline, 'tree')"
---

# onAfterFolderToggle

:::info
 Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Срабатывает сразу после того, как ветка дерева была открыта или закрыта (применимо только в режиме Timeline, 'tree')

@signature: onAfterFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> void

### Parameters

- `section` - (required) *object | boolean*    -  конфигурационный объект открытой/закрытой ветви. <br>Принимает значение true, если все ветви были закрыты/открыты одновременно методами closeAllSections()/openAllSections()
- `isOpen` - (required) *boolean* - указывает, была ли ветка открыта (<i>true</i>) или закрыта (<i>false</i>)
- `allSections` - (required) *boolean* - принимает значение <i>true</i>, если все ветви дерева были закрыты/открыты одновременно методами closeAllSections()/openAllSections(), 

### Example

~~~jsx
scheduler.attachEvent("onAfterFolderToggle", function(section, isOpen, allSections){
    // любая ваша логика здесь
});
~~~

### Related API
- [onBeforeFolderToggle](api/event/onbeforefoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)