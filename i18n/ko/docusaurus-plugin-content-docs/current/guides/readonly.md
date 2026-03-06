---
title: "읽기 전용 모드"
sidebar_label: "읽기 전용 모드"
---

# 읽기 전용 모드

이 섹션에서는 네 가지 다른 시나리오에서 읽기 전용 모드에 대해 설명합니다:

1. [스케줄러 전체에 대한 읽기 전용 모드](guides/readonly.md#read-only-mode-for-the-entire-scheduler);
2. [라이트박스 전체에 대한 읽기 전용 모드](guides/readonly.md#read-only-mode-for-the-entire-lightbox);
3. [라이트박스의 섹션에 대한 읽기 전용 모드](guides/readonly.md#read-only-mode-for-a-lightboxs-section);
4. [특정 이벤트에 대한 읽기 전용 모드](guides/readonly.md#read-only-mode-for-specific-events).

## 스케줄러 전체에 대한 읽기 전용 모드 {#read-only-mode-for-the-entire-scheduler}

스케줄러 전체를 읽기 전용으로 설정하려면 [readonly](api/config/readonly.md) 옵션을 *true*로 지정하면 됩니다.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2019, 5,11),"month");
~~~
스케줄러 전체가 읽기 전용이 되면, 사용자는 라이트박스를 열 수 없습니다.


## 라이트박스 전체에 대한 읽기 전용 모드 {#read-only-mode-for-the-entire-lightbox}

사용자가 라이트박스를 열 수는 있지만, 내부에서 어떠한 편집도 하지 못하게 하려면 [readonly_form](api/config/readonly_form.md) 옵션을 *true*로 설정하세요:

~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2019, 5,11),"month");
~~~

:::note
[readonly](api/config/readonly.md) 옵션은 [readonly](guides/extensions-list.md#readonly) 확장 기능과 함께 제공되므로, 해당 확장 기능이 페이지에서 활성화되어 있는지 확인하세요.
:::


[Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## 라이트박스의 섹션에 대한 읽기 전용 모드 {#read-only-mode-for-a-lightboxs-section}

라이트박스의 특정 섹션만 읽기 전용으로 만들려면 해당 섹션 객체의 DOM 요소에 'disabled' 속성을 사용하세요:

~~~js
scheduler.config.lightbox.sections="["
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.attachEvent("onLightbox", function(){
   var section = scheduler.formSection("description");
   section.control.disabled = true;
});
~~~

:::note
섹션을 type으로 참조하므로, 해당 type을 가진 모든 섹션이 동시에 읽기 전용이 됩니다.
:::

## 특정 이벤트에 대한 읽기 전용 모드 {#read-only-mode-for-specific-events}

특정 이벤트만 읽기 전용으로 만들려면 해당 이벤트에 'readonly' 속성을 추가하고 true로 설정하세요:

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
이 기능은 [readonly](guides/extensions-list.md#readonly) 확장 기능의 일부이므로, 해당 확장 기능이 페이지에서 활성화되어 있는지 확인하세요.
:::


[Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)
