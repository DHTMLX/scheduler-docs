---
sidebar_label: "quick_info_content"
title: "quick_info_content template"
description: "팝업 편집 폼 안에 표시되는 내용을 정의합니다"
---

# quick_info_content

### Description

@short: 팝업 편집 폼 안에 표시되는 내용을 정의합니다

@signature: quick_info_content: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 시간
- `end` - (required) *Date* - 이벤트가 종료되는 시간
- `event` - (required) *object* - 이벤트 객체 자체

### Returns
- ` text` - (string) - 스케줄러에 표시할 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.quick_info_content = function(start, end, ev){ 
       return ev.details || ev.text;
};
~~~

### Details

:::note
 이 템플릿은 [quick_info](guides/extensions-list.md#quick-info) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["공통 템플릿"](guides/common-templates.md#touch-support)
- ["전체 확장 기능 목록"](guides/extensions-list.md#quick-info)
