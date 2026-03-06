---
sidebar_label: "UNITS_scale_text"
title: "UNITS_scale_text template"
description: "定义 X 轴上显示的项目"
---

# UNITS_scale_text
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义 X 轴上显示的项目

@signature: UNITS_scale_text: (key: string, label: string, unit: object, date: Date) =\> string;

### Parameters

- `key` - (required) *string* - 单位的标识符
- `label` - (required) *string* - 单位的标签
- `unit` - (required) *object* - 表示单位的对象，包括 'key' 和 'label'
- `date` - (required) *Date* - 对应某列的日期（用于多天 Units 视图）

### Returns
- ` text` - (string) - 在 scheduler 中显示的 HTML 内容

### Example

~~~jsx
scheduler.templates.unit_scale_text = function(key, label, unit, date) {
    if (option.css) {
        return "<span class='" + option.css + "'>" + label + "</span>";
    } else {
        return label;
    }
};
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 该模板需要启用 [units](guides/extensions-list.md#units) 插件。 
:::

### Related Guides
- [Units View 템플릿](views/units-view-templates.md)
