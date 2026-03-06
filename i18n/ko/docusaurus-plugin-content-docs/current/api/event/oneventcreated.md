---
sidebar_label: "onEventCreated"
title: "onEventCreated event"
description: "사용자가 새 이벤트를 생성하기 시작할 때 트리거됩니다 (더블 클릭하거나 드래그하여 생성할 때)"
---

# onEventCreated

### Description

@short: 사용자가 새 이벤트를 생성하기 시작할 때 트리거됩니다 (더블 클릭하거나 드래그하여 생성할 때)

@signature: onEventCreated: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 이벤트의 고유 식별자
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
scheduler.attachEvent("onEventCreated", function(id,e){
    //여기에 커스텀 로직을 추가할 수 있습니다
});
~~~
