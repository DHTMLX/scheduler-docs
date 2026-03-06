---
sidebar_label: "UNITS_date"
title: "UNITS_date template"
description: "设置视图头部显示的日期"
---

# UNITS_date
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 设置视图头部显示的日期

@signature: UNITS_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 需要格式化显示的日期

### Returns
- ` text` - (string) - 用于在scheduler中渲染的HTML文本

### Example

~~~jsx
scheduler.templates.unit_date = function(date){
        return scheduler.templates.day_date(date);
};
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 该模板需要激活 [units](guides/extensions-list.md#units) 插件。 
:::

### Related Guides
- [Units View 템플릿](views/units-view-templates.md)
