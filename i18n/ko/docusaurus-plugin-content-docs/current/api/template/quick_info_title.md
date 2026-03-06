---
sidebar_label: "quick_info_title"
title: "quick_info_title template"
description: "팝업 편집 폼의 제목을 설정합니다"
---

# quick_info_title

### Description

@short: 팝업 편집 폼의 제목을 설정합니다

@signature: quick_info_title: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트의 시작 날짜
- `end` - (required) *Date* - 이벤트의 종료 날짜
- `event` - (required) *object* - 이벤트 객체 자체

### Returns
- ` text` - (string) - 스케줄러에 표시할 html 콘텐츠

### Example

~~~jsx
scheduler.templates.quick_info_title = function(start, end, ev){ 
       return ev.text.substr(0,50); 
};
~~~

### Details

:::note
 이 템플릿은 [quick_info](guides/extensions-list.md#quick-info) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["공통 템플릿"](guides/common-templates.md#touch-support)
- ["전체 확장 기능 목록"](guides/extensions-list.md#quick-info)
