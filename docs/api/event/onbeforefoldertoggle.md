---
sidebar_label: onBeforeFolderToggle
title: "onBeforeFolderToggle event"
description: "fires before a tree branch will be opened or closed (the Timeline view, 'tree' mode only)"
---

# onBeforeFolderToggle

:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Fires before a tree branch will be opened or closed (the Timeline view, 'tree' mode only)

@signature: onBeforeFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> boolean

### Parameters

- `section` - (required) *object | boolean* -     the configuration object of the branch to open/close. <br> Takes the <i>true</i> value, if all branches will be closed/opened at once by the closeAllSections()/openAllSections() methods.
- `isOpen` - (required) *boolean* - indicates whether the branch will be opened (<i>true</i>) or closed (<i>false</i>)
- `allSections` - (required) *boolean* - takes the <i>true</i> value, if all tree branches will be closed/opened at once by the closeAllSections()/openAllSections() methods, <i>false</i> - if only one branch will be opened/closed.

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeFolderToggle", function(section,isOpen,allSections){
    //any custom logic here
    return true;
});
~~~

### Related API
- [onAfterFolderToggle](api/event/onafterfoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
