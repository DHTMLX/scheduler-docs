---
title: "완전히 커스텀된 라이트박스"
sidebar_label: "완전히 커스텀된 라이트박스"
---

# 완전히 커스텀된 라이트박스

스케줄러에서 완전히 커스텀된 라이트박스를 만들기 위해서는 [showLightbox](api/method/showlightbox.md) 메서드를 오버라이드해야 합니다:

~~~js
scheduler.showLightbox = function(id){
    // id - 이벤트의 id
    ... 커스텀 폼을 표시하는 코드 ...
}
~~~

이를 더 쉽게 만들어주는 두 가지 헬퍼 메서드가 있습니다:


- [startLightbox](api/method/startlightbox.md) - 지정한 HTML 컨테이너 안에 커스텀 라이트박스를 화면 중앙에 표시합니다.
- [endLightbox](api/method/endlightbox.md) - 라이트박스를 닫습니다


페이지 어딘가에 **#custom_form**이라는 ID를 가진 HTML 컨테이너가 있다고 가정해봅니다. 커스텀 라이트박스를 구현하려면 다음과 같이 할 수 있습니다:

~~~js
var custom_form = document.getElementById("custom_form");

scheduler.showLightbox = function(id){
    var ev = scheduler.getEvent(id);
    scheduler.startLightbox(id, custom_form );
    //'여기서 폼에 값을 설정해야 합니다'
    //document.getElementById("some_input").value = ev.text;
}
// '저장' 버튼에 연결되어야 합니다
function save_form() {
    var ev = scheduler.getEvent(scheduler.getState().lightbox_id);
    //'여기서 폼에서 값을 가져와야 합니다'
    //ev.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, custom_form);
}
// '취소' 버튼에 연결되어야 합니다
function close_form(argument) {
    scheduler.endLightbox(false, custom_form);
}
~~~


[Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
