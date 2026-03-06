---
sidebar_label: "onAfterFolderToggle"
title: "onAfterFolderToggle event"
description: "当树状分支被打开或关闭后立即触发（仅适用于Timeline视图中的'tree'模式）"
---

# onAfterFolderToggle
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 当树状分支被打开或关闭后立即触发（仅适用于Timeline视图中的"tree"模式）

@signature: onAfterFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> void

### Parameters

- `section` - (required) *object | boolean* -      被切换的分支的配置对象。<br>如果通过 closeAllSections()/openAllSections() 方法同时打开或关闭了所有分支，则该值为 true。
- `isOpen` - (required) *boolean* - 表示分支是被打开（<i>true</i>）还是关闭（<i>false</i>）
- `allSections` - (required) *boolean* - 如果通过 closeAllSections()/openAllSections() 方法一次性切换了所有树状分支，则为 <i>true</i>，如果只是切换了单个分支，则为 <i>false</i>

### Example

~~~jsx
scheduler.attachEvent("onAfterFolderToggle", function(section, isOpen, allSections){
    // 在这里编写自定义逻辑
});
~~~

### Related API
- [onBeforeFolderToggle](api/event/onbeforefoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
