---
sidebar_label: onClick
title: "onClick 이벤트"
description: "사용자가 이벤트의 왼쪽 마우스 버튼을 클릭할 때 발생합니다"
---

# onClick

### Description

@short: 사용자가 이벤트를 왼쪽 마우스 버튼으로 클릭할 때 발생합니다

@signature: onClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- `result` - (boolean) - 이벤트의 기본 동작이 트리거될지(`true`) 또는 취소될지(`false`)를 정의합니다

### Example

~~~jsx
scheduler.attachEvent("onClick", (id, event) => {
    // 여기에 사용자 정의 로직 작성
    return true;
});
~~~

### Related samples
- [이벤트 박스의 선택 바 숨기기](https://docs.dhtmlx.com/scheduler/samples/02_customization/10_without_toolbar.html)
- [읽기 전용 Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

이벤트는 차단 가능합니다. 핸들러에서 `true`가 아닌 값을 반환하면 기본 반응이 차단됩니다. 기본적으로 선택 바가 표시됩니다.

### Related Guides
- [Lightbox 조작](guides/lightbox-editors-manipulations.md#opening-the-lightbox-on-a-single-click)