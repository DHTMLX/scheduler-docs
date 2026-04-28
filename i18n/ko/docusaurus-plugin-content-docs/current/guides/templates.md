---
title: "레이블, 날짜, 스타일 포맷팅"
sidebar_label: "레이블, 날짜, 스타일 포맷팅"
---

# 레이블, 날짜, 스타일 포맷팅

보기의 링크를 따라가면 해당 보기에서 지원하는 템플릿을 확인할 수 있습니다.

### 기본 보기

- [일간 보기 템플릿](views/day-view-templates.md)
- [월간 보기 템플릿](views/month-view-templates.md)
- [주간 보기 템플릿](views/week-view-templates.md)

### 확장 보기

- [일정 뷰 템플릿](views/agenda-view-templates.md)
- [그리드 뷰 템플릿](views/grid-view-templates.md)
- [지도 뷰 템플릿](views/map-view-templates.md)
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
- [주간 일정 뷰 템플릿](views/weekagenda-view-templates.md)
- [단위 뷰 템플릿](views/units-view-templates.md)
- [연간 뷰 템플릿](views/year-view-templates.md)

### 모든 뷰에 공통

- [미니 달력 템플릿](guides/mini-calendar-templates.md)
- [라이트박스](guides/common-templates.md#lightbox)
- [툴팁](guides/common-templates.md#tooltips)
- [터치 지원](guides/common-templates.md#touch-support)
- [API 템플릿](guides/common-templates.md#api-templates)


## 템플릿 지정

템플릿을 설정하는 방법은 2가지가 있습니다: 코드에서 또는 HTML 마크업에서 설정하는 방법입니다.

### 코드로 템플릿 지정

기본적으로 템플릿은 이벤트 객체나 날짜 인수를 받아 HTML 문자열을 반환하는 JS 함수로 정의될 수 있으며, 이 문자열은 레이아웃에 삽입됩니다:

~~~js
scheduler.templates.event_text = (start, end, event) => {
    return `<a href='http://some.com/details.php?for=${event.id}'>${event.text}</a>`;
};
~~~

### 마크업으로 템플릿 지정

또는 HTML에서 선언적으로 템플릿을 정의할 수 있습니다. 이 방법은 페이지에 [html_templates](guides/extensions-list.md#html-templates) 확장을 추가해야 합니다.
페이지에서 확장을 활성화하면 템플릿을 다음과 같이 지정할 수 있습니다：

~~~html
<div class="template:event_text">
    <a href='http://some.com/details.php?for="{event.id}"'>{event.text}</a>
</div>
~~~

템플릿의 전체 목록은 [API](api/overview/templates_overview.md)에서 확인할 수 있습니다.