---
sidebar_label: onAfterFolderToggle
title: "onAfterFolderToggle event"
description: "fires after a tree branch was opened or closed (the Timeline view, 'tree' mode only)"
---

# onAfterFolderToggle

:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Fires after a tree branch was opened or closed (the Timeline view, 'tree' mode only)

@signature: onAfterFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> void

### Parameters

- `section` - (required) *object | boolean*    -  the configuration object of the opened/closed branch. <br>Takes the true value, if all branches were closed/opened at once by the closeAllSections()/openAllSections() methods.
- `isOpen` - (required) *boolean* - indicates whether the branch was opened (<i>true</i>) or closed (<i>false</i>)
- `allSections` - (required) *boolean* - takes the <i>true</i> value, if all tree branches were closed/opened at once by the closeAllSections()/openAllSections() methods, 

### Example

~~~jsx
scheduler.attachEvent("onAfterFolderToggle", function(section, isOpen, allSections){
    //any custom logic here
});
~~~

### Related API
- [onBeforeFolderToggle](api/event/onbeforefoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
