---
sidebar_label: "quick_info_content"
title: "quick_info_content template"
description: "определяет, что отображается внутри всплывающей формы редактирования"
---

# quick_info_content

### Description

@short: Определяет, что отображается внутри всплывающей формы редактирования

@signature: quick_info_content: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - объект события

### Returns
- ` text` - (string) - html-контент для отображения в scheduler

### Example

~~~jsx
scheduler.templates.quick_info_content = function(start, end, ev){ 
    return ev.details || ev.text;
};
~~~

### Details

:::note
 Этот шаблон работает только если включён плагин [quick_info](guides/extensions-list.md#quickinfo). 
:::

### Related Guides
- [Общие шаблоны](guides/common-templates.md#touch-support)
- [Полный список расширений](guides/extensions-list.md#quickinfo)
