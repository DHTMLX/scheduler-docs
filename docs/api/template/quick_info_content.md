---
sidebar_label: quick_info_content
title: "quick_info_content template"
description: "specifies the content of the pop-up edit form"
---

# quick_info_content

### Description

@short: Specifies the content of the pop-up edit form

@signature: quick_info_content: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.quick_info_content = function(start, end, ev){ 
       return ev.details || ev.text;
};
~~~

### Details

:::note
 The template requires the [quick_info](guides/extensions-list.md#quick-info) plugin to be activated. 
:::

### Related Guides
- [Common Templates](guides/common-templates.md#touch-support)
- [Full List of Extensions](guides/extensions-list.md#quick-info)
