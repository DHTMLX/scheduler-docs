---
sidebar_label: "onBeforeFolderToggle"
title: "onBeforeFolderToggle event"
description: "срабатывает непосредственно перед открытием или закрытием ветки дерева (применимо только в режиме Timeline, 'tree')"
---

# onBeforeFolderToggle
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает непосредственно перед открытием или закрытием ветки дерева (применимо только в режиме Timeline, "tree")

@signature: onBeforeFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> boolean

### Parameters

- `section` - (required) *object | boolean* -      объект конфигурации ветки, которая собирается открыться или закрыться. <br> Будет <i>true</i>, если все ветки закрываются или открываются одновременно с помощью методов closeAllSections()/openAllSections().
- `isOpen` - (required) *boolean* - указывает, будет ли ветка открыта (<i>true</i>) или закрыта (<i>false</i>)
- `allSections` - (required) *boolean* - будет <i>true</i>, если все ветки дерева открываются или закрываются одновременно через closeAllSections()/openAllSections(), или <i>false</i>, если затрагивается только одна ветка.

### Returns
- ` result` - (boolean) - определяет, должно ли стандартное действие события выполняться (<b>true</b>) или быть остановлено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeFolderToggle", function(section,isOpen,allSections){
    //любая пользовательская логика здесь
    return true;
});
~~~

### Related API
- [onAfterFolderToggle](api/event/onafterfoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
