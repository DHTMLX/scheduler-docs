---
title: "읽기 전용 모드"
sidebar_label: "읽기 전용 모드"
---

# 읽기 전용 모드

다음 4가지 상황의 맥락에서 읽기 전용 모드를 다루겠습니다:

1. [전체 스케줄러의 읽기 전용 모드](guides/readonly.md#read-only-mode-for-the-entire-scheduler);
2. [전체 라이트박스의 읽기 전용 모드](guides/readonly.md#read-only-mode-for-the-entire-lightbox);
3. [라이트박스의 섹션에 대한 읽기 전용 모드](guides/readonly.md#read-only-mode-for-a-lightboxs-section);
4. [특정 이벤트의 읽기 전용 모드](guides/readonly.md#read-only-mode-for-specific-events).

## 전체 스케줄러에 대한 읽기 전용 모드

전체 스케줄러를 읽기 전용으로 만들려면 [readonly](api/config/readonly.md) 옵션을 *true*로 설정합니다.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2027, 5,11),"month");
~~~
참고로, 전체 스케줄러가 비편집 상태일 경우 사용자는 라이트박스를 열 수 없습니다.

## 전체 라이트박스에 대한 읽기 전용 모드

사용자에게 라이트박스를 열 수 있는 가능성은 남겨두되, 내부에서의 편집은 금지하려면 [readonly_form](api/config/readonly_form.md) 옵션을 *true*로 설정합니다:


~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2027, 5,11),"month");
~~~


:::note
참고, [readonly](api/config/readonly.md) 옵션은 [readonly](guides/extensions-list.md#readonly) 확장에 포함되어 있으며 이를 사용하려면 페이지에서 확장을 활성화해야 합니다.
:::




[읽기 전용 라이트박스](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## 라이트박스의 섹션에 대한 읽기 전용 모드

특정 라이트박스의 섹션을 읽기 전용으로 만들려면 관련 섹션 객체의 DOM 요소에 있는 'disabled' 속성을 사용합니다:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.attachEvent("onLightbox", function(){
   const section = scheduler.formSection("description");
   section.control.disabled = true;
});
~~~

:::note
참고, 이 유형을 가진 모든 섹션은 한꺼번에 읽기 전용이 됩니다.
:::

## 특정 이벤트에 대한 읽기 전용 모드

특정 이벤트를 읽기 전용으로 만들려면 해당 이벤트에 'read-only' 속성을 추가하고 값을 true로 설정합니다:

~~~js
scheduler.getEvent(id).readonly = true;
~~~


:::note
이 기능은 [readonly](guides/extensions-list.md#readonly) 확장에 의해 제공되며 이를 사용하려면 페이지에서 확장을 활성화해야 합니다.
:::


[읽기 전용 이벤트](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)