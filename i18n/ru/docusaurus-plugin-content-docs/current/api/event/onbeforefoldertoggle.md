---
sidebar_label: onBeforeFolderToggle
title: "Событие onBeforeFolderToggle"
description: "срабатывает перед открытием или закрытием узла дерева (вид Timeline, режим 'tree' только)"
---

# onBeforeFolderToggle

:::info
 Это функциональность доступна только в версии PRO.
 :::

### Description

@short: Срабатывает до открытия или закрытия ветки дерева (вид Timeline, режим 'tree' только)

@signature: onBeforeFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> boolean

### Parameters

- `section` - (required) *object | boolean* - конфигурационный объект ветки, которую следует открыть/закрыть. <br> Принимает значение <i>true</i>, если все ветви будут закрыты/открыты одновременно вызовами методов closeAllSections() / openAllSections().
- `isOpen` - (required) *boolean* - указывает, будет ли ветка открыта (<i>true</i>) или закрыта (<i>false</i>)
- `allSections` - (required) *boolean* - принимает значение <i>true</i>, если все ветви дерева будут закрыты/открыты одновременно вызовами методов closeAllSections() / openAllSections(), <i>false</i> - если будет открыта/закрыта только одна ветка.

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeFolderToggle", function(section,isOpen,allSections){
    // любая ваша логика здесь
    return true;
});
~~~

### Related API
- [onAfterFolderToggle](api/event/onafterfoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)