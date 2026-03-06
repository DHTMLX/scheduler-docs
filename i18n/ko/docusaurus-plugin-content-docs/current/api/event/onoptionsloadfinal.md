---
sidebar_label: "onOptionsLoadFinal"
title: "onOptionsLoadFinal event"
description: "옵션(섹션) 컬렉션의 로딩이 완료될 때 한 번만 트리거됩니다 (Timeline 뷰에만 적용됨)"
---

# onOptionsLoadFinal

### Description

@short: 옵션(섹션) 컬렉션의 로딩이 완료될 때 한 번만 트리거됩니다 (Timeline 뷰에만 적용됨)

@signature: onOptionsLoadFinal: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadFinal", function (){
    //여기에 커스텀 로직을 작성할 수 있습니다
});
~~~

### Details

이 이벤트는 dhtxmlConnector를 통해서 또는 [updateCollection](api/method/updatecollection.md) 메서드를 사용하여 컬렉션이 로드될 때만 발생합니다.
