---
sidebar_label: "showCover"
title: "showCover method"
description: "화면의 나머지 부분과의 상호작용을 차단하는 라이트박스 모달 오버레이를 표시합니다."
---

# showCover

### Description

@short: 화면의 나머지 부분과의 상호작용을 차단하는 라이트박스 모달 오버레이를 표시합니다.

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - 표시할 요소를 지정합니다.

### Example

~~~jsx
scheduler.hideCover();
...
scheduler.showCover();
~~~

### Details

요소를 파라미터로 전달하면, 이 메서드는 해당 HTML 요소의 display 속성을 "block"으로 설정하고 화면 중앙에 배치하여 표시합니다.

### Related API
- [hideCover](api/method/hidecover.md)
