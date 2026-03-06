---
sidebar_label: "onBeforeTodayDisplayed"
title: "onBeforeTodayDisplayed event"
description: "스케줄러에서 'Today' 버튼이 클릭될 때 트리거됩니다."
---

# onBeforeTodayDisplayed

### Description

@short: 스케줄러에서 'Today' 버튼이 클릭될 때 트리거됩니다.

@signature: onBeforeTodayDisplayed: () =\> boolean

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 또는 방지될지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeTodayDisplayed", function (){
    // 여기에 사용자 정의 로직을 작성하세요
    return true;
});
~~~
