---
sidebar_label: "onOptionsLoadStart"
title: "onOptionsLoadStart event"
description: "서버에서 옵션 또는 섹션 집합이 로드되기 바로 직전에 트리거됩니다 (Timeline 뷰에만 적용됨)"
---

# onOptionsLoadStart

### Description

@short: 서버에서 옵션 또는 섹션 집합이 로드되기 바로 직전에 트리거됩니다 (Timeline 뷰에만 적용됨)

@signature: onOptionsLoadStart: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadStart", function (){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

이 이벤트는 dhtxmlConnector를 통해서든 [updateCollection](api/method/updatecollection.md) 메서드를 사용하든 컬렉션이 로드될 때만 발생합니다.
