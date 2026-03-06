---
sidebar_label: "onOptionsLoad"
title: "onOptionsLoad event"
description: "Timeline/Units 뷰의 일부가 업데이트된 후 트리거됩니다."
---

# onOptionsLoad

### Description

@short: Timeline/Units 뷰의 일부가 업데이트된 후 트리거됩니다.

@signature: onOptionsLoad: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoad", function (){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

이 이벤트는 다음과 같은 상황이 발생할 때 실행됩니다:

- 현재 설정된 [y_unit](views/timeline.md#initialization) 또는 [list](views/units.md#initialization) 속성에 따라 Timeline/Unit 뷰가 표시할 섹션을 재계산할 때;
- [scheduler.resetLightbox](api/method/resetlightbox.md)가 실행될 때;
- [scheduler.setCurrentView](api/method/setcurrentview.md)가 실행될 때.

다음과 같은 시나리오에서 이 이벤트가 트리거되는 것을 확인할 수 있습니다:

- Timeline/Units 뷰가 초기화되고 섹션이 처음으로 파싱될 때;
- [data](guides/data-formats.md#json-with-collections)를 사용해 섹션이 로드될 때;
- 매번 [scheduler.updateCollection](api/method/updatecollection.md)가 호출될 때.
