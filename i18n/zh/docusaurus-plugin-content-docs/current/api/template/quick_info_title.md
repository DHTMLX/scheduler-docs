---
sidebar_label: "quick_info_title"
title: "quick_info_title template"
description: "设置弹出编辑表单的标题"
---

# quick_info_title

### Description

@short: 设置弹出编辑表单的标题

@signature: quick_info_title: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件的开始日期
- `end` - (required) *Date* - 事件的结束日期
- `event` - (required) *object* - 事件对象本身

### Returns
- ` text` - (string) - 在scheduler中显示的html内容

### Example

~~~jsx
scheduler.templates.quick_info_title = function(start, end, ev){ 
       return ev.text.substr(0,50); 
};
~~~

### Details

:::note
 该template仅在启用[quick_info](guides/extensions-list.md#quickinfo)插件时才有效。 
:::

### Related Guides
- [공통 템플릿](guides/common-templates.md#touch-support)
- [전체 확장 기능 목록](guides/extensions-list.md#quickinfo)
