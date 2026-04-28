--- 
title: "완전히 커스텀 라이트박스"
sidebar_label: "완전히 커스텀 라이트박스"
---

# 완전히 커스텀 라이트박스

스케줄러에 대해 완전히 커스텀 라이트박스를 지정하려면, [`showLightbox()`](api/method/showlightbox.md) 메서드를 재정의하십시오:

~~~js
scheduler.showLightbox = (id) => {
    // id - 이벤트의 id
    ... 커스텀 폼을 표시하는 코드 ...
};
~~~

구현을 단순화하기 위해 사용할 수 있는 2개의 도우미 메서드가 있습니다:

- [`startLightbox()`](api/method/startlightbox.md) - 지정된 HTML 컨테이너에서 화면 중앙에 커스텀 라이트박스를 표시합니다
- [`endLightbox()`](api/method/endlightbox.md) - 라이트박스를 닫습니다

페이지 어딘가에 `#custom_form` HTML 컨테이너가 있다고 가정합니다. 그러면 아래와 같이 커스텀 라이트박스를 구현할 수 있습니다:

~~~js
const customForm = document.getElementById("custom_form");

scheduler.showLightbox = (id) => {
    const event = scheduler.getEvent(id);
    scheduler.startLightbox(id, customForm);
    //'여기서 폼에 값을 설정해야 합니다'
    // document.getElementById("some_input").value = event.text;
};

// '저장' 버튼에 연결되어야 합니다
const saveForm = () => {
    const event = scheduler.getEvent(scheduler.getState().lightbox_id);
    //'여기서 폼에서 값을 가져와야 합니다'
    // event.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, customForm);
};

// '취소' 버튼에 연결되어야 합니다
const closeForm = () => {
    scheduler.endLightbox(false, customForm);
};
~~~

### Related samples

- [완전히 커스텀 라이트박스](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)