---
sidebar_label: "map_text"
title: "map_text template"
description: "定义视图第二列中显示的文本"
---

# map_text

### Description

@short: 定义视图第二列中显示的文本

@signature: map_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期
- `end` - (required) *Date* - 事件预计结束的日期
- `event` - (required) *object* - 事件对象本身

### Returns
- ` text` - (string) - 在scheduler中显示的html内容

### Example

~~~jsx
scheduler.templates.map_text = function(start,end,ev){
    return ev.text;
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 该模板需要启用[map_view](/guides/extensions-list/#mapview)插件。 
:::

请注意，如果未定义[map_text](api/template/map_text.md)模板，Google Maps弹出标记中显示的日期部分（'d-m-y'）将遵循[day_date](api/template/day_date.md)模板中的格式。

### Related Guides
- [Map View 템플릿](views/map-view-templates.md)


