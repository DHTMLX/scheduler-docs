---
sidebar_label: "setSkin"
title: "setSkin method"
description: "현재 활성 스킨을 변경합니다"
---

# setSkin

### Description

@short: 현재 활성 스킨을 변경합니다

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - 적용할 스킨 이름입니다. 유효한 옵션으로는 "terrace", "dark", "material", "flat", "contrast-white", "contrast-black"이 있습니다.

### Example

~~~jsx
scheduler.setSkin("flat");
~~~

### Related samples
- [Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)

### Details

이 메서드는 scheduler가 초기화된 후에 호출되면, [render](api/method/render.md) 메서드를 호출하여 화면을 업데이트합니다.

초기화 전에 호출되면, `scheduler.skin` 속성을 직접 설정하는 것과 동일하게 동작합니다:

~~~js
scheduler.skin = "flat";
~~~

### Related Guides
- ["스킨(Skins)"](guides/skins.md)
