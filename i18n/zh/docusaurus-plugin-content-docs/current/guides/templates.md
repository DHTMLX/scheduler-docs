---
title: "格式化标签、日期、样式"
sidebar_label: "格式化标签、日期、样式"
---

# 格式化标签、日期、样式

请查阅每个视图的链接，了解其支持的模板。

### 默认视图

- [Day View Templates](views/day-view-templates.md)
- [Month View Templates](views/month-view-templates.md)
- [주간 뷰 템플릿](views/week-view-templates.md)


### 扩展视图

- [Agenda View Templates](views/agenda-view-templates.md)
- [그리드 뷰 템플릿](views/grid-view-templates.md)
- [Map View 템플릿](views/map-view-templates.md)
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
- [WeekAgenda 뷰 템플릿](views/weekagenda-view-templates.md)
- [Units View 템플릿](views/units-view-templates.md)
- [Year View Templates](views/year-view-templates.md)


### 所有视图通用

- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [Lightbox](guides/common-templates.md#lightbox)
- [Tooltips](guides/common-templates.md#tooltips)
- [Touch support](guides/common-templates.md#touch-support)
- [API templates](guides/common-templates.md#api-templates)


## 指定模板 

可以通过两种方式设置模板:通过代码或使用 HTML 标记。

### 通过代码指定模板

默认情况下，模板被定义为 JavaScript 函数，该函数接收事件对象或日期参数，并返回一个 HTML 字符串插入到布局中:

~~~js
scheduler.templates.event_text="function(start," end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

### 通过标记指定模板 {#specifyingtemplatesasanhtmlcode}

另一种方式是使用 HTML 声明式地定义模板。此方法需要在页面中引入 [html_templates](guides/extensions-list.md#html-templates) 扩展。启用该扩展后，可以像这样指定模板:

~~~html
<div class="template:event_text">
    <a href='http://some.com/details.php?for="{event.id}"'>{event.text}<a>
</div>
~~~

完整的模板列表可在 [API 文档](api/overview/templates_overview.md) 中查阅。
