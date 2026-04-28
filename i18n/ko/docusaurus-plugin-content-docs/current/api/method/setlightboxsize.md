---
sidebar_label: "setLightboxSize"
title: "setLightboxSize method"
description: "라이트박스 크기를 업데이트합니다."
---

# setLightboxSize

### Description

@short: 라이트박스 크기를 업데이트합니다.

@signature: setLightboxSize: () =\> void

### Example

~~~jsx
const control = scheduler.formSection("description");
control.header.style.display = "none";

scheduler.setLightboxSize();
~~~

### Details

이 메서드는 특정 섹션이 숨겨지거나 표시된 후에 라이트박스 크기를 조정하는 데 유용합니다.
