---
title: "格式化标签、日期、样式"
sidebar_label: "格式化标签、日期、样式"
---

# 格式化标签、日期、样式

点击视图链接以查看它所支持的模板。

### 默认视图

- [日视图模板](views/day-view-templates.md)
- [月视图模板](views/month-view-templates.md)
- [周视图模板](views/week-view-templates.md)

### 扩展视图

- [日程视图模板](views/agenda-view-templates.md)
- [网格视图模板](views/grid-view-templates.md)
- [地图视图模板](views/map-view-templates.md)
- [时间轴视图模板](views/timeline-view-templates.md)
- [周日程视图模板](views/weekagenda-view-templates.md)
- [单位视图模板](views/units-view-templates.md)
- [年视图模板](views/year-view-templates.md)


### 所有视图通用

- [迷你日历模板](guides/mini-calendar-templates.md)
- [灯箱](guides/common-templates.md#lightbox)
- [工具提示](guides/common-templates.md#tooltips)
- [触控支持](guides/common-templates.md#touch-support)
- [API 模板](guides/common-templates.md#api-templates)


## 指定模板

您可以通过两种方式设置模板：要么来自代码，要么来自 HTML 标记。

### 使用代码指定模板

默认情况下，模板可以定义为接收事件对象或日期参数的 JS 函数，必须返回一个 HTML 字符串，该字符串将插入到布局中：

~~~js
scheduler.templates.event_text = (start, end, event) => {
    return `<a href='http://some.com/details.php?for=${event.id}'>${event.text}</a>`;
};
~~~


### 通过标记指定模板

另外，模板也可以从 HTML 以声明方式定义。这种方法需要向页面添加 [html_templates](guides/extensions-list.md#html-templates) 扩展。
一旦在页面上激活该扩展，您可以按如下方式指定模板：

~~~html
<div class="template:event_text">
    <a href='http://some.com/details.php?for="{event.id}"'>{event.text}</a>
</div>
~~~


完整的模板列表可以在 [API](api/overview/templates_overview.md) 中找到。