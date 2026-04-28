---
title: "읽기 전용 모드"
sidebar_label: "읽기 전용 모드"
---

# 읽기 전용 모드

다음 네 가지 상황의 맥락에서 읽기 전용 모드를 살펴보고자 합니다:

1. [전체 스케줄러에 대한 읽기 전용 모드](guides/readonly.md#read-only-mode-for-the-entire-scheduler);
2. [전체 라이트박스에 대한 읽기 전용 모드](guides/readonly.md#read-only-mode-for-the-entire-lightbox);
3. [라이트박스 섹션에 대한 읽기 전용 모드](guides/readonly.md#read-only-mode-for-a-lightboxs-section);
4. [특정 이벤트에 대한 읽기 전용 모드](guides/readonly.md#read-only-mode-for-specific-events).

## 전체 스케줄러에 대한 읽기 전용 모드

전체 스케줄러를 읽기 전용으로 만들려면 [`readonly`](api/config/readonly.md) 옵션을 `true`로 설정합니다.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here', new Date(2027, 5, 11), "month");
~~~

참고로, 전체 스케줄러가 비편집 상태일 때 사용자는 라이트박스를 열 수 없습니다.

## 전체 라이트박스에 대한 읽기 전용 모드

사용자가 라이트박스를 열 수 있도록 두되, 그 안에서의 편집은 금지하려면 [`readonly_form`](api/config/readonly_form.md) 옵션을 `true`로 설정합니다:

~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here', new Date(2027, 5, 11), "month");
~~~ 

:::note
[`readonly`](api/config/readonly.md) 옵션은 [readonly](guides/extensions-list.md#readonly) 확장에서 제공되며, 이를 사용하려면 페이지에서 확장을 활성화해야 합니다.
:::

### Related samples
- [읽기 전용 라이트박스](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## 라이트박스 섹션에 대한 읽기 전용 모드

특정 라이트박스 섹션을 읽기 전용으로 만들려면 관련 섹션 객체의 DOM 요소의 `disabled` 속성을 사용합니다:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];

scheduler.attachEvent("onLightbox", () => {
    const descriptionSection = scheduler.formSection("description");
    descriptionSection.control.disabled = true;
});
~~~ 

:::note
참고로 섹션은 그 타입을 통해 참조하며, 이 타입을 가진 모든 섹션은 한 번에 읽기 전용이 됩니다.
:::

## 특정 이벤트에 대한 읽기 전용 모드

특정 이벤트를 읽기 전용으로 만들려면 해당 이벤트에 `readonly` 속성을 추가하고 이를 `true`로 설정합니다:

~~~js
scheduler.getEvent(id).readonly = true;
~~~ 

:::note
이 기능은 [readonly](guides/extensions-list.md#readonly) 확장에서 제공되며, 이를 사용하려면 페이지에서 확장을 활성화해야 합니다.
:::

### Related samples
- [읽기 전용 이벤트](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)