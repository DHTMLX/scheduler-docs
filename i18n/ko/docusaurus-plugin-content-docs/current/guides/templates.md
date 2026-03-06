---
title: "레이블, 날짜, 스타일 포매팅"
sidebar_label: "레이블, 날짜, 스타일 포매팅"
---

# 레이블, 날짜, 스타일 포매팅

각 뷰에서 지원하는 템플릿을 확인하려면 링크를 참고하세요.

### 기본 뷰

- ["Day View Templates"](views/day-view-templates.md)
- ["Month View Templates"](views/month-view-templates.md)
- ["주간 뷰 템플릿"](views/week-view-templates.md)


### 확장 뷰

- ["Agenda View Templates"](views/agenda-view-templates.md)
- ["그리드 뷰 템플릿"](views/grid-view-templates.md)
- ["Map View 템플릿"](views/map-view-templates.md)
- ["타임라인 뷰 템플릿"](views/timeline-view-templates.md)
- ["WeekAgenda 뷰 템플릿"](views/weekagenda-view-templates.md)
- ["Units View 템플릿"](views/units-view-templates.md)
- ["Year View Templates"](views/year-view-templates.md)


### 모든 뷰에 공통

- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [Lightbox](guides/common-templates.md#lightbox)
- [Tooltips](guides/common-templates.md#tooltips)
- [Touch support](guides/common-templates.md#touch-support)
- [API templates](guides/common-templates.md#api-templates)


## 템플릿 지정하기 

템플릿은 코드 또는 HTML 마크업을 통해 지정할 수 있습니다.

### 코드로 템플릿 지정

기본적으로 템플릿은 이벤트 객체나 날짜 파라미터를 받아 레이아웃에 삽입될 HTML 문자열을 반환하는 JavaScript 함수로 정의됩니다:

~~~js
scheduler.templates.event_text="function(start," end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

### 마크업으로 템플릿 지정 {#specifying-templates-via-markup}

또 다른 방법은 HTML을 사용하여 선언적으로 템플릿을 정의하는 것입니다. 이 방법을 사용하려면 페이지에 [html_templates](guides/extensions-list.md#html-templates) 확장 기능을 포함해야 합니다. 확장 기능을 활성화한 후에는 다음과 같이 템플릿을 지정할 수 있습니다:

~~~html
<div class="template:event_text">
    <a href='http://some.com/details.php?for="{event.id}"'>{event.text}<a>
</div>
~~~

전체 템플릿 목록은 [API documentation](api/overview/templates_overview.md)에서 확인하실 수 있습니다.
