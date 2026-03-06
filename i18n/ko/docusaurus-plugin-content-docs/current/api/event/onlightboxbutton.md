---
sidebar_label: "onLightboxButton"
title: "onLightboxButton event"
description: "사용자가 라이트박스 내부의 커스텀 버튼을 클릭할 때 트리거됩니다."
---

# onLightboxButton

### Description

@short: 사용자가 라이트박스 내부의 커스텀 버튼을 클릭할 때 트리거됩니다.

@signature: onLightboxButton: (id: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 버튼의 id
- `node` - (required) *HTMLElement* - 클릭된 버튼의 HTML 요소
- `e` - (required) *event* - 네이티브 'click' 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onLightboxButton", function (id, node, e){
    // 여기에 커스텀 로직을 작성하세요
});
~~~

### Related samples
- [Setting/getting values of lightbox's controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)

### Details

이 이벤트는 라이트박스 하단에 위치한 커스텀 버튼에 대해서만 트리거됩니다. 기본 버튼이나 섹션 버튼에서는 작동하지 않습니다.

라이트박스가 현재 열려 있는지 닫혀 있는지 확인하려면 [getState](api/method/getstate.md) 메서드에서 반환되는 state 객체의 **lightbox_id** 속성을 확인할 수 있습니다. 
라이트박스가 열려 있으면 이 메서드는 활성 이벤트의 id를 반환하며, 닫혀 있으면 'null' 또는 'undefined'를 반환합니다:

~~~js
if (scheduler.getState().lightbox_id){
    // 라이트박스가 열려 있을 때의 로직
} else {
    // 라이트박스가 닫혀 있을 때의 로직
}
~~~

### Related Guides
- ["Lightbox 조작하기"](guides/lightbox-editors-manipulations.md#checking-whether-the-lightbox-is-opened)
