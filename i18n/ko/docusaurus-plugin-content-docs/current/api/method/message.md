---
sidebar_label: "message"
title: "message method"
description: "선택한 유형의 message 박스를 엽니다"
---

# message

### Description

@short: 선택한 유형의 message 박스를 엽니다

@signature: message: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - message 박스의 구성 설정

### Returns
- ` div` - (HTMLElement) - message 박스를 포함하는 div 요소

### Example

~~~jsx
const box = scheduler.message({ 
    type:"confirm-warning", 
    text:"Are you sure you want to do it?"
});
~~~

### Details

message 박스에 사용할 수 있는 구성 옵션에 대한 자세한 내용은 ["Popup Messages and Modal Boxes"](guides/popups-and-modals.md) 문서에서 확인할 수 있습니다.

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)
-

### Related Guides
- ["Popup Messages and Modal Boxes"](guides/popups-and-modals.md)

### Change log
- 버전 6.0에 추가됨
