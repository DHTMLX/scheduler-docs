---
sidebar_label: "onBeforeFolderToggle"
title: "onBeforeFolderToggle event"
description: "타임라인 뷰의 '트리' 모드에서 트리 브랜치가 열리거나 닫히기 직전에 발생합니다."
---

# onBeforeFolderToggle
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 타임라인 뷰의 '트리' 모드에서 트리 브랜치가 열리거나 닫히기 직전에 발생합니다.

@signature: onBeforeFolderToggle: (section: object | boolean, isOpen: boolean, allSections: boolean) =\> boolean

### Parameters

- `section` - (required) *object | boolean* -      열리거나 닫히려는 브랜치의 구성 객체입니다. <br> closeAllSections()/openAllSections() 메서드를 사용해 모든 브랜치가 동시에 닫히거나 열릴 경우 <i>true</i>가 됩니다.
- `isOpen` - (required) *boolean* - 브랜치가 열릴 예정이면 (<i>true</i>), 닫힐 예정이면 (<i>false</i>) 입니다.
- `allSections` - (required) *boolean* - closeAllSections()/openAllSections()를 통해 모든 트리 브랜치가 한 번에 열리거나 닫힐 경우 <i>true</i>, 단일 브랜치에만 영향이 있을 경우 <i>false</i> 입니다.

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 계속할지 (<b>true</b>) 중단할지 (<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeFolderToggle", function(section,isOpen,allSections){
    //여기에 커스텀 로직 작성
    return true;
});
~~~

### Related API
- [onAfterFolderToggle](api/event/onafterfoldertoggle.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
