---
sidebar_label: "endLightbox"
title: "endLightbox method"
description: "라이트박스를 닫을 때 사용됩니다."
---

# endLightbox

### Description

@short: 라이트박스를 닫을 때 사용됩니다.

@signature: endLightbox: (mode: boolean, box?: HTMLElement) =\> void

### Parameters

- `mode` - (required) *boolean* - <i>true</i>로 설정하면 라이트박스 내에서 이루어진 모든 변경 사항이 저장된 후 닫힙니다. <br> <i>false</i>로 설정하면 변경 사항이 취소됩니다.  
- `box` - (optional) *HTMLElement* - 라이트박스를 포함하는 HTML 요소입니다.

### Example

~~~jsx
scheduler.endLightbox(false);  
// 또는  
scheduler.endLightbox(true, document.getElementById("my_form"));
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Details

:::note
  
이 메서드는 주로 커스텀 라이트박스를 사용할 때 호출됩니다. 
 
:::
