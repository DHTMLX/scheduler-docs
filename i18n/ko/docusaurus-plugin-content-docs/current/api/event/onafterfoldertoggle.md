---
sidebar_label: "onAfterFolderToggle"
title: "onAfterFolderToggle event"
description: "타임라인 뷰의 'tree' 모드에서 트리 분기가 열리거나 닫힌 직후에 트리거됩니다."
---

# onAfterFolderToggle
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 타임라인 뷰의 'tree' 모드에서 트리 분기가 열리거나 닫힌 직후에 트리거됩니다.

@signature: onAfterFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> void

### Parameters

- `section` - (required) *object | boolean* -      토글된 분기(branch)의 구성 객체입니다. <br>closeAllSections()/openAllSections() 메서드를 사용하여 모든 분기가 동시에 열리거나 닫힌 경우에는 true가 됩니다.
- `isOpen` - (required) *boolean* - 분기가 열렸는지(<i>true</i>) 닫혔는지(<i>false</i>)를 나타냅니다.
- `allSections` - (required) *boolean* - closeAllSections()/openAllSections() 메서드로 모든 트리 분기가 한 번에 토글된 경우 <i>true</i>, 단일 분기만 토글된 경우 <i>false</i>입니다.

### Example

~~~jsx
scheduler.attachEvent("onAfterFolderToggle", function(section, isOpen, allSections){
    //여기에 사용자 정의 로직을 작성하세요
});
~~~

### Related API
- [onBeforeFolderToggle](api/event/onbeforefoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
