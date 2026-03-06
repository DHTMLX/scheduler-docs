---
sidebar_label: "quick_info_title"
title: "quick_info_title template"
description: "задаёт заголовок для всплывающей формы редактирования"
---

# quick_info_title

### Description

@short: Задаёт заголовок для всплывающей формы редактирования

@signature: quick_info_title: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - начальная дата события
- `end` - (required) *Date* - конечная дата события
- `event` - (required) *object* - сам объект события

### Returns
- ` text` - (string) - html-контент для отображения в scheduler

### Example

~~~jsx
scheduler.templates.quick_info_title = function(start, end, ev){ 
       return ev.text.substr(0,50); 
};
~~~

### Details

:::note
 Этот шаблон работает только если включён плагин [quick_info](guides/extensions-list.md#quickinfo). 
:::

### Related Guides
- [Общие шаблоны](guides/common-templates.md#touch-support)
- [Полный список расширений](guides/extensions-list.md#quickinfo)
