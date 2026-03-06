---
sidebar_label: "toPDFRange"
title: "toPDFRange method"
description: "导出多个调度器视图到PDF文档（适用于打印）"
---

# toPDFRange

### Description

@short: 导出多个调度器视图到PDF文档（适用于打印）

@signature: toPDFRange: (from: Date, to: Date, view: string, path: string, color: string) =\> void

### Parameters

- `from` - (required) *Date* - 导出事件的起始日期
- `to` - (required) *Date* - 导出事件的结束日期
- `view` - (required) *string* - 要导出的视图名称
- `path` - (required) *string* - 生成PDF的PHP文件路径（[详情](export/pdf.md#usingexportservices)）
- `color` - (required) *string* - 导出时应用的配色方案

### Example

~~~jsx
//导出从2012年1月1日到2012年2月1日的“week”视图页面
scheduler.toPDFRange(new Date(2012,0,1), new Date(2012, 1,1),'week', 
  'generate.php', 'fullcolor');
~~~

### Details

:::note
 此方法需要启用[pdf](guides/extensions-list.md#pdf)插件。 
:::

**color** 参数仅接受以下预定义的特定值:

- **'color'** - 全彩打印（默认）
- **'gray'** - 灰度打印
- **'bw'** - 仅使用黑白色
- **'custom'** - 启用自定义色彩映射，需要PHP编程支持（[详情](export/pdf.md#usingexportservices)）
- **'fullcolor'** - 保留导出时实际使用的背景色和文本色

### Related API
- [toPDF](api/method/topdf.md)
