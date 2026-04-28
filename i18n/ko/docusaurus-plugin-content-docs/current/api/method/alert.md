---
sidebar_label: "alert"
title: "alert method"
description: "알림 메시지 박스를 표시합니다"
---

# alert

### Description

@short: 알림 메시지 박스를 표시합니다

@signature: alert: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - alert 박스의 구성 설정

### Returns
- ` div` - (HTMLElement) - alert 박스를 포함하는 div 요소

### Example

~~~jsx
const box = scheduler.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});
~~~

### Details

alert 메시지 박스에 사용할 수 있는 구성 옵션에 대한 자세한 내용은 ["Popup Messages and Modal Boxes"](guides/popups-and-modals.md) 문서를 참조하세요.

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- ["Popup Messages and Modal Boxes"](guides/popups-and-modals.md)

### Change log
- 버전 6.0에서 추가됨
