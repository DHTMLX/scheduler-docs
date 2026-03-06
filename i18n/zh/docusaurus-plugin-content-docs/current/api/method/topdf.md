---
sidebar_label: "toPDF"
title: "toPDF method"
description: "将当前视图导出为 PDF 文档，方便打印使用。"
---

# toPDF

### Description

@short: 将当前视图导出为 PDF 文档，方便打印使用。

@signature: toPDF: (url: string, mode?: string) =\> void

### Parameters

- `url` - (required) *string* - 服务器端 PDF 转换器的路径
- `mode` - (optional) *string* - 生成的 PDF 文档所使用的配色方案

### Example

~~~jsx
scheduler.toPDF("./service/generate.php","color");
~~~

### Details

:::note
 此方法需要启用 [pdf](guides/extensions-list.md#pdf) 插件。 
::: 

:::note
 此方法适用于 dhtmlxScheduler 4.0 或更早版本的导出功能（详见 [Export to PDF (version 4.0)](export/pdf-legacy.md)）。 
:::

第二个参数（**mode**）仅接受以下选项之一:

- **'color'** - 以全彩色打印（默认）
- **'gray'** - 以灰度打印
- **'bw'** - 以严格的黑白打印，不包含任何颜色选项
- **'custom'** - 允许使用自定义配色方案，需要进行 PHP 编码（[详情](export/pdf.md#usingexportservices)）
- **'fullcolor'** - 导出时使用实际的背景色和文本颜色

### Related API
- [](api/method/topdfrange.md)

### Related Guides
- [Export to PDF (version 4.0)](export/pdf-legacy.md)
