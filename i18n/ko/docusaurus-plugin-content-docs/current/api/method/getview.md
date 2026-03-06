---
sidebar_label: "getView"
title: "getView method"
description: "이름을 기반으로 뷰 객체를 반환합니다. 이름이 지정되지 않으면 현재 뷰를 반환합니다."
---

# getView

### Description

@short: 이름을 기반으로 뷰 객체를 반환합니다. 이름이 지정되지 않으면 현재 뷰를 반환합니다.

@signature: getView: (name?: string) =\> any

### Parameters

- `name` - (optional) *string* - 선택 사항, 뷰의 이름

### Returns
- ` view` - (object) - 뷰 객체

### Example

~~~jsx
var timeline = scheduler.getView(); 
timeline.x_size = 8;
scheduler.setCurrentView();
~~~

### Related samples
- [Display labels in timeline cells](https://docs.dhtmlx.com/scheduler/samples/06_timeline/17_timeline_cell_content.html)

### Details

이 메서드는 자체 객체 표현을 가진 뷰만 반환합니다. 현재 이에는 [timeline](views/timeline.md#timelineobjectapi) 및 [units](views/units.md) 뷰가 포함되며, 다른 모든 뷰에 대해서는 메서드가 *null*을 반환합니다.

### Related Guides
- ["타임라인 뷰"](views/timeline.md)
- ["Units View"](views/units.md)
