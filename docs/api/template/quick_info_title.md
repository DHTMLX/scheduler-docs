---
sidebar_label: quick_info_title
title: "quick_info_title template"
description: "specifies the title of the pop-up edit form"
---

# quick_info_title

### Description

@short: Specifies the title of the pop-up edit form

@signature: quick_info_title: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.quick_info_title = function(start, end, ev){ 
       return ev.text.substr(0,50); 
};
~~~

### Details

:::note
 The template requires the [quick_info](guides/extensions-list.md#quick-info) plugin to be activated. 
:::

### Related Guides
- [Common Templates](guides/common-templates.md#touch-support)
- [Full List of Extensions](guides/extensions-list.md#quick-info)
