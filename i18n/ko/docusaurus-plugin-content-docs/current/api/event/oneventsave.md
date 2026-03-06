---
sidebar_label: "onEventSave"
title: "onEventSave event"
description: "사용자가 라이트박스(편집 폼)에서 '저장' 버튼을 클릭할 때 트리거됩니다."
---

# onEventSave

### Description

@short: 사용자가 라이트박스(편집 폼)에서 '저장' 버튼을 클릭할 때 트리거됩니다.

@signature: onEventSave: (id: string, ev: object, original_ev: object) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `ev` - (required) *object* - 라이트박스에서 가져온 값들을 담고 있는 중간 이벤트 객체
- `is_new` - (required) *Date* - 새 이벤트가 저장될 때 생성 날짜를 제공하며, 기존 이벤트인 경우 <i>null</i>입니다.

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 계속할지(<b>true</b>) 중단할지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,ev,is_new){
    if (!ev.text) {
        alert("텍스트는 비어 있으면 안 됩니다");
        return false;
    }
    if (!ev.text.length<20) {
        alert("텍스트가 너무 짧습니다");
        return false;
    }
    return true;
})
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)

### Details

이 이벤트는 차단할 수 있으며, 유효성 검사 목적으로 유용합니다. *false*를 반환하면 기본 저장 프로세스가 중단됩니다.

유의사항:

- 이 이벤트가 발생할 때 라이트박스의 값이 아직 원본 이벤트에 적용되지 않았기 때문에 <code>scheduler.getEvent(id)</code>는 원본 상태의 이벤트를 반환합니다.
- 'ev' 객체에는 라이트박스에 존재하는 입력 필드에 해당하는 속성만 포함됩니다. 예를 들어, 라이트박스에 입력 필드가 하나만 있다면 'ev'에는 그 하나의 속성만 존재합니다.
