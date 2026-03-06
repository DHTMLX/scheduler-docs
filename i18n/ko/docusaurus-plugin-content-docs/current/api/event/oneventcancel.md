---
sidebar_label: "onEventCancel"
title: "onEventCancel event"
description: "사용자가 라이트박스(편집 폼)에서 '취소' 버튼을 눌렀을 때 트리거됩니다."
---

# onEventCancel

### Description

@short: 사용자가 라이트박스(편집 폼)에서 '취소' 버튼을 눌렀을 때 트리거됩니다.

@signature: onEventCancel: (id: string, flag: boolean) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `flag` - (required) *boolean* - 사용자가 새 이벤트 작성을 취소하는 경우 'true',<br> 이미 존재하는 이벤트를 편집하다 취소하는 경우 'false'를 나타냅니다.

### Example

~~~jsx
scheduler.attachEvent("onEventCancel", function(id, flag){
    //여기에 사용자 정의 로직 작성
});
~~~
