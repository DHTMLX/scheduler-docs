---
sidebar_label: "onScaleAdd"
title: "onScaleAdd event"
description: "스케줄러에서 단일 뷰 단위(예: 컬럼, 섹션, 또는 일 셀)가 렌더링된 직후에 트리거됩니다."
---

# onScaleAdd

### Description

@short: 스케줄러에서 단일 뷰 단위(예: 컬럼, 섹션, 또는 일 셀)가 렌더링된 직후에 트리거됩니다.

@signature: onScaleAdd: (unit: HTMLElement, date: object) =\> void

### Parameters

- `unit` - (required) *HTMLElement* - 특정 뷰 단위를 나타내는 HTML 요소
- `date` - (required) *object* - 해당 단위와 연관된 날짜

### Example

~~~jsx
scheduler.attachEvent("onScaleAdd", function (unit, date){
    //여기에 사용자 정의 로직을 작성하세요
});
~~~

### Details

각기 다른 뷰는 다양한 단위로 구성됩니다:

- **Day view** - 하루 전체를 나타내는 컬럼;
- **Week view** - 각 요일에 해당하는 컬럼;
- **Month view** - 각 요일에 해당하는 셀;
- **Units** - 섹션;
- **Timeline** - 섹션;
- **Year** - 하루를 나타내는 셀.
