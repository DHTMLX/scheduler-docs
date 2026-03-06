---
sidebar_label: "quick_info_content"
title: "quick_info_content template"
description: "定义弹出编辑表单中显示的内容"
---

# quick_info_content

### Description

@short: 定义弹出编辑表单中显示的内容

@signature: quick_info_content: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始时间
- `end` - (required) *Date* - 事件结束时间
- `event` - (required) *object* - 事件对象本身

### Returns
- ` text` - (string) - 在scheduler中显示的html内容

### Example

~~~jsx
scheduler.templates.quick_info_content = function(start, end, ev){ 
       return ev.details || ev.text;
};
~~~

### Details

:::note
 该模板仅在启用[quick_info](guides/extensions-list.md#quickinfo)插件时有效。 
:::

### Related Guides
- [공통 템플릿](guides/common-templates.md#touch-support)
- [전체 확장 기능 목록](guides/extensions-list.md#quickinfo)
