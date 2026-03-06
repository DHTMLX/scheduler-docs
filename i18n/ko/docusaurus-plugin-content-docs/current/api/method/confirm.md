---
sidebar_label: "confirm"
title: "confirm method"
description: "confirm 메시지 박스를 엽니다"
---

# confirm

### Description

@short: Confirm 메시지 박스를 엽니다

@signature: confirm: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - confirm 박스 설정 객체

### Returns
- ` div` - (HTMLElement) - confirm 박스를 포함하는 div 요소

### Example

~~~jsx
var box = scheduler.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        if(result){
            scheduler.message("Yes!");
        }else{
            scheduler.message("No...");
        }
    }
});
~~~

### Details

confirm 메시지 박스에 사용할 수 있는 설정 옵션에 대한 자세한 내용은 ["Popup Messages and Modal Boxes"](guides/popups-and-modals.md) 문서를 참고하세요.

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- ["Popup Messages and Modal Boxes"](guides/popups-and-modals.md)

### Change log
- 버전 6.0에 추가됨
