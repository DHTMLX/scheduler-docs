---
sidebar_label: "startLightbox"
title: "startLightbox method"
description: "지정한 HTML 컨테이너 내에 커스텀 라이트박스를 화면 중앙에 표시합니다."
---

# startLightbox

### Description

@short: 지정한 HTML 컨테이너 내에 커스텀 라이트박스를 화면 중앙에 표시합니다.

@signature: startLightbox: (id: string, box: HTMLElement) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 id
- `box` - (required) *HTMLElement* - 라이트박스를 표시할 HTML 컨테이너

### Example

~~~jsx
<div id="my_form">
    ...
</div>

<script>
scheduler.showLightbox = function(id) {
    scheduler.startLightbox(id, document.getElementById("my_form"));
    ...
};
</script>
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Details

커스텀 라이트박스를 닫으려면 [endLightbox](api/method/endlightbox.md) 메서드를 사용할 수 있습니다.

### Related API
- [endLightbox](api/method/endlightbox.md)
- [showLightbox](api/method/showlightbox.md)

### Related Guides
- ["완전히 커스텀된 라이트박스"](guides/custom-details-form.md)
