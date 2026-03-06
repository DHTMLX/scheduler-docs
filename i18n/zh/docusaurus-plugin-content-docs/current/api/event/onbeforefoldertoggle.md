---
sidebar_label: "onBeforeFolderToggle"
title: "onBeforeFolderToggle event"
description: "在树状分支打开或关闭之前触发（仅适用于Timeline视图的'tree'模式）"
---

# onBeforeFolderToggle
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在树状分支打开或关闭之前触发（仅适用于Timeline视图的"tree"模式）

@signature: onBeforeFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> boolean

### Parameters

- `section` - (required) *object | boolean* -      即将打开或关闭的分支的配置对象。<br>如果通过closeAllSections()/openAllSections()方法同时关闭或打开所有分支，则此参数为<i>true</i>。
- `isOpen` - (required) *boolean* - 表示分支是否将要打开（<i>true</i>）或关闭（<i>false</i>）
- `allSections` - (required) *boolean* - 如果通过closeAllSections()/openAllSections()一次性打开或关闭所有树状分支，则为<i>true</i>，否则如果只影响单个分支则为<i>false</i>。

### Returns
- ` result` - (boolean) - 决定是否继续执行默认事件操作（<b>true</b>）或停止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeFolderToggle", function(section,isOpen,allSections){
    // 在这里编写自定义逻辑
    return true;
});
~~~

### Related API
- [onAfterFolderToggle](api/event/onafterfoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
