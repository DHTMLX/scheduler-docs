---
sidebar_label: "modalbox"
title: "modalbox method"
description: "modalbox를 엽니다"
---

# modalbox

### Description

@short: Modalbox를 엽니다

@signature: modalbox: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - modalbox 설정 객체

### Returns
- ` div` - (HTMLElement) - modalbox를 포함하는 div 요소

### Example

~~~jsx
const box = scheduler.modalbox({
    title: "Close",
    type: "alert-warning"
});
~~~

### Details

modalbox에 사용할 수 있는 설정 옵션에 대한 자세한 내용은 ["Popup Messages and Modal Boxes"](guides/popups-and-modals.md) 문서를 참고하세요.

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- ["Popup Messages and Modal Boxes"](guides/popups-and-modals.md)

### Change log
- 6.0 버전에 추가됨
