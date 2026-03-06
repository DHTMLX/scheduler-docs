---
sidebar_label: "hideCover"
title: "hideCover method"
description: "화면의 나머지 부분과의 상호작용을 차단하는 라이트박스 모달 오버레이를 제거합니다."
---

# hideCover

### Description

@short: 화면의 나머지 부분과의 상호작용을 차단하는 라이트박스 모달 오버레이를 제거합니다.

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - 숨겨야 하는 요소입니다.

### Example

~~~jsx
scheduler.hideCover(scheduler.getLightbox());
~~~

### Details

입력 파라미터로 요소를 제공하면, 이 메서드는 해당 HTML 요소의 display 스타일을 "none"으로 설정하여 숨깁니다.

### Related API
- [showCover](api/method/showcover.md)
