--- 
title: "완전히 사용자 정의 라이트박스" 
sidebar_label: "완전히 사용자 정의 라이트박스" 
---

# 완전히 사용자 정의 라이트박스

스케줄러에 완전히 사용자 정의 라이트박스를 지정하려면 [showLightbox](api/method/showlightbox.md) 메서드를 재정의해야 합니다:

~~~js
scheduler.showLightbox = function(id){
    // id - id of event
    ... code to show any custom form ...
}
~~~

구현을 단순화하기 위해 사용할 수 있는 2개의 도우미 메서드가 있습니다:

- [startLightbox](api/method/startlightbox.md) - 화면 중앙에 지정된 HTML 컨테이너에 커스텀 라이트박스를 표시합니다.
- [endLightbox](api/method/endlightbox.md) - 라이트박스를 닫습니다

페이지 어딘가에 **#custom_form** HTML 컨테이너가 있다고 가정합시다. 그러면 커스텀 라이트박스를 구현하려면 아래 코드를 사용할 수 있습니다:

~~~js
const custom_form = document.getElementById("custom_form");

scheduler.showLightbox = function(id){
    const ev = scheduler.getEvent(id);
    scheduler.startLightbox(id, custom_form );
    ...'here you need to set values in the form'...
    //document.getElementById("some_input").value = ev.text;
}
//needs to be attached to the 'save' button
function save_form() {
    const ev = scheduler.getEvent(scheduler.getState().lightbox_id);
    ...'here you need to retrieve values from the form'...
    //ev.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, custom_form);
}
//needs to be attached to the 'cancel' button
function close_form(argument) {
    scheduler.endLightbox(false, custom_form);
}
~~~


[완전히 사용자 정의 라이트박스](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)